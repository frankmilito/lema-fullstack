import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../components/ui/Spinner";
import { Modal } from "../components/ui/Modal";
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
    const { id } = useParams();
    const { mutateAsync: deletePost } = useDeletePost();
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

    const handleDelete = async (postId: number) => {
        await deletePost(postId);
    };

    return (
        <div className="flex min-h-screen justify-center items-center ">
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="max-w-5xl xs:min-w-full md:min-w-3xl mx-auto p-6 min-h-[400px] ">
                    <div className="flex items-center space-x-2 text-gray-500 mb-6">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-sm flex items-center gap-4">
                                Users List <img src={chevronRightIcon} />
                            </Link>
                            <span className="text-primary-200 text-sm">{name}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-primary-200"></h1>
                        <p className="text-primary-200">
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
                                onDelete={() => handleDelete(post.id!)}
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
        </div>
    );
};

export default UserPosts;
