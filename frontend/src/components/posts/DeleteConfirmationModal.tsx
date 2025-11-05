import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import type { Post } from '../../types/post';

export interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    post?: Post | null;
    isLoading?: boolean;
}

export function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    post,
    isLoading = false,
}: DeleteConfirmationModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Post">
            <div className="space-y-4">
                <p className="text-sm sm:text-base text-gray-700">
                    Are you sure you want to delete this post? This action cannot be undone.
                </p>
                {post && (
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1">
                            {post.title}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                            {post.body}
                        </p>
                    </div>
                )}
                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="primary"
                        onClick={onConfirm}
                        isLoading={isLoading}
                        disabled={isLoading}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

