import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddPostForm } from './AddPostForm';

describe('AddPostForm Component', () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Create Post', () => {
        it('should render form fields correctly', () => {
            render(
                <AddPostForm
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                />
            );

            expect(screen.getByLabelText(/post title/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/post content/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/give your post a title/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/write something mind-blowing/i)).toBeInTheDocument();
        });

        it('should display Publish button for new posts', () => {
            render(
                <AddPostForm
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                />
            );

            expect(screen.getByRole('button', { name: /publish/i })).toBeInTheDocument();
        });

        it('should call onSubmit with form data when form is submitted', async () => {
            const user = userEvent.setup();
            render(
                <AddPostForm
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                />
            );

            const titleInput = screen.getByLabelText(/post title/i);
            const bodyInput = screen.getByLabelText(/post content/i);
            const submitButton = screen.getByRole('button', { name: /publish/i });

            await user.type(titleInput, 'Test Post Title');
            await user.type(bodyInput, 'Test post body content');
            await user.click(submitButton);

            await waitFor(() => {
                expect(mockOnSubmit).toHaveBeenCalledWith({
                    title: 'Test Post Title',
                    body: 'Test post body content',
                });
            });
        });

        it('should show validation errors for empty fields', async () => {
            const user = userEvent.setup();
            render(
                <AddPostForm
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                />
            );

            const submitButton = screen.getByRole('button', { name: /publish/i });
            await user.click(submitButton);

            await waitFor(() => {
                const errorMessages = screen.getAllByText(/required/i);
                expect(errorMessages.length).toBeGreaterThan(0);
            });

            expect(mockOnSubmit).not.toHaveBeenCalled();
        });

        it('should reset form after successful submission for new post', async () => {
            const user = userEvent.setup();
            mockOnSubmit.mockResolvedValue(undefined);

            render(
                <AddPostForm
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                />
            );

            const titleInput = screen.getByLabelText(/post title/i);
            const bodyInput = screen.getByLabelText(/post content/i);
            const submitButton = screen.getByRole('button', { name: /publish/i });

            await user.type(titleInput, 'Test Post Title');
            await user.type(bodyInput, 'This is a test post body content that is long enough');
            await user.click(submitButton);

            await waitFor(
                () => {
                    expect(mockOnSubmit).toHaveBeenCalled();
                    expect(titleInput).toHaveValue('');
                    expect(bodyInput).toHaveValue('');
                },
                { timeout: 3000 }
            );
        });
    });

    describe('Edit Post', () => {
        it('should display Update button when editing existing post', () => {
            render(
                <AddPostForm
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                    initialTitle="Existing Title"
                    initialBody="Existing Body"
                />
            );

            expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
            expect(screen.queryByRole('button', { name: /publish/i })).not.toBeInTheDocument();
        });

        it('should pre-fill form fields with initial values', () => {
            render(
                <AddPostForm
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                    initialTitle="Existing Title"
                    initialBody="Existing Body"
                />
            );

            expect(screen.getByDisplayValue('Existing Title')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Existing Body')).toBeInTheDocument();
        });

        it('should call onSubmit with updated data when editing', async () => {
            const user = userEvent.setup();
            render(
                <AddPostForm
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                    initialTitle="Existing Title"
                    initialBody="Existing Body"
                />
            );

            const titleInput = screen.getByLabelText(/post title/i);
            const submitButton = screen.getByRole('button', { name: /update/i });

            await user.clear(titleInput);
            await user.type(titleInput, 'Updated Title');
            await user.click(submitButton);

            await waitFor(() => {
                expect(mockOnSubmit).toHaveBeenCalledWith({
                    title: 'Updated Title',
                    body: 'Existing Body',
                });
            });
        });

        it('should not reset form after submission when editing', async () => {
            const user = userEvent.setup();
            mockOnSubmit.mockResolvedValue(undefined);

            render(
                <AddPostForm
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                    initialTitle="Existing Title"
                    initialBody="Existing Body"
                />
            );

            const titleInput = screen.getByLabelText(/post title/i);
            const submitButton = screen.getByRole('button', { name: /update/i });

            await user.click(submitButton);

            await waitFor(() => {
                expect(mockOnSubmit).toHaveBeenCalled();
            });

            expect(titleInput).toHaveValue('Existing Title');
        });
    });

    describe('Loading State', () => {
        it('should disable form fields when loading', () => {
            render(
                <AddPostForm
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                    isLoading={true}
                />
            );

            const titleInput = screen.getByLabelText(/post title/i);
            const bodyInput = screen.getByLabelText(/post content/i);
            const submitButton = screen.getByRole('button', { name: /publish/i });

            expect(titleInput).toBeDisabled();
            expect(bodyInput).toBeDisabled();
            expect(submitButton).toBeDisabled();
        });
    });

    describe('Cancel Button', () => {
        it('should call onCancel when cancel button is clicked', async () => {
            const user = userEvent.setup();
            render(
                <AddPostForm
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                />
            );

            const cancelButton = screen.getByRole('button', { name: /cancel/i });
            await user.click(cancelButton);

            expect(mockOnCancel).toHaveBeenCalledTimes(1);
        });
    });
});

