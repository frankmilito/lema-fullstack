import { Modal } from '../ui';
import { AddPostForm } from './AddPostForm';

export interface AddPostFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; body: string }) => void | Promise<void>;
    isLoading?: boolean;
}

export function AddPostFormModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
}: AddPostFormModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="New post">
            <AddPostForm
                onSubmit={onSubmit}
                onCancel={onClose}
                isLoading={isLoading}
            />
        </Modal>
    );
}

