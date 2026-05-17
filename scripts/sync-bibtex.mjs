/**
 * Fetch BibTeX from DBLP for each publication with `dblpKey` in homepage.json.
 * Usage: npm run sync-bib
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const homepage = JSON.parse(readFileSync(join(root, "src/data/homepage.json"), "utf8"));
const outPath = join(root, "src/data/publications-bib.json");

let existing = {};
try {
  existing = JSON.parse(readFileSync(outPath, "utf8"));
} catch {
  existing = {};
}

const bibtex = { ...existing };

async function fetchBib(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        await new Promise((r) => setTimeout(r, 2000 * attempt));
        continue;
      }
      if (!res.ok) {
        return { ok: false, status: res.status };
      }
      return { ok: true, text: (await res.text()).trim() };
    } catch (error) {
      if (attempt === retries) {
        return { ok: false, error: error.message };
      }
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  return { ok: false, status: "retry-exhausted" };
}

for (const pub of homepage.publications) {
  if (!pub.dblpKey) {
    console.warn(`[skip] ${pub.id}: no dblpKey`);
    continue;
  }

  const url = `https://dblp.org/rec/${pub.dblpKey}.bib`;
  const result = await fetchBib(url);

  if (!result.ok) {
    console.warn(`[fail] ${pub.id}: ${result.status ?? result.error} ${url}`);
    continue;
  }

  bibtex[pub.id] = result.text;
  console.log(`[ok] ${pub.id}`);
  await new Promise((r) => setTimeout(r, 400));
}

writeFileSync(outPath, JSON.stringify(bibtex, null, 2) + "\n");
console.log(`Wrote ${Object.keys(bibtex).length} entries to src/data/publications-bib.json`);
