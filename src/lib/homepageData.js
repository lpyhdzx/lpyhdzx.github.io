import raw from "../data/homepage.json";
import authorPhoto from "../data/author-img.jpeg";

function sortByOrder(items) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function sortNews(items) {
  return [...items].sort((a, b) => {
    if (Boolean(a.latest) !== Boolean(b.latest)) {
      return Number(Boolean(b.latest)) - Number(Boolean(a.latest));
    }
    return String(b.date ?? "").localeCompare(String(a.date ?? ""));
  });
}

function sortPublicationsByYear(items) {
  return [...items].sort((a, b) => String(b.year).localeCompare(String(a.year)));
}

export function loadHomepageData() {
  const {
    profile,
    bioParagraphs,
    recruiting,
    teaching,
    courses,
    directions,
    papers,
    publications,
    news,
  } = raw;

  const directionsWithWorks = directions.map((direction) => ({
    ...direction,
    works: sortByOrder(papers.filter((paper) => paper.directionId === direction.id)),
  }));

  return {
    profile: { ...profile, photo: authorPhoto },
    bioParagraphs,
    recruiting,
    teaching,
    courses,
    directions: directionsWithWorks,
    publications: sortPublicationsByYear(publications),
    news: sortNews(news),
  };
}
