import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "./PostCard";
import { AddPostCard } from "./AddPostCard";
import type { Post } from "../../types/post";
import chevronRightIcon from "../../assets/chevron-right.svg";

export interface UserPostsContentProps {
    name?: string;
    posts: Post[];
    onAddPost: () => void;
    onEditPost: (post: Post) => void;
    onDeletePost: (post: Post) => void;
    isDeleting?: boolean;
}

export function UserPostsContent({
    name,
    posts,
    onAddPost,
    onEditPost,
    onDeletePost,
    isDeleting = false,
}: UserPostsContentProps) {
    const navigate = useNavigate();

    const handleBackClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const memoizedPosts = useMemo(() => posts, [posts]);

    return (
        <div className="max-w-6xl xs:min-w-full md:min-w-3xl mx-auto p-6 min-h-[700px]">
            <div className="flex items-center space-x-2 text-gray-500 mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBackClick}
                        className="text-xs sm:text-sm flex items-center gap-4 hover:text-gray-700 transition-colors"
                        aria-label="Go back to users list"
                    >
                        Users List <img src={chevronRightIcon} alt="" aria-hidden="true" />
                    </button>
                    <span className="text-primary-200 text-xs sm:text-sm">{name}</span>
                </div>
            </div>
            <p className="text-primary-100 textxl sm:text-2xl mb-6">{name}</p>
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-primary-200"></h1>
                <p className="text-sm sm:text-base text-primary-200">
                    {name} &bull; {posts?.length} Posts
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full items-stretch">
                <AddPostCard onClick={onAddPost} />

                {memoizedPosts.map((post: Post) => (
                    <PostCard
                        key={post.id}
                        title={post.title}
                        content={post.body}
                        onDelete={() => onDeletePost(post)}
                        onClick={() => onEditPost(post)}
                        isDeleting={isDeleting}
                    />
                ))}
            </div>
        </div>
    );
}

