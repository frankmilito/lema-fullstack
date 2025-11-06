import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    const [searchParams] = useSearchParams();

    const handleBackClick = useCallback(() => {
        const page = searchParams.get('page') || '1';
        navigate(`/users?page=${page}`);
    }, [navigate, searchParams]);

    return (
        <div className="max-w-6xl xs:min-w-full  mx-auto p-6 min-h-[700px]">
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
                <h1 className="text-xl sm:text-3xl font-medium text-primary-100 mb-6">
                    {name || 'User Posts'}
                </h1>
                <div className="text-xs sm:text-sm text-primary-200">
                    {name} &bull; <span className="text-primary-100">{posts?.length || 0} {posts?.length === 1 ? 'Post' : 'Posts'}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full items-stretch">
                <AddPostCard onClick={onAddPost} />

                {posts.map((post: Post) => (
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

