import React from "react";
import { loadHomepageData } from "./lib/homepageData";

const { profile, pills, courses, directions, news } = loadHomepageData();

const themeStyles = {
  sky: {
    row: "border-sky-300",
    label: "border-sky-100 bg-sky-50 text-sky-700",
    hover: "group-hover:text-sky-800",
  },
  cyan: {
    row: "border-cyan-300",
    label: "border-cyan-100 bg-cyan-50 text-cyan-700",
    hover: "group-hover:text-cyan-800",
  },
  violet: {
    row: "border-violet-300",
    label: "border-violet-100 bg-violet-50 text-violet-700",
    hover: "group-hover:text-violet-800",
  },
  emerald: {
    row: "border-emerald-300",
    label: "border-emerald-100 bg-emerald-50 text-emerald-700",
    hover: "group-hover:text-emerald-800",
  },
};

function runSmokeTests() {
  console.assert(directions.length === 4, "Expected four homepage directions.");
  console.assert(directions.filter((item) => item.id !== "squrve").length === 3, "Expected three research directions plus Squrve.");
  console.assert(news.length >= 1, "Expected at least one news item.");
  console.assert(news.every((item) => typeof item.text === "string" && item.text.length > 0), "Every news item must have text.");
  console.assert(courses.length === 4, "Expected four teaching course items.");
  console.assert(pills.length === 5, "Expected five hero tags.");
  console.assert(typeof profile.name === "string" && profile.name.length > 0, "Profile name must be non-empty.");
  console.assert(typeof profile.email === "string" && profile.email.includes("@"), "Profile email must be valid-looking.");
  console.assert(directions.every((direction) => Array.isArray(direction.works) && direction.works.length > 0), "Every direction must have works.");
  console.assert(directions.every((direction) => typeof direction.name === "string" && direction.name.length > 0), "Every direction must have a name.");
  console.assert(directions.every((direction) => themeStyles[direction.theme]), "Every direction must use a known theme.");
  console.assert(directions.every((direction) => direction.works.every((work) => typeof work.title === "string" && work.title.length > 0)), "Every work must have a title.");
}

runSmokeTests();

function Icon({ name }) {
  if (name === "mail") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-3 17c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.1-3.4-1.1-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 7 6.8c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.9 1.1a10 10 0 0 1 5.2 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1.1 2.8c0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A9 9 0 0 0 12 3Z" />
      </svg>
    );
  }

  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function Pill({ children }) {
  return <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">{children}</span>;
}

function ProfileLink({ href, icon, label }) {
  return (
    <a href={href} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-sky-300 hover:text-sky-700">
      <Icon name={icon} />
      <span>{label}</span>
    </a>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-8 max-w-3xl">
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">{eyebrow}</div>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      {desc ? <p className="mt-3 text-base leading-7 text-slate-600">{desc}</p> : null}
    </div>
  );
}

function WorkItem({ work, theme }) {
  const styles = themeStyles[theme] || themeStyles.sky;

  return (
    <div className="group border-b border-slate-100 py-3 last:border-b-0">
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-3">
        <span className={`shrink-0 border px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${styles.label}`}>{work.venue}</span>
        <h3 className={`text-sm font-semibold leading-6 text-slate-950 ${styles.hover}`}>{work.title}</h3>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="font-semibold text-slate-500">{work.tag}</span>
        <span className="text-slate-300">/</span>
        <span>{work.detail}</span>
      </div>
    </div>
  );
}

function DirectionRow({ direction, index }) {
  const styles = themeStyles[direction.theme] || themeStyles.sky;
  const number = String(index + 1).padStart(2, "0");

  return (
    <section className={`grid gap-5 border-l-4 bg-white px-5 py-6 md:grid-cols-[0.3fr_0.7fr] md:px-6 ${styles.row}`}>
      <aside>
        <div className="mb-3 flex items-baseline gap-3">
          <span className="text-sm font-semibold text-slate-400">{number}</span>
          <h3 className="text-2xl font-semibold text-slate-950">{direction.name}</h3>
        </div>
        <p className="text-sm font-semibold leading-6 text-slate-700">{direction.subtitle}</p>
        <p className="mt-4 text-sm leading-6 text-slate-500">{direction.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`border px-2.5 py-1 text-xs font-semibold ${styles.label}`}>{direction.works.length} works</span>
          <span className="border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500">Research line</span>
        </div>
      </aside>
      <div className="border-t border-slate-100 pt-2 md:border-l md:border-t-0 md:pl-6 md:pt-0">
        {direction.works.map((work) => (
          <WorkItem key={work.id ?? work.title} work={work} theme={direction.theme} />
        ))}
      </div>
    </section>
  );
}

