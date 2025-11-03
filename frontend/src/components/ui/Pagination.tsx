import type { PaginationConfig } from './Table/types';

interface PaginationProps extends PaginationConfig {
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    isLoading = false,
    maxVisiblePages = 4,
    className = '',
}: PaginationProps) {
    const getPageNumbers = (): (number | 'ellipsis')[] => {
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | 'ellipsis')[] = [];
        const halfVisible = Math.floor(maxVisiblePages / 2);

        pages.push(1);

        let start = Math.max(2, currentPage - halfVisible);
        let end = Math.min(totalPages - 1, currentPage + halfVisible);

        if (currentPage <= halfVisible + 1) {
            end = Math.min(maxVisiblePages - 1, totalPages - 1);
        }

        if (currentPage >= totalPages - halfVisible) {
            start = Math.max(2, totalPages - maxVisiblePages + 2);
        }

        if (start > 2) {
            pages.push('ellipsis');
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) {
            pages.push('ellipsis');
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    const handlePageChange = (page: number) => {
        if (isLoading || page < 1 || page > totalPages || page === currentPage) {
            return;
        }
        onPageChange(page);
    };

    return (
        <nav
            className={`flex items-center justify-end gap-1 ${className}`}
            aria-label="Pagination"
        >
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className={`
          px-3 py-2 text-sm font-medium rounded-md
          transition-colors
          ${currentPage === 1 || isLoading
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
        `}
                aria-label="Previous page"
                aria-disabled={currentPage === 1}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) => {
                    if (page === 'ellipsis') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-3 py-2 text-sm font-medium text-gray-500"
                            >
                                ...
                            </span>
                        );
                    }

                    const isActive = page === currentPage;

                    return (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            disabled={isLoading}
                            className={`
                min-w-10 px-3 py-2 text-sm font-medium rounded-md
                transition-colors
                ${isActive
                                    ? 'bg-gray-100 text-gray-900 border border-gray-300'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }
                ${isLoading ? 'cursor-not-allowed opacity-50' : ''}
              `}
                            aria-label={`Page ${page}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className={`
          px-3 py-2 text-sm font-medium rounded-md
          transition-colors
          ${currentPage === totalPages || isLoading
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
        `}
                aria-label="Next page"
                aria-disabled={currentPage === totalPages}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </nav>
    );
}

