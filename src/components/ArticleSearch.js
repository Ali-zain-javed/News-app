import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

const ArticleSearch = React.memo(({ searchTerm, setSearchTerm }) => {
  const [search, setSearch] = useState(searchTerm);

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchTerm(query);
    }, 500),
    [setSearchTerm]
  );

  useEffect(() => {
    debouncedSearch(search);
    return () => {
      debouncedSearch.cancel(); // Cleanup debounced function
    };
  }, [search, debouncedSearch]);

  return (
    <div className="mb-2">
      <input
        type="text"
        placeholder="Search articles..."
        className="border p-2 w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
});

export default ArticleSearch;
