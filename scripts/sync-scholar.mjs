/**
 * Fetch citation stats from Google Scholar and write scholar-stats.json.
 * Usage: npm run sync-scholar
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const homepagePath = join(root, "src/data/homepage.json");
const dataPath = join(root, "src/data/scholar-stats.json");
const publicPath = join(root, "public/scholar-stats.json");

const FETCH_TIMEOUT_MS = 30_000;
const USER_AGENT = "Mozilla/5.0 (compatible; PeiyuHomepage/1.0; +https://lpyhdzx.github.io/)";

function readJson(path, fallback = {}) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return fallback;
  }
}

function extractScholarUserId(profile) {
  if (typeof profile.scholarUserId === "string" && profile.scholarUserId.trim()) {
    return profile.scholarUserId.trim();
  }
  const match = String(profile.scholar ?? "").match(/[?&]user=([^&]+)/);
  return match?.[1]?.trim() ?? null;
}

function parseScholarStats(html) {
  const values = [...html.matchAll(/<td class="gsc_rsb_std">(\d+)<\/td>/g)].map((match) => Number(match[1], 10));
  if (values.length === 0) {
    return null;
  }
  return {
    citations: values[0] ?? null,
    hIndex: values[1] ?? null,
    i10Index: values[2] ?? null,
  };
}

async function fetchScholarHtml(userId) {
  const url = `https://scholar.google.com/citations?user=${encodeURIComponent(userId)}&hl=en`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT, "Accept-Language": "en-US,en;q=0.9" },
      redirect: "follow",
    });
    if (!response.ok) {
      return { ok: false, status: response.status, url };
    }
    return { ok: true, html: await response.text(), url };
  } catch (error) {
    return { ok: false, error: error.message, url };
  } finally {
    clearTimeout(timeout);
  }
}

function writeStats(payload) {
  const json = `${JSON.stringify(payload, null, 2)}\n`;
  writeFileSync(dataPath, json);
  mkdirSync(join(root, "public"), { recursive: true });
  writeFileSync(publicPath, json);
}

const useMock = process.argv.includes("--mock");

const homepage = readJson(homepagePath);
const userId = extractScholarUserId(homepage.profile ?? {});
const previous = readJson(dataPath, {});

if (useMock) {
  const payload = {
    userId: userId ?? "mock-user",
    citations: 1284,
    hIndex: 18,
    i10Index: 24,
    source: "mock",
    profileUrl: homepage.profile?.scholar ?? "https://scholar.google.com/",
    updatedAt: new Date().toISOString(),
  };
  writeStats(payload);
  console.log("[mock] Wrote sample stats for local UI preview. Run without --mock to fetch live data.");
  process.exit(0);
}

if (!userId) {
  console.error("[fail] No scholar user id. Set profile.scholarUserId or a scholar URL with ?user= in homepage.json");
  process.exit(1);
}

console.log(`[info] Fetching Google Scholar stats for ${userId}...`);
const result = await fetchScholarHtml(userId);

if (!result.ok) {
  console.warn(`[fail] ${result.status ?? result.error} ${result.url}`);
  if (typeof previous.citations === "number") {
    console.log(`[keep] Preserving previous stats (citations: ${previous.citations})`);
    process.exit(0);
  }
  process.exit(1);
}

const parsed = parseScholarStats(result.html);
if (!parsed || typeof parsed.citations !== "number") {
  console.warn("[fail] Could not parse citation table from Scholar HTML");
  if (typeof previous.citations === "number") {
    console.log(`[keep] Preserving previous stats (citations: ${previous.citations})`);
    process.exit(0);
  }
  process.exit(1);
}

const payload = {
  userId,
  ...parsed,
  source: "google-scholar",
  profileUrl: homepage.profile?.scholar ?? `https://scholar.google.com/citations?user=${userId}`,
  updatedAt: new Date().toISOString(),
};

writeStats(payload);
console.log(`[ok] citations=${payload.citations}, h-index=${payload.hIndex ?? "—"}, i10-index=${payload.i10Index ?? "—"}`);
console.log(`Wrote ${dataPath} and ${publicPath}`);
