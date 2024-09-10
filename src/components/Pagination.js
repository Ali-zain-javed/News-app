import React, { useCallback, useMemo } from "react";

const Pagination = React.memo(
  ({ currentPage, totalRecords, recordsPerPage = 10, onPageChange }) => {
    const totalPages = useMemo(
      () => Math.ceil(totalRecords / recordsPerPage),
      [totalRecords, recordsPerPage]
    );

    const handlePageChange = useCallback(
      (page) => {
        if (page < 1 || page > totalPages) return; // Avoid invalid pages
        onPageChange(page);
      },
      [onPageChange, totalPages]
    );

    // Generate page numbers to display
    const generatePageNumbers = useMemo(() => {
      const pages = [];
      if (totalPages <= 7) {
        // If total pages are less than or equal to 7, show all pages
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Always show first 4 pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        // Show ellipsis if needed
        if (currentPage > 5) {
          pages.push("...");
        }
        // Show current page and neighboring pages
        const start = Math.max(5, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        // Show ellipsis if needed
        if (currentPage < totalPages - 4) {
          pages.push("...");
        }
        // Always show the last page
        pages.push(totalPages);
      }
      return pages;
    }, [currentPage, totalPages]);

    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            disabled={currentPage === 1}>
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="ml-2 mr-2">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * recordsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * recordsPerPage, totalRecords)}
              </span>{" "}
              of <span className="font-medium">{totalRecords}</span> results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                disabled={currentPage === 1}>
                <span className="sr-only">Previous</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              {generatePageNumbers.map((page, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (page !== "...") handlePageChange(page);
                  }}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    page === currentPage
                      ? "bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  }`}
                  aria-current={page === currentPage ? "page" : undefined}>
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                disabled={currentPage === totalPages}>
                <span className="sr-only">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  }
);

export default Pagination;
