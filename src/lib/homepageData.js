import raw from "../data/homepage.json";
import authorPhoto from "../data/author-img.jpeg";

function sortByOrder(items) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function sortNewsByDate(items) {
  return [...items].sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")));
}

export function loadHomepageData() {
  const { profile, pills, courses, directions, papers, news } = raw;

  const directionsWithWorks = directions.map((direction) => ({
    ...direction,
    works: sortByOrder(papers.filter((paper) => paper.directionId === direction.id)),
  }));

  return {
    profile: { ...profile, photo: authorPhoto },
    pills,
    courses,
    directions: directionsWithWorks,
    news: sortNewsByDate(news),
  };
}
