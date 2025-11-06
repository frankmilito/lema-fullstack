import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createPost, deletePost, updatePost } from "../services/posts";
import type { Post } from "../types/post";
import { postKeys } from "../utils/queryKeys";

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
        onSuccess: (_, variables) => {
            toast.success("Post Created");
            queryClient.invalidateQueries({
                queryKey: postKeys.list(variables.userId),
            });
        },
        onError: (error: ApiError) => {
            const message = error?.response?.data?.error || "Failed to create post";
            toast.error(message);
            console.error("Failed to create the post:", error);
        },
    });
};

export const useDeletePost = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePost,
        onMutate: async (postId: string) => {
            await queryClient.cancelQueries({ queryKey: postKeys.list(userId) });

            // Snapshot previous value
            const previousPosts = queryClient.getQueryData<Post[]>(postKeys.list(userId));

            // Optimistically update
            queryClient.setQueryData<Post[]>(postKeys.list(userId), (old) =>
                old?.filter(post => post.id !== postId) ?? []
            );

            return { previousPosts };
        },
        onError: (err, _postId, context) => {
            if (context?.previousPosts) {
                queryClient.setQueryData(postKeys.list(userId), context.previousPosts);
            }
            const error = err as ApiError;
            const message = error?.response?.data?.error || "Failed to Delete Post";
            toast.error(message);
            console.error("Failed to delete post:", err);
        },
        onSuccess: () => {
            toast.success("Post Deleted");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.list(userId) });
        },
    });
};

interface UpdatePostParams {
    postId: string;
    post: Post;
}

export const useUpdatePost = (userId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, post }: UpdatePostParams) =>
            updatePost(postId, post),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.list(userId) });
            toast.success('Post updated successfully');
        },
        onError: (error: ApiError) => {
            const message = error?.response?.data?.error || 'Failed to update post';
            toast.error(message);
            console.error('Failed to update post:', error);
        },
    });
};