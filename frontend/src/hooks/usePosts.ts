import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createPost, deletePost, updatePost } from "../services/posts";
import type { Post } from "../types/post";

interface ApiError {
    response?: {
        data?: {
            error?: string;
        };
    };
}
export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            toast.success("Post Created");
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
        onError: (error) => {
            toast.error("Failed to create post");
            console.error("Failed to create the post:", error);
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            toast.success("Post Deleted");
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to Delete Post");
        },
    });
};

interface UpdatePostParams {
    postId: string;
    post: Post;
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, post }: UpdatePostParams) =>
            updatePost(postId, post),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            toast.success('Post updated successfully');
        },
        onError: (error: ApiError) => {
            const message = error?.response?.data?.error || 'Failed to update post';
            toast.error(message);
        },
    });
};