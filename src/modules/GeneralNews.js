import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import ArticleSearch from "../components/ArticleSearch";
import ArticleFilters from "../components/ArticleFilters";
import ArticleList from "../components/ArticleList";

function GeneralNews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    category: "",
    source: "",
    author: "",
  });

  const [filtersVisible, setFiltersVisible] = useState(false);
  const filterRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setFiltersVisible(false); // Close the filter dropdown if clicked outside
    }
  }, []);

  const [pagination, setPagination] = useState({
    newsCurrentPage: 1,
    guardianCurrentPage: 1,
    nytCurrentPage: 1,
    newsTotalRecords: 0,
    guardianTotalRecords: 0,
    nytTotalRecords: 0,
  });

  const handlePageChange = useCallback((source, page) => {
    setPagination((prev) => ({
      ...prev,
      [`${source}CurrentPage`]: page,
    }));
  }, []);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      newsCurrentPage: 1,
      guardianCurrentPage: 1,
      nytCurrentPage: 1,
    }));
  }, [searchTerm, filters]);

  useEffect(() => {
    if (filtersVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filtersVisible, handleClickOutside]);

  const toggleFilters = useCallback(() => {
    setFiltersVisible((prev) => !prev);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      date: "",
      category: "",
      source: "",
      author: "",
    });
    setSearchTerm("");
  }, []);

  const filtersMemo = useMemo(
    () => (
      <ArticleFilters
        setFilters={setFilters}
        filtersVisible={filtersVisible}
        filters={filters}
      />
    ),
    [filters, filtersVisible]
  );

  const searchMemo = useMemo(
    () => (
      <ArticleSearch setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
    ),
    [searchTerm]
  );

  const articleListMemo = useMemo(
    () => (
      <ArticleList
        searchTerm={searchTerm}
        filters={filters}
        pagination={pagination}
        handlePageChange={handlePageChange}
      />
    ),
    [searchTerm, filters, pagination, handlePageChange]
  );

  return (
    <div className="container mx-auto">
      {/* Filter icon and Search Bar in the same row for mobile and tablet */}
      <div className="flex justify-between items-center mb-4 sm:flex md:flex lg:hidden">
        <div className="w-full ml-4">{searchMemo}</div>
        <button className="p-2 ml-2 mb-2" onClick={toggleFilters}>
          {/* Filter Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24"
            color="blue"
            viewBox="0 0 24 24"
            width="24"
            className="color-blue-500">
            <g>
              <path d="M0,0h24 M24,24H0" fill="none" />
              <path
                d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"
                className="color-blue-500"
              />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
          </svg>
        </button>
        <div className="mb-2 mr-2">
          <span className="text-sm text-blue-500">
            <button onClick={clearFilters}>Clear</button>
          </span>
        </div>
      </div>

      {/* Filters and Search layout for larger screens */}
      <div className="grid grid-cols-1 gap-4 w-full text-center md:grid-cols-12 lg:grid-cols-12">
        <div className="md:col-span-4 hidden lg:block">{searchMemo}</div>
        <div
          ref={filterRef}
          className={`md:col-span-7 ${
            filtersVisible ? "block" : "hidden lg:block"
          }`}>
          {filtersMemo}
        </div>
        <div
          className={`md:col-span-1 mt-1 ${
            filtersVisible ? "block" : "hidden lg:block"
          }`}>
          <span className="text-sm text-blue-500">
            <button onClick={clearFilters}>Clear</button>
          </span>
        </div>
      </div>

      {/* Article List */}
      {articleListMemo}
    </div>
  );
}

export default React.memo(GeneralNews);