function ContactCard({ title, text, href, borderClass }) {
  return (
    <a className={`border-l-4 bg-white px-5 py-4 transition hover:border-sky-500 ${borderClass}`} href={href}>
      <div className="font-semibold text-slate-950">{title}</div>
      <div className="mt-2 text-sm text-slate-500">{text}</div>
    </a>
  );
}

export default function PeiyuHomepage() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <div className="flex items-center gap-3">
          <img src={profile.photo} alt={profile.name} className="h-10 w-10 rounded-full border border-slate-200 object-cover" />
          <div>
            <div className="text-sm font-semibold text-slate-950">{profile.name}</div>
            <div className="text-xs text-slate-500">UIBE · {profile.group}</div>
          </div>
        </div>
        <nav className="hidden items-center gap-6 border border-slate-200 bg-white px-5 py-2 text-sm text-slate-600 md:flex">
          <a href="#research" className="hover:text-sky-700">Research</a>
          <a href="#works" className="hover:text-sky-700">Works</a>
          <a href="#teaching" className="hover:text-sky-700">Teaching</a>
          <a href="#contact" className="hover:text-sky-700">Contact</a>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-10 md:grid-cols-[0.78fr_1.22fr] md:px-10 md:pb-24 md:pt-16">
          <div>
            <div className="border border-slate-200 bg-white p-4">
              <div className="overflow-hidden border border-slate-100 bg-white">
                <div className="relative h-[24rem] bg-slate-100">
                  <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="text-2xl font-semibold text-slate-950">{profile.name}</div>
                  <div className="mt-1 text-sm text-slate-600">{profile.title}, {profile.affiliation}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-slate-950 md:text-7xl">{profile.shortName}</h1>
            <div className="mt-5 flex flex-wrap gap-3">
              <ProfileLink href={`mailto:${profile.email}`} icon="mail" label="Email" />
              <ProfileLink href={profile.github} icon="github" label="GitHub" />
            </div>
            <p className="mt-4 text-2xl font-medium text-slate-700 md:text-3xl">{profile.tagline}</p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">{profile.bio}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {pills.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <a className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white" href="#works">
                <span>Explore Works</span>
                <Icon name="arrow" />
              </a>
              <a className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700" href={`mailto:${profile.email}`}>
                <span>Contact</span>
                <Icon name="mail" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-6 md:px-10">
          <div className="mb-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">Updates</div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">Latest news</h2>
          </div>
          <div className="border-y border-slate-200 bg-white">
            {news.map((item) => (
              <div key={item.id ?? item.text} className="flex gap-4 border-b border-slate-100 px-5 py-4 last:border-b-0">
                {item.date ? (
                  <time className="shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{item.date}</time>
                ) : null}
                <p className="text-base font-medium leading-7 text-slate-700 md:text-lg">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10" id="research">
          <SectionTitle
            eyebrow="Research Structure"
            title="Three research directions, plus one open-source system"
            desc="The homepage foregrounds research scope rather than project decoration: each line uses text hierarchy and color highlights to connect a direction with its representative papers and systems."
          />
          <div className="space-y-4 border-y border-slate-200" id="works">
            {directions.map((direction, index) => (
              <DirectionRow key={direction.id} direction={direction} index={index} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 md:px-10" id="teaching">
          <div className="border border-slate-200 bg-white p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">Teaching</div>
                <h2 className="text-3xl font-semibold text-slate-950">Teaching AI through systems, history, and practice</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  I teach data structures, algorithm design, AI literacy, and frontier topics in large language models, with an emphasis on automatic evaluation, project-based learning, and AI-empowered research practice.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {courses.map((course) => (
                  <div key={course} className="border-l-4 border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-700">{course}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 md:px-10" id="contact">
          <div className="grid gap-4 md:grid-cols-3">
            <ContactCard title="Email" text={profile.email} href={`mailto:${profile.email}`} borderClass="border-sky-200" />
            <ContactCard title="GitHub" text="LLM-Cube / Squrve / research code" href={profile.github} borderClass="border-violet-200" />
            <ContactCard title="Students" text="Open to motivated students in LLM systems and agents" href="#" borderClass="border-emerald-200" />
          </div>
        </section>
      </main>
    </div>
  );
}
