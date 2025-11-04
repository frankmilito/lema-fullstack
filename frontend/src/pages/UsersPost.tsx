import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Spinner from "../components/ui/Spinner";
import { useGetUserPosts } from "../api/users";
import { Modal } from "../components/ui/Modal";
import { AddPostForm } from "../components/posts/AddPostForm";
import { PostCard } from "../components/posts/PostCard";
import { AddPostCard } from "../components/posts/AddPostCard";
import type { Post } from "../types/post";


const UserPosts = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    // const { mutate: deletePost } = useDeletePost(id!);
    const { isLoading, data: posts = [] } = useGetUserPosts(id!);

    const location = useLocation();
    const { name } = location.state || {};

    const handleToggle = () => setIsOpen(!isOpen);
    const handleClose = () => setIsOpen(false);

    const handleSubmitPost = async (data: { title: string; body: string }) => {
        // TODO: Implement API call to create post
        console.log('Creating post:', data, 'for user:', id);
        // After successful creation, close modal and refresh posts
        handleClose();
    };

    // const handleDelete = (postId: string) => {
    //     deletePost(postId);
    // };

    return (
        <div className="flex min-h-screen justify-center items-center ">
            {isLoading ? (
                <div>
                    <Spinner />
                </div>
            ) : (
                <div className="max-w-5xl mx-auto p-6 min-h-[600px] ">
                    <div className="flex items-center space-x-2 text-gray-500 mb-6">
                        <Link to="/" className="text-sm hover:underline">
                            &larr; Back to Users
                        </Link>
                    </div>

                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800"></h1>
                        <p className="text-gray-500">
                            {name} &bull; {posts.length} Posts
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AddPostCard onClick={handleToggle} />

                        {posts.map((post: Post) => (
                            <PostCard
                                key={post.id}
                                title={post.title}
                                content={post.body}
                                onDelete={() => {
                                    // TODO: Implement delete functionality
                                    // handleDelete(post.id);
                                }}
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
