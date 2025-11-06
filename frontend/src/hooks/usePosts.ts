import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createPost, deletePost } from "../services/posts";
import type { Post } from "../types/post";
import { postKeys } from "../utils/queryKeys";
import type { ApiError } from "../services/api";

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost,
        onSuccess: (_, variables) => {
            toast.success("Post Created");
            queryClient.invalidateQueries({
                queryKey: postKeys.list(variables.user_id),
            });
        },
        onError: (error: ApiError) => {
            const message = error.message || "Failed to create post";
            toast.error(message);
            if (import.meta.env.DEV) {
                console.error("Failed to create the post:", error);
            }
        },
    });
};

export const useDeletePost = (userId: string | number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePost,
        onMutate: async (postId: number) => {
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
            const message = err.message || "Failed to Delete Post";
            toast.error(message);
            if (import.meta.env.DEV) {
                console.error("Failed to delete post:", err);
            }
        },
        onSuccess: () => {
            toast.success("Post Deleted");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.list(userId) });
        },
    });
};