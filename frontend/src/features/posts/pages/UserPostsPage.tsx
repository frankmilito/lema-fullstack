import { useParams, useSearchParams } from "react-router-dom";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, EmptyMessage, Modal, Typography } from "@shared/components/ui";
import { PostCard } from "../components/PostCard";
import { AddPostCard } from "../components/AddPostCard";
import { PostForm } from "../components/PostForm";
import { DeletePostButton } from "../components/DeletePostButton";
import type { Post } from "../types/post.types";
import { useCreatePost, useDeletePost } from "../api/mutations";
import { useGetUserPosts } from "../api/queries";
import { validateUserId } from "@shared/utils/validation";
import chevronRightIcon from "@assets/chevron-right.svg";

export default function UserPostsPage() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const name = searchParams.get('user') || '';
    const userId = validateUserId(id) || '';
    const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost(userId);
    const { isLoading, data: posts, error } = useGetUserPosts(userId);
    const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();

    const handleAddPost = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmitPost = async (data: { title: string; body: string }) => {
        try {
            await createPost({ body: data.body, title: data.title, user_id: userId });
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

    const handleBackClick = useCallback(() => {
        const page = searchParams.get('page') || '1';
        navigate(`/users?page=${page}`);
    }, [navigate, searchParams]);

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
            <div className="max-w-6xl xs:min-w-full mx-auto p-6 min-h-[700px]">
                <div className="flex items-center space-x-2 text-gray-500 mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBackClick}
                            className="text-xs sm:text-sm flex items-center gap-4 hover:text-gray-700 transition-colors"
                            aria-label="Go back to users list"
                        >
                            Users List <img src={chevronRightIcon} alt="" aria-hidden="true" />
                        </button>
                        <span className="text-primary-100 text-xs sm:text-sm">{name}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <Typography variant="h1" className="mb-6">
                        {name || 'User Posts'}
                    </Typography>
                    <div className="text-xs sm:text-sm text-primary-200">
                        {name} &bull; <span className="text-primary-100">{posts?.length || 0} {posts?.length === 1 ? 'Post' : 'Posts'}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full items-stretch">
                    <AddPostCard onClick={handleAddPost} />

                    {posts?.map((post: Post) => (
                        <PostCard
                            key={post.id}
                            title={post.title}
                            content={post.body}
                            onDelete={() => handleDeleteClick(post)}
                            isDeleting={isDeleting}
                        />
                    ))}
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={handleClose} title="New post">
                <PostForm
                    onSubmit={handleSubmitPost}
                    onCancel={handleClose}
                    isLoading={isCreating}
                />
            </Modal>
            <DeletePostButton
                isOpen={isDeleteModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                post={postToDelete}
                isLoading={isDeleting}
            />
        </div>
    );
}
