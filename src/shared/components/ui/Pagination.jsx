import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

/**
 * Reusable Pagination Component
 * Premium design with support for mobile and desktop
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis-1");
      }

      // Pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-2");
      }

      // Always show last page
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 px-2 py-4 ${className}`}
    >
      {/* Pagination buttons */}
      <nav className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 transition-all duration-200"
          aria-label="Página anterior"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (typeof page === "string") {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="w-10 h-10 flex items-center justify-center text-gray-400"
                >
                  <MoreHorizontal size={16} />
                </div>
              );
            }

            const isActive = currentPage === page;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow-lg shadow-green-200 ring-2 ring-green-100"
                    : "text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 transition-all duration-200"
          aria-label="Página siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </nav>

      {/* Items counter info */}
      <div className="text-sm text-gray-500 font-medium">
        Página <span className="text-gray-900 font-bold">{currentPage}</span> de{" "}
        <span className="text-gray-900 font-bold">{totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
