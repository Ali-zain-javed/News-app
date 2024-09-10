import React, { useMemo } from "react";

const ArticleCard = React.memo(({ news }) => {
  const article = useMemo(() => {
    return {
      title: news.webTitle || news.abstract || news.title,
      source: news.pillarId || news?.source?.name || news.source,
      category: news.sectionName || news.section_name || "News Api",
      date: news.webPublicationDate || news.pub_date || news.publishedAt,
      id: news.id || news._id || news.title,
      link: news.webUrl || news.web_url || news.url,
      author:
        news.author ||
        news?.fields?.byline ||
        news?.byline?.original ||
        "Unknown Author",
      image:
        news?.fields?.thumbnail ||
        news.urlToImage ||
        (news?.multimedia?.[0]?.url
          ? `https://www.nytimes.com/${news.multimedia?.[0].url}`
          : ""),
    };
  }, [news]);

  return (
    <div key={article.id} className="mb-4 py-3">
      <img src={article.image} alt={article.title} className="w-full h-48" />
      <h3 className="text-lg font-bold mt-1 truncate-multiline">
        {article.title}
      </h3>
      <div className="text-sm text-gray-600 mt-4">
        {article.source && (
          <>
            <strong> Source:</strong> {article.source}|
          </>
        )}{" "}
        {article.category && (
          <>
            <strong> Category:</strong> {article.category} |
          </>
        )}{" "}
        {article.author && (
          <>
            <strong> Author:</strong> {article.author}|
          </>
        )}{" "}
        {article.date && (
          <>
            <strong>Date:</strong> {new Date(article.date).toLocaleDateString()}{" "}
            |
          </>
        )}{" "}
        {article.link && (
          <>
            <a
              className="text-blue-500 italic font-semibold"
              rel="noreferrer"
              target="_blank"
              href={article.link}>
              view story
            </a>
          </>
        )}
      </div>
    </div>
  );
});

export default ArticleCard;
