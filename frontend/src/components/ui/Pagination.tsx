import type { PaginationConfig } from './Table/types';
import { Button } from './Button';
import chevronRight from '../../assets/chevron-right.svg';
import chevronLeft from '../../assets/chevron-left.svg';

interface PaginationProps extends PaginationConfig {
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    isLoading = false,
    maxVisiblePages = 7,
    className = '',
}: PaginationProps) {
    const getPageNumbers = (): (number | 'ellipsis')[] => {
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | 'ellipsis')[] = [];

        const middlePagesCount = maxVisiblePages - 2;
        const halfMiddle = Math.floor(middlePagesCount / 2);

        let start = Math.max(2, currentPage - halfMiddle);
        let end = Math.min(totalPages - 1, currentPage + halfMiddle);

        if (currentPage <= halfMiddle + 1) {
            start = 2;
            end = Math.min(2 + middlePagesCount - 1, totalPages - 1);
        }

        if (currentPage >= totalPages - halfMiddle) {
            end = totalPages - 1;
            start = Math.max(2, totalPages - middlePagesCount);
        }

        pages.push(1);

        if (start > 2) {
            pages.push('ellipsis');
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) {
            pages.push('ellipsis');
        }

        pages.push(totalPages);

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
            className={`flex items-center justify-end gap-0.5 sm:gap-1 ${className}`}
            aria-label="Pagination"
        >
            <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                variant="ghost"
                size="md"
                aria-label="Previous page"
                aria-disabled={currentPage === 1}
                className="flex items-center gap-0.5 sm:gap-1"
            >
                <img src={chevronLeft} alt="Previous page" />
                <span className="hidden md:inline">Previous</span>
            </Button>

            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) => {
                    if (page === 'ellipsis') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-primary-200"
                            >
                                ...
                            </span>
                        );
                    }

                    const isActive = page === currentPage;

                    return (
                        <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            disabled={isLoading}
                            variant={isActive ? 'secondary' : 'ghost'}
                            size="md"
                            className={isActive ? 'border bg-white border-gray-300' : ''}
                            aria-label={`Page ${page}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {page}
                        </Button>
                    );
                })}
            </div>

            <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                variant="ghost"
                size="md"
                aria-label="Next page"
                aria-disabled={currentPage === totalPages}
                className="flex items-center gap-0.5 sm:gap-1"
            >
                <span className="hidden md:inline">Next</span>
                <img src={chevronRight} alt="Next page" />
            </Button>
        </nav>
    );
}

