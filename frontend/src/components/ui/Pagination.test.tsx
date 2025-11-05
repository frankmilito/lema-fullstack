import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
    const mockOnPageChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const defaultProps = {
        totalItems: 100,
        pageSize: 10,
    };

    describe('Page Number Display', () => {
        it('should show ellipsis when pages exceed maxVisiblePages', () => {
            render(
                <Pagination
                    currentPage={5}
                    totalPages={20}
                    onPageChange={mockOnPageChange}
                    maxVisiblePages={5}
                    {...defaultProps}
                />
            );

            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('5')).toBeInTheDocument();
            expect(screen.getByText('20')).toBeInTheDocument();

            const ellipses = screen.getAllByText('...');
            expect(ellipses.length).toBeGreaterThan(0);
        });
    });

    describe('Current Page Highlighting', () => {
        it('should highlight the current page', () => {
            render(
                <Pagination
                    currentPage={3}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            const currentPageButton = screen.getByText('3').closest('button');
            expect(currentPageButton).toHaveClass('border');
        });
    });

    describe('Navigation Buttons', () => {
        it('should disable previous button on first page and next on last page', () => {
            const { rerender } = render(
                <Pagination
                    currentPage={1}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            expect(screen.getByLabelText('Previous page')).toBeDisabled();

            rerender(
                <Pagination
                    currentPage={10}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            expect(screen.getByLabelText('Next page')).toBeDisabled();
        });
    });

    describe('Page Change Interactions', () => {
        it('should call onPageChange when clicking page number or navigation buttons', async () => {
            const user = userEvent.setup();
            render(
                <Pagination
                    currentPage={5}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            await user.click(screen.getByLabelText('Page 6'));
            expect(mockOnPageChange).toHaveBeenCalledWith(6);

            await user.click(screen.getByLabelText('Next page'));
            expect(mockOnPageChange).toHaveBeenCalledWith(6);

            await user.click(screen.getByLabelText('Previous page'));
            expect(mockOnPageChange).toHaveBeenCalledWith(4);
        });

        it('should not call onPageChange when clicking current page', async () => {
            const user = userEvent.setup();
            render(
                <Pagination
                    currentPage={5}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            const currentPageButton = screen.getByLabelText('Page 5');
            await user.click(currentPageButton);

            expect(mockOnPageChange).not.toHaveBeenCalled();
        });

        it('should not call onPageChange when clicking ellipsis', async () => {
            const user = userEvent.setup();
            render(
                <Pagination
                    currentPage={10}
                    totalPages={20}
                    onPageChange={mockOnPageChange}
                    maxVisiblePages={5}
                    {...defaultProps}
                />
            );

            const ellipsis = screen.getAllByText('...')[0];
            await user.click(ellipsis);

            expect(mockOnPageChange).not.toHaveBeenCalled();
        });
    });

    describe('Loading State', () => {
        it('should disable all buttons when loading', () => {
            render(
                <Pagination
                    currentPage={5}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    isLoading={true}
                    {...defaultProps}
                />
            );

            const prevButton = screen.getByLabelText('Previous page');
            const nextButton = screen.getByLabelText('Next page');
            const pageButtons = screen.getAllByLabelText(/^Page \d+$/);

            expect(prevButton).toBeDisabled();
            expect(nextButton).toBeDisabled();
            pageButtons.forEach(button => {
                expect(button).toBeDisabled();
            });
        });
    });
});

