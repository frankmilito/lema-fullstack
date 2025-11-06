import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Spinner, EmptyMessage } from "../components/ui";
import { AddPostFormModal } from "../components/posts/AddPostFormModal";
import { DeleteConfirmationModal } from "../components/posts/DeleteConfirmationModal";
import { UserPostsContent } from "../components/posts/UserPostsContent";
import type { Post } from "../types/post";
import { useCreatePost, useDeletePost, useUpdatePost } from "../hooks/usePosts";
import { useGetUserPosts } from "../hooks/useUsers";
import { validateUserId } from "../utils/validation";

const UserPosts = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const name = searchParams.get('user') || '';
    const userId = validateUserId(id) || '';
    const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost(userId);
    const { isLoading, data: posts, error } = useGetUserPosts(userId);
    const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost(userId);

    const handleAddPost = () => {
        setEditingPost(null);
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
        setEditingPost(null);
    };

    const handleEditPost = (post: Post) => {
        setEditingPost(post);
        setIsOpen(true);
    };

    const handleSubmitPost = async (data: { title: string; body: string }) => {
        try {
            if (editingPost && editingPost.id) {
                await updatePost({
                    postId: editingPost.id,
                    post: {
                        ...editingPost,
                        title: data.title,
                        body: data.body,
                    },
                });
            } else {
                await createPost({ body: data.body, title: data.title, user_id: userId });
            }
            handleClose();
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Error submitting post:', error);
            }
        }
    };

    const handleDeleteClick = (post: Post) => {
        setPostToDelete(post);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (postToDelete && postToDelete.id) {
            try {
                await deletePost(postToDelete.id);
                setIsDeleteModalOpen(false);
                setPostToDelete(null);
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.error('Error deleting post:', error);
                }
            }
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setPostToDelete(null);
    };

    if (isLoading) {
        return <Spinner className="min-h-screen" />
    }

    if (error) {
        return (
            <div className="flex min-h-screen justify-center items-center px-4">
                <div className="max-w-md w-full">
                    <EmptyMessage
                        message={`Error loading posts: ${error.message || 'An unexpected error occurred'}`}
                        variant="error"
                    />
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            aria-label="Retry loading posts"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen justify-center items-center">
            <UserPostsContent
                name={name}
                posts={posts || []}
                onAddPost={handleAddPost}
                onEditPost={handleEditPost}
                onDeletePost={handleDeleteClick}
                isDeleting={isDeleting}
            />
            <AddPostFormModal
                isOpen={isOpen}
                onClose={handleClose}
                onSubmit={handleSubmitPost}
                isLoading={isCreating || isUpdating}
                editingPost={editingPost}
            />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                post={postToDelete}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default UserPosts;
