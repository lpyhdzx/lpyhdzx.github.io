import React, { useState } from "react";
import { loadHomepageData } from "./lib/homepageData";
import ScholarCitationInText from "./components/ScholarCitationInText";

const { profile, bioParagraphs, chineseBio, recruiting, teaching, courses, directions, publications, news, scholarStats } =
  loadHomepageData();

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

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function groupPublicationsByYear(items) {
  return items.reduce((groups, paper) => {
    const existingGroup = groups.find((group) => group.year === paper.year);
    if (existingGroup) {
      existingGroup.items.push(paper);
      return groups;
    }
    return [...groups, { year: paper.year, items: [paper] }];
  }, []);
}

function runSmokeTests() {
  const groupedPublications = groupPublicationsByYear(publications);

  console.assert(directions.length === 4, "Expected four homepage directions.");
  console.assert(directions.filter((item) => item.id !== "open-source-project").length === 3, "Expected three research directions plus one open-source project.");
  console.assert(news.length >= 3, "Expected at least three news items.");
  console.assert(news.every((item) => isNonEmptyString(item.text)), "Every news item must have text.");
  console.assert(news.filter((item) => item.latest).length === 1, "Expected exactly one latest news item.");
  console.assert(publications.length >= 10, "Expected a substantial publication list.");
  console.assert(groupedPublications.length < publications.length, "Publication years should be grouped.");
  console.assert(publications.every((paper) => isNonEmptyString(paper.year)), "Every publication must have a year.");
  console.assert(publications.every((paper) => isNonEmptyString(paper.venue)), "Every publication must have a venue.");
  console.assert(publications.every((paper) => isNonEmptyString(paper.title)), "Every publication must have a title.");
  console.assert(publications.every((paper) => isNonEmptyString(paper.authors)), "Every publication must have authors.");
  console.assert(courses.length === 4, "Expected four teaching course items.");
  console.assert(bioParagraphs.length === 3, "Expected three biography paragraphs.");
  console.assert(bioParagraphs.every((item) => isNonEmptyString(item)), "Every biography paragraph must be non-empty.");
  console.assert(isNonEmptyString(chineseBio.prefix) && isNonEmptyString(chineseBio.suffix), "Chinese biography must be non-empty.");
  console.assert(isNonEmptyString(chineseBio.advisorOne), "Chinese advisor name must be non-empty.");
  console.assert(isNonEmptyString(recruiting.title), "Recruiting title must be non-empty.");
  console.assert(isNonEmptyString(recruiting.text), "Recruiting text must be non-empty.");
  console.assert(isNonEmptyString(profile.name), "Profile name must be non-empty.");
  console.assert(isNonEmptyString(profile.photo), "Profile photo must be non-empty.");
  console.assert(isNonEmptyString(profile.cover), "Profile cover must be non-empty.");
  console.assert(isNonEmptyString(profile.email) && profile.email.includes("@"), "Profile email must be valid-looking.");
  console.assert(isNonEmptyString(profile.scholar) && profile.scholar.startsWith("https://"), "Profile scholar link must be valid-looking.");
  console.assert(isNonEmptyString(profile.scholarUserId), "Profile scholar user id must be non-empty.");
  console.assert(!scholarStats || scholarStats.citations == null || typeof scholarStats.citations === "number", "Scholar citations must be a number when present.");
  console.assert(isNonEmptyString(profile.homepage) && profile.homepage.startsWith("https://"), "Profile homepage link must be valid-looking.");
  console.assert(directions.every((direction) => Array.isArray(direction.works) && direction.works.length > 0), "Every direction must have works.");
  console.assert(directions.every((direction) => isNonEmptyString(direction.name)), "Every direction must have a name.");
  console.assert(directions.every((direction) => isNonEmptyString(direction.desc)), "Every direction must have a description.");
  console.assert(directions.every((direction) => themeStyles[direction.theme]), "Every direction must use a known theme.");
  console.assert(directions.every((direction) => direction.works.every((work) => isNonEmptyString(work.title))), "Every work must have a title.");
  console.assert(directions.every((direction) => direction.works.every((work) => isNonEmptyString(work.venue))), "Every work must have a venue.");
  console.assert(directions.every((direction) => direction.works.every((work) => isNonEmptyString(work.tag))), "Every work must have a tag.");
  console.assert(directions.every((direction) => direction.works.every((work) => isNonEmptyString(work.detail))), "Every work must have a detail sentence.");
  console.assert(directions.every((direction) => direction.works.every((work) => !work.demoUrl || work.demoUrl.startsWith("https://"))), "Every demo URL must be valid-looking.");
}

runSmokeTests();

