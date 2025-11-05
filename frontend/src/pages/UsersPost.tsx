import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../components/ui/Spinner";
import { Modal } from "../components/ui/Modal";
import { AddPostForm } from "../components/posts/AddPostForm";
import { PostCard } from "../components/posts/PostCard";
import { AddPostCard } from "../components/posts/AddPostCard";
import type { Post } from "../types/post";
import { useCreatePost, useDeletePost } from "../hooks/usePosts";
import { useGetUserPosts } from "../hooks/useUsers";
import chevronRightIcon from "../assets/chevron-right.svg";

const UserPosts = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const { mutateAsync: deletePost } = useDeletePost();
    const { isLoading, data: posts } = useGetUserPosts(id!);
    const { mutateAsync: createPost } = useCreatePost();
    const location = useLocation();
    const { name } = location.state || {};

    const handleToggle = () => setIsOpen(!isOpen);
    const handleClose = () => setIsOpen(false);

    const handleSubmitPost = async (data: { title: string; body: string }) => {
        await createPost({ body: data.body, title: data.title, userId: id! });
        handleClose();
    };

    const handleDelete = async (postId: number) => {
        await deletePost(postId);
    };

    return (
        <div className="flex min-h-screen justify-center items-center ">
            {isLoading ? (
                <div>
                    <Spinner />
                </div>
            ) : (
                <div className="max-w-5xl min-w-3xl mx-auto p-6 min-h-[400px] ">
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
                            {name} &bull; {posts.length} Posts
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                        <AddPostCard onClick={handleToggle} />

                        {posts.map((post: Post) => (
                            <PostCard
                                key={post.id}
                                title={post.title}
                                content={post.body}
                                onDelete={() => handleDelete(post.id)}
                            />
                        ))}
                    </div>
                </div>
            )}
            <Modal isOpen={isOpen} onClose={handleClose} title="New post">
                <AddPostForm onSubmit={handleSubmitPost} onCancel={handleClose} />
            </Modal>
        </div>
    );
};

export default UserPosts;
