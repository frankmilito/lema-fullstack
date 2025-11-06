import { useLocation, useParams, } from "react-router-dom";
import { useState } from "react";
import Spinner from "../components/ui/Spinner";
import { AddPostFormModal } from "../components/posts/AddPostFormModal";
import { DeleteConfirmationModal } from "../components/posts/DeleteConfirmationModal";
import { UserPostsContent } from "../components/posts/UserPostsContent";
import type { Post } from "../types/post";
import { useCreatePost, useDeletePost, useUpdatePost } from "../hooks/usePosts";
import { useGetUserPosts } from "../hooks/useUsers";

const UserPosts = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const { id } = useParams();
    const location = useLocation();
    const { name } = location.state || {};

    const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost(id!);
    const { isLoading, data: posts, error } = useGetUserPosts(id!);
    const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost(id!);

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
                await createPost({ body: data.body, title: data.title, userId: id! });
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting post:', error);
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
                console.error('Error deleting post:', error);
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
            <div className="flex min-h-screen justify-center items-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Error loading posts: {error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
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
