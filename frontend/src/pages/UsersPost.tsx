import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../components/ui/Spinner";
import { Modal } from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
import { AddPostForm } from "../components/posts/AddPostForm";
import { PostCard } from "../components/posts/PostCard";
import { AddPostCard } from "../components/posts/AddPostCard";
import type { Post } from "../types/post";
import { useCreatePost, useDeletePost, useUpdatePost } from "../hooks/usePosts";
import { useGetUserPosts } from "../hooks/useUsers";
import chevronRightIcon from "../assets/chevron-right.svg";

const UserPosts = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const { id } = useParams();
    const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();
    const { isLoading, data: posts } = useGetUserPosts(id!);
    const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost();
    const location = useLocation();
    const { name } = location.state || {};

    const handleToggle = () => {
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
        if (editingPost && editingPost.id) {
            await updatePost({
                postId: editingPost.id.toString(),
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
    };

    const handleDeleteClick = (post: Post) => {
        setPostToDelete(post);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (postToDelete && postToDelete.id) {
            await deletePost(postToDelete.id);
            setIsDeleteModalOpen(false);
            setPostToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setPostToDelete(null);
    };

    return (
        <div className="flex min-h-screen justify-center items-center ">
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="max-w-5xl xs:min-w-full md:min-w-3xl mx-auto p-6 min-h-[400px] ">
                    <div className="flex items-center space-x-2 text-gray-500 mb-6">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-xs sm:text-sm flex items-center gap-4">
                                Users List <img src={chevronRightIcon} />
                            </Link>
                            <span className="text-primary-200 text-xs sm:text-sm">{name}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-primary-200"></h1>
                        <p className="text-sm sm:text-base text-primary-200">
                            {name} &bull; {posts?.length} Posts
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                        <AddPostCard onClick={handleToggle} />

                        {posts.map((post: Post) => (
                            <PostCard
                                key={post.id}
                                title={post.title}
                                content={post.body}
                                onDelete={() => handleDeleteClick(post)}
                                onClick={() => handleEditPost(post)}
                            />
                        ))}
                    </div>
                </div>
            )}
            <Modal isOpen={isOpen} onClose={handleClose} title={editingPost ? "Edit post" : "New post"}>
                <AddPostForm
                    key={editingPost?.id || 'new-post'}
                    onSubmit={handleSubmitPost}
                    onCancel={handleClose}
                    isLoading={isCreating || isUpdating}
                    initialTitle={editingPost?.title || ''}
                    initialBody={editingPost?.body || ''}
                />
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={handleCancelDelete} title="Delete Post">
                <div className="space-y-4">
                    <p className="text-sm sm:text-base text-gray-700">
                        Are you sure you want to delete this post? This action cannot be undone.
                    </p>
                    {postToDelete && (
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1">
                                {postToDelete.title}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                                {postToDelete.body}
                            </p>
                        </div>
                    )}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancelDelete}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            onClick={handleConfirmDelete}
                            isLoading={isDeleting}
                            disabled={isDeleting}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserPosts;