function Icon({ name, className = "h-4 w-4" }) {
  if (name === "mail") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-3 17c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.1-3.4-1.1-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 7 6.8c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.9 1.1a10 10 0 0 1 5.2 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1.1 2.8c0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A9 9 0 0 0 12 3Z" />
      </svg>
    );
  }

  if (name === "scholar") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3L3 8l9 5 9-5-9-5Z" />
        <path d="M6 10.5V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" />
      </svg>
    );
  }

  if (name === "homepage") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5" />
        <path d="M6.5 9.5V20h11V9.5" />
        <path d="M10 20v-5h4v5" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function ProfileLink({ href, icon, label }) {
  return (
    <a href={href} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-sky-300 hover:text-sky-700">
      <Icon name={icon} />
      <span>{label}</span>
    </a>
  );
}

function HighlightName({ children }) {
  return <span className="rounded bg-sky-50 px-1.5 py-0.5 font-semibold text-sky-800">{children}</span>;
}

function BioParagraph({ text, suffix = null }) {
  let body;

  if (!text.includes("Prof. Wayne Xin Zhao") && !text.includes("Prof. Wei Xu")) {
    body = text;
  } else {
    const partsAfterWayne = text.split("Prof. Wayne Xin Zhao");
    const partsAfterWei = partsAfterWayne[1].split("Prof. Wei Xu");
    body = (
      <>
        {partsAfterWayne[0]}
        <HighlightName>Prof. Wayne Xin Zhao</HighlightName>
        {partsAfterWei[0]}
        <HighlightName>Prof. Wei Xu</HighlightName>
        {partsAfterWei[1]}
      </>
    );
  }

  return (
    <p>
      {body}
      {suffix ? (
        <>
          {" "}
          {suffix}
        </>
      ) : null}
    </p>
  );
}

function ChineseBio() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-4 md:px-10">
      <div className="border-l-4 border-sky-200 bg-white px-6 py-5 text-base leading-8 text-slate-700 md:text-lg md:leading-9">
        <p>
          <span>{chineseBio.prefix}</span>
          <HighlightName>{chineseBio.advisorOne}</HighlightName>
          <span>{chineseBio.suffix}</span>{" "}
          <ScholarCitationInText href={profile.scholar} scholarStats={scholarStats} locale="zh" icon={Icon} />
        </p>
        <div className="mt-5 border-l-4 border-emerald-300 bg-emerald-50 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            {recruiting.title}
          </div>
          <p className="mt-2 text-slate-700">{recruiting.text}</p>
          <a href={`mailto:${profile.email}`} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900">
            邮件联系
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
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

function DemoLink({ url, label = "Live Demo" }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="mt-2 inline-flex items-center gap-1.5 border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-900"
    >
      <span>{label}</span>
      <Icon name="arrow" />
    </a>
  );
}

