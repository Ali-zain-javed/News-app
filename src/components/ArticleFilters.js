import React, { useMemo, useCallback } from "react";
import {
  newsSources,
  newsCategories,
  newsApiSections,
  guardianSections,
  nytSections,
} from "../constants";

const ArticleFilters = React.memo(({ setFilters, filters, filtersVisible }) => {
  const handleFilterChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFilters((prev) => ({ ...prev, [name]: value }));

      if (name === "source") {
        setFilters((prev) => ({ ...prev, category: "" }));
      }
    },
    [setFilters]
  );

  const getCategoryOptions = useMemo(() => {
    if (filters.source === "newsapi") {
      return newsApiSections;
    } else if (filters.source === "guardian") {
      return guardianSections;
    } else if (filters.source === "nyt") {
      return nytSections;
    } else {
      return newsCategories; // General categories if no specific source is selected
    }
  }, [filters.source]);

  return (
    <div
      className={
        filtersVisible
          ? "bg-slate-100 right-0 mr-8 w-[150px] absolute top-44 shadow flex flex-col rounded py-2 pb-1 text-xs"
          : `grid grid-cols-1 gap-4 sm:grid-cols-12`
      }>
      <div className="col-span-12 sm:col-span-4">
        <input
          type="date"
          name="date"
          className="border p-[6px] w-full rounded sm:mb-0"
          value={filters.date || ""} // Set saved value for date
          onChange={handleFilterChange}
        />
      </div>

      <div className="col-span-12 sm:col-span-4">
        <select
          name="source"
          className="border p-2 w-full rounded"
          value={filters.source || ""} // Set saved value for source
          onChange={handleFilterChange}>
          <option value="">All Sources</option>
          {newsSources.map((source) => (
            <option key={source.source} value={source.source}>
              {source.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-12 sm:col-span-4">
        <select
          name="category"
          className="border p-2 w-full rounded mb-2 sm:mb-0"
          value={filters.category || ""} // Set saved value for category
          onChange={handleFilterChange}>
          <option value="">All Categories</option>
          {getCategoryOptions.map((cat) => (
            <option key={cat?.category} value={cat?.category}>
              {cat?.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default ArticleFilters;
