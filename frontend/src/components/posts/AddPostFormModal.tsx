import { Modal } from '../ui';
import { AddPostForm } from './AddPostForm';
import type { Post } from '../../types/post';

export interface AddPostFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; body: string }) => void | Promise<void>;
    isLoading?: boolean;
    editingPost?: Post | null;
}

export function AddPostFormModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
    editingPost = null,
}: AddPostFormModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={editingPost ? "Edit post" : "New post"}>
            <AddPostForm
                key={editingPost?.id || 'new-post'}
                onSubmit={onSubmit}
                onCancel={onClose}
                isLoading={isLoading}
                initialTitle={editingPost?.title || ''}
                initialBody={editingPost?.body || ''}
            />
        </Modal>
    );
}