function WorkItem({ work, theme }) {
  const styles = themeStyles[theme] || themeStyles.sky;

  return (
    <div className="group border-b border-slate-100 py-3 last:border-b-0">
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-3">
        <span className={`shrink-0 border px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${styles.label}`}>{work.venue}</span>
        <h3 className={`min-w-0 flex-1 text-sm font-semibold leading-6 text-slate-950 ${styles.hover}`}>{work.title}</h3>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="font-semibold text-slate-500">{work.tag}</span>
        <span className="text-slate-300">/</span>
        <span>{work.detail}</span>
      </div>
      {work.demoUrl ? <DemoLink url={work.demoUrl} label={work.demoLabel} /> : null}
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
          <span className={`border px-2.5 py-1 text-xs font-semibold ${styles.label}`}>{direction.works.length} featured works</span>
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

function BibButton({ paper }) {
  const [status, setStatus] = useState("idle");

  async function copyBibtex() {
    if (!paper.bibtex) {
      if (paper.dblpUrl) {
        window.open(`${paper.dblpUrl}?view=bibtex`, "_blank", "noopener,noreferrer");
      }
      setStatus("missing");
      window.setTimeout(() => setStatus("idle"), 2000);
      return;
    }

    try {
      await navigator.clipboard.writeText(paper.bibtex);
      setStatus("copied");
    } catch {
      setStatus("error");
    }

    window.setTimeout(() => setStatus("idle"), 2000);
  }

  const label = status === "copied" ? "Copied" : status === "missing" ? "No Bib" : status === "error" ? "Failed" : "Bib";

  return (
    <button
      type="button"
      onClick={copyBibtex}
      title={paper.bibtex ? "Copy DBLP BibTeX" : paper.dblpUrl ? "Open DBLP BibTeX page" : "Add dblpKey and run npm run sync-bib"}
      className={`shrink-0 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide transition ${
        status === "copied"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : status === "missing" || status === "error"
            ? "border-amber-200 bg-amber-50 text-amber-700"
            : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
      }`}
    >
      {label}
    </button>
  );
}

function PublicationItem({ paper }) {
  return (
    <div className="border-b border-slate-100 py-4 last:border-b-0">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-600">{paper.venue}</span>
        <h3 className="min-w-0 flex-1 text-sm font-semibold leading-6 text-slate-950">{paper.title}</h3>
        <BibButton paper={paper} />
      </div>
      <p className="mt-1 text-xs leading-5 text-slate-500">{paper.authors}</p>
      {paper.demoUrl ? <DemoLink url={paper.demoUrl} label={paper.demoLabel} /> : null}
    </div>
  );
}

function PublicationYearGroup({ group }) {
  return (
    <div className="grid gap-4 border-b border-slate-200 py-5 last:border-b-0 md:grid-cols-[5rem_1fr]">
      <div className="text-2xl font-semibold leading-none text-slate-300 md:pt-3">{group.year}</div>
      <div className="border-l border-slate-100 pl-5">
        {group.items.map((paper) => (
          <PublicationItem key={paper.id ?? `${paper.venue}-${paper.title}`} paper={paper} />
        ))}
      </div>
    </div>
  );
}

function PublicationsSection() {
  const groupedPublications = groupPublicationsByYear(publications);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:px-10" id="publications">
      <SectionTitle
        eyebrow="Publications"
        title="Selected and recent publications"
        desc="A complete list of the works mentioned on this homepage, organized by year. The Research section above keeps only representative papers to show the scope of each direction."
      />
      <div className="border-y border-slate-200 bg-white px-5">
        {groupedPublications.map((group) => (
          <PublicationYearGroup key={group.year} group={group} />
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
          <a href="#publications" className="hover:text-sky-700">Publications</a>
          <a href="#teaching" className="hover:text-sky-700">Teaching</a>
          <a href="#contact" className="hover:text-sky-700">Contact</a>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:px-10 md:pb-16 md:pt-12">
          <div className="overflow-hidden border border-slate-200 bg-white">
            <div className="aspect-[2.2/1] min-h-72 w-full bg-slate-100 sm:aspect-[2.4/1] md:min-h-96 md:aspect-[2.6/1] lg:max-h-[28rem]">
              <img src={profile.cover} alt="Research cover" className="h-full w-full object-cover object-center" />
            </div>

            <div className="grid gap-8 px-6 py-8 md:grid-cols-[15rem_1fr] md:px-8 md:py-10">
              <div>
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="h-36 w-36 rounded-full border border-slate-200 bg-white object-cover md:h-44 md:w-44"
                />
                <div className="mt-5">
                  <div className="text-3xl font-semibold tracking-tight text-slate-950">{profile.name}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{profile.title}</div>
                  <div className="text-sm leading-6 text-slate-500">{profile.affiliation}</div>
                </div>
              </div>

              <div className="md:pt-4">
                <div className="mb-5 text-xs font-semibold uppercase tracking-widest text-sky-600">Personal Academic Homepage</div>
                <div className="flex flex-wrap gap-3">
                  <ProfileLink href={`mailto:${profile.email}`} icon="mail" label="Email" />
                  <ProfileLink href={profile.github} icon="github" label="GitHub" />
                  <ProfileLink href={profile.scholar} icon="scholar" label="Google Scholar" />
                  <ProfileLink href={profile.homepage} icon="homepage" label="UIBE Homepage" />
                </div>
                <div className="mt-6 max-w-3xl space-y-4 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                  {bioParagraphs.map((paragraph, index) => (
                    <BioParagraph
                      key={paragraph}
                      text={paragraph}
                      suffix={
                        index === bioParagraphs.length - 1 ? (
                          <ScholarCitationInText href={profile.scholar} scholarStats={scholarStats} locale="en" icon={Icon} />
                        ) : null
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <ChineseBio />

        <section className="mx-auto max-w-7xl px-6 py-6 md:px-10">
          <div className="mb-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-600">Updates</div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">Latest news</h2>
          </div>
          <div className="border-y border-slate-200 bg-white">
            {news.map((item) => (
              <div key={item.id ?? item.text} className="flex gap-4 border-b border-slate-100 px-5 py-4 last:border-b-0">
                {item.date ? (
                  <time dateTime={item.date} className="w-14 shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-slate-400">
                    {item.date}
                  </time>
                ) : null}
                <p className="text-base font-medium leading-7 text-slate-700 md:text-lg">
                  <span>{item.text}</span>
                  {item.latest ? (
                    <span className="ml-3 inline-flex items-center gap-1.5 align-middle text-xs font-bold uppercase tracking-wide text-amber-600">
                      <span className="inline-block animate-bounce text-sm">👏</span>
                      Latest
                    </span>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10" id="research">
          <SectionTitle
            eyebrow="Research Structure"
            title="Research Directions & Open Source"
            desc="The homepage foregrounds research scope rather than project decoration: each line keeps only representative works, while the full publication list is provided below."
          />
          <div className="space-y-4 border-y border-slate-200" id="works">
            {directions.map((direction, index) => (
              <DirectionRow key={direction.id} direction={direction} index={index} />
            ))}
          </div>
        </section>

        <PublicationsSection />

        <section className="mx-auto max-w-7xl px-6 py-14 md:px-10" id="teaching">
          <div className="border border-slate-200 bg-white p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-600">Teaching</div>
                <h2 className="text-3xl font-semibold text-slate-950">{teaching.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">{teaching.description}</p>
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
