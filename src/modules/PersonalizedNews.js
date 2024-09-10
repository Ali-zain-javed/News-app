import React, { useState, useEffect, useCallback, useMemo } from "react";
import ArticleList from "../components/ArticleList";
import PreferenceFilter from "../components/PreferenceFilter";

function PersonalizedNews() {
  const [filters, setFilters] = useState({
    category: "",
    source: "",
    author: "",
  });

  const [preferenceVisible, setPreferenceVisible] = useState(false);

  const [pagination, setPagination] = useState({
    newsCurrentPage: 1,
    guardianCurrentPage: 1,
    nytCurrentPage: 1,
    newsTotalRecords: 0,
    guardianTotalRecords: 0,
    nytTotalRecords: 0,
  });

  const [preferencesValues, setPreferencesValues] = useState({
    preferredSources: [],
    preferredCategories: [],
    preferredAuthors: [],
  });

  // Memoized page change handler to avoid re-creation on every render
  const handlePageChange = useCallback((source, page) => {
    setPagination((prev) => ({
      ...prev,
      [`${source}CurrentPage`]: page,
    }));
  }, []);

  // Load saved preferences from localStorage on component mount
  useEffect(() => {
    const savedPreferences = JSON.parse(
      localStorage.getItem("preferences")
    ) || {
      preferredSources: [],
      preferredCategories: [],
      preferredAuthors: [],
    };
    setPreferencesValues(savedPreferences);
    setFilters({
      category: savedPreferences.preferredCategories.join(","),
      source: savedPreferences.preferredSources.join(","),
      author: savedPreferences.preferredAuthors.join(","),
    });
  }, []);

  // Reset pagination whenever filters change
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      newsCurrentPage: 1,
      guardianCurrentPage: 1,
      nytCurrentPage: 1,
    }));
  }, [filters]);

  // Toggle preferences visibility
  const togglePreferences = useCallback(() => {
    setPreferenceVisible((prev) => !prev);
  }, []);

  // Handle preference submission
  const handlePreferenceSubmit = useCallback((preferences) => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
    setFilters({
      category: preferences.preferredCategories.join(","),
      source: preferences.preferredSources.join(","),
      author: preferences.preferredAuthors.join(","),
    });
  }, []);

  // Memoize PreferenceFilter to avoid unnecessary re-renders
  const preferenceFilterMemo = useMemo(
    () => (
      <PreferenceFilter
        setPreferencesValues={setPreferencesValues}
        handlePreferenceSubmit={handlePreferenceSubmit}
        setPreferenceVisible={setPreferenceVisible}
        preferencesValues={preferencesValues}
      />
    ),
    [preferencesValues, handlePreferenceSubmit]
  );

  return (
    <div className="container mx-auto">
      <div className="w-full text-center">
        <button
          className="p-2 text-center ml-1 mb-2"
          onClick={togglePreferences}>
          {/* Preferences Icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24">
            <path
              d="M6 5V20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 5V20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M18 5V20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8.5 16C8.5 17.3807 7.38071 18.5 6 18.5C4.61929 18.5 3.5 17.3807 3.5 16C3.5 14.6193 4.61929 13.5 6 13.5C7.38071 13.5 8.5 14.6193 8.5 16Z"
              fill="#000000"
            />
            <path
              d="M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z"
              fill="#000000"
            />
            <path
              d="M20.5 16C20.5 17.3807 19.3807 18.5 18 18.5C16.6193 18.5 15.5 17.3807 15.5 16C15.5 14.6193 16.6193 13.5 18 13.5C19.3807 13.5 20.5 14.6193 20.5 16Z"
              fill="#000000"
            />
          </svg>
        </button>
      </div>

      {preferenceVisible && preferenceFilterMemo}

      <ArticleList
        searchTerm=""
        filters={filters}
        pagination={pagination}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default React.memo(PersonalizedNews);
