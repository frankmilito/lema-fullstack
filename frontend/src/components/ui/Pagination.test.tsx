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
        it('should display all pages when totalPages <= maxVisiblePages', () => {
            render(
                <Pagination
                    currentPage={1}
                    totalPages={5}
                    onPageChange={mockOnPageChange}
                    maxVisiblePages={7}
                    {...defaultProps}
                />
            );

            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
            expect(screen.getByText('3')).toBeInTheDocument();
            expect(screen.getByText('4')).toBeInTheDocument();
            expect(screen.getByText('5')).toBeInTheDocument();
            expect(screen.queryByText('...')).not.toBeInTheDocument();
        });

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

        it('should show correct pages when at the beginning', () => {
            render(
                <Pagination
                    currentPage={2}
                    totalPages={20}
                    onPageChange={mockOnPageChange}
                    maxVisiblePages={5}
                    {...defaultProps}
                />
            );

            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
            expect(screen.getByText('3')).toBeInTheDocument();
            expect(screen.getByText('20')).toBeInTheDocument();
        });

        it('should show correct pages when at the end', () => {
            render(
                <Pagination
                    currentPage={19}
                    totalPages={20}
                    onPageChange={mockOnPageChange}
                    maxVisiblePages={5}
                    {...defaultProps}
                />
            );

            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('18')).toBeInTheDocument();
            expect(screen.getByText('19')).toBeInTheDocument();
            expect(screen.getByText('20')).toBeInTheDocument();
        });

        it('should show correct pages when in the middle', () => {
            render(
                <Pagination
                    currentPage={10}
                    totalPages={20}
                    onPageChange={mockOnPageChange}
                    maxVisiblePages={5}
                    {...defaultProps}
                />
            );

            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('10')).toBeInTheDocument();
            expect(screen.getByText('20')).toBeInTheDocument();
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

        it('should not highlight other pages', () => {
            render(
                <Pagination
                    currentPage={3}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            const otherPageButton = screen.getByText('2').closest('button');
            expect(otherPageButton).not.toHaveClass('border');
        });
    });

    describe('Navigation Buttons', () => {
        it('should disable previous button on first page', () => {
            render(
                <Pagination
                    currentPage={1}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            const prevButton = screen.getByLabelText('Previous page');
            expect(prevButton).toBeDisabled();
        });

        it('should disable next button on last page', () => {
            render(
                <Pagination
                    currentPage={10}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            const nextButton = screen.getByLabelText('Next page');
            expect(nextButton).toBeDisabled();
        });

        it('should enable previous button when not on first page', () => {
            render(
                <Pagination
                    currentPage={5}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            const prevButton = screen.getByLabelText('Previous page');
            expect(prevButton).not.toBeDisabled();
        });

        it('should enable next button when not on last page', () => {
            render(
                <Pagination
                    currentPage={5}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            const nextButton = screen.getByLabelText('Next page');
            expect(nextButton).not.toBeDisabled();
        });
    });

    describe('Page Change Interactions', () => {
        it('should call onPageChange when clicking a page number', async () => {
            const user = userEvent.setup();
            render(
                <Pagination
                    currentPage={1}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            const page5Button = screen.getByLabelText('Page 5');
            await user.click(page5Button);

            expect(mockOnPageChange).toHaveBeenCalledWith(5);
        });

        it('should call onPageChange when clicking next button', async () => {
            const user = userEvent.setup();
            render(
                <Pagination
                    currentPage={5}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            const nextButton = screen.getByLabelText('Next page');
            await user.click(nextButton);

            expect(mockOnPageChange).toHaveBeenCalledWith(6);
        });

        it('should call onPageChange when clicking previous button', async () => {
            const user = userEvent.setup();
            render(
                <Pagination
                    currentPage={5}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            const prevButton = screen.getByLabelText('Previous page');
            await user.click(prevButton);

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

        it('should not call onPageChange when loading', async () => {
            const user = userEvent.setup();
            render(
                <Pagination
                    currentPage={5}
                    totalPages={10}
                    onPageChange={mockOnPageChange}
                    isLoading={true}
                    {...defaultProps}
                />
            );

            const pageButton = screen.getByLabelText('Page 6');
            await user.click(pageButton);

            expect(mockOnPageChange).not.toHaveBeenCalled();
        });
    });

    describe('Edge Cases', () => {
        it('should handle single page correctly', () => {
            render(
                <Pagination
                    currentPage={1}
                    totalPages={1}
                    onPageChange={mockOnPageChange}
                    {...defaultProps}
                />
            );

            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByLabelText('Previous page')).toBeDisabled();
            expect(screen.getByLabelText('Next page')).toBeDisabled();
        });

        it('should handle maxVisiblePages correctly', () => {
            render(
                <Pagination
                    currentPage={1}
                    totalPages={100}
                    onPageChange={mockOnPageChange}
                    maxVisiblePages={3}
                    {...defaultProps}
                />
            );

            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument();
            expect(screen.getByText('100')).toBeInTheDocument();
        });
    });
});

