function ScholarCitationCount({ href, citations, locale, icon: Icon }) {
  const count = citations.toLocaleString(locale === "zh" ? "zh-CN" : "en-US");

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      title="Google Scholar"
      className="mx-0.5 inline-flex items-baseline gap-0.5 text-inherit no-underline hover:text-sky-800"
    >
      <Icon name="scholar" className="relative top-[0.12em] h-[0.95em] w-[0.95em] shrink-0" />
      <span className="tabular-nums">{count}</span>
    </a>
  );
}

export default function ScholarCitationInText({ href, scholarStats, locale, icon: Icon }) {
  const citations = scholarStats?.citations;
  if (typeof citations !== "number") {
    return null;
  }

  const count = (
    <ScholarCitationCount href={href} citations={citations} locale={locale} icon={Icon} />
  );

  if (locale === "zh") {
    return <>发表论文总计引用达到{count}次。</>;
  }

  return <>Published papers have received a total of {count} citations.</>;
}
