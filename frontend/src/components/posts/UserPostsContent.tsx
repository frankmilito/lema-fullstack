import { Link } from "react-router-dom";
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
}

export function UserPostsContent({
    name,
    posts,
    onAddPost,
    onEditPost,
    onDeletePost,
}: UserPostsContentProps) {
    return (
        <div className="max-w-5xl xs:min-w-full md:min-w-3xl mx-auto p-6 min-h-[400px]">
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
                <AddPostCard onClick={onAddPost} />

                {posts.map((post: Post) => (
                    <PostCard
                        key={post.id}
                        title={post.title}
                        content={post.body}
                        onDelete={() => onDeletePost(post)}
                        onClick={() => onEditPost(post)}
                    />
                ))}
            </div>
        </div>
    );
}

