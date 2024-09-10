import React, { useEffect, useMemo, useCallback } from "react";
import ArticleCard from "./ArticleCard";
import {
  useNewsAPIArticles,
  useGuardianArticles,
  useNYTArticles,
} from "../services/newsService";
import { toast } from "react-toastify";
import Pagination from "./Pagination";

const ArticleList = React.memo(
  ({ searchTerm, filters, pagination, handlePageChange }) => {
    const source = filters?.source;

    // Fetch articles from NewsAPI based on search term and filters
    const {
      data: newsArticles,
      isLoading: isLoadingNews,
      error: newsError,
    } = useNewsAPIArticles(searchTerm, {
      ...filters,
      page: pagination.newsCurrentPage,
    });

    // Fetch articles from Guardian based on search term and filters
    const {
      data: guardianArticles,
      isLoading: isLoadingGuardian,
      error: guardianError,
    } = useGuardianArticles(searchTerm, {
      ...filters,
      page: pagination.guardianCurrentPage,
    });

    // Fetch articles from New York Times based on search term and filters
    const {
      data: nytArticles,
      isLoading: isLoadingNYT,
      error: nytError,
    } = useNYTArticles(searchTerm, {
      ...filters,
      page: pagination.nytCurrentPage,
    });

    // Show error toast if there is an error fetching articles
    useEffect(() => {
      if (newsError) {
        toast.error(`NewsAPI Error: ${newsError.message}`);
      }
      if (guardianError) {
        toast.error(`Guardian Error: ${guardianError.message}`);
      }
      if (nytError) {
        toast.error(`NYT Error: ${nytError.message}`);
      }
    }, [newsError, guardianError, nytError]);

    // Memoized page change handler
    const handlePageChangeMemoized = useCallback(
      (source, page) => {
        handlePageChange(source, page);
      },
      [handlePageChange]
    );

    // Memoized article list for each source
    const newsArticleList = useMemo(
      () =>
        newsArticles?.articles.map((article) => (
          <div key={article.url} className="bg-white rounded-lg shadow-lg p-4">
            <ArticleCard key={article.url} news={article} />
          </div>
        )),
      [newsArticles?.articles]
    );

    // Memoized article list for each source
    const guardianArticleList = useMemo(
      () =>
        guardianArticles?.results.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-lg p-4">
            <ArticleCard key={article.id} news={article} />
          </div>
        )),
      [guardianArticles?.results]
    );

    // Memoized article list for each source
    const nytArticleList = useMemo(
      () =>
        nytArticles?.docs.map((article) => (
          <div key={article._id} className="bg-white rounded-lg shadow-lg p-4">
            <ArticleCard key={article._id} news={article} />
          </div>
        )),
      [nytArticles?.docs]
    );

    return (
      <div className="grid ">
        <div>
          {(source === "newsapi" ||
            source?.split(",").includes("newsapi") ||
            source == "") && (
            <>
              <h2 className="text-xl ml-2 font-bold border-b my-6 text-blue-800">
                NewsAPI Articles
              </h2>
              {isLoadingNews && <div>Loading...</div>}
              <div className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {newsArticleList}
                  {!newsArticles?.articles.length && !isLoadingNews && (
                    <div className="text-center text-red-500">
                      No articles found
                    </div>
                  )}
                </div>
                {newsArticles?.totalResults && (
                  <div className="float-right mb-4">
                    <Pagination
                      currentPage={pagination.newsCurrentPage}
                      onPageChange={(page) =>
                        handlePageChangeMemoized("news", page)
                      }
                      totalRecords={newsArticles?.totalResults}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          {(source === "guardian" ||
            source?.split(",").includes("guardian") ||
            source == "") && (
            <>
              <h2 className="text-xl ml-2 font-bold border-b my-8 mt-20 text-blue-800">
                Guardian Articles
              </h2>
              {isLoadingGuardian && <div>Loading...</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {guardianArticleList}
                {!guardianArticles?.results.length && !isLoadingGuardian && (
                  <div className="text-center text-red-500">
                    No articles found
                  </div>
                )}
              </div>
              {guardianArticles?.total && (
                <div className="float-right mb-4">
                  <Pagination
                    totalRecords={guardianArticles?.total}
                    currentPage={pagination.guardianCurrentPage}
                    onPageChange={(page) =>
                      handlePageChangeMemoized("guardian", page)
                    }
                  />
                </div>
              )}
            </>
          )}
          {(source === "nyt" ||
            source?.split(",").includes("nyt") ||
            source == "") && (
            <>
              <h2 className="text-xl ml-2 font-bold border-b my-8 mt-20 text-blue-800">
                New York Times Articles
              </h2>
              {isLoadingNYT && <div>Loading...</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {nytArticleList}
                {!nytArticles?.docs.length && !isLoadingNYT && (
                  <div className="text-center text-red-500">
                    No articles found
                  </div>
                )}
              </div>
              {nytArticles?.meta.hits && (
                <div className="float-right mb-4">
                  <Pagination
                    totalRecords={nytArticles?.meta.hits}
                    currentPage={pagination?.nytCurrentPage}
                    onPageChange={(page) =>
                      handlePageChangeMemoized("nyt", page)
                    }
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

export default ArticleList;
