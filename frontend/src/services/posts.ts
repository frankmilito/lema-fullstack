
import type { Post } from "../types/post";
import { api } from "./api";

export const createPost = async (payload: { body: string, title: string, user_id: string | number }) => {
    const response = await api.post<Post>("/posts", payload);
    return response.data;
};

export const deletePost = async (postId: number) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};

export const updatePost = async (postId: number, post: Post) => {
    const response = await api.put<Post>(`/posts/${postId}`, post);
    return response.data;
};