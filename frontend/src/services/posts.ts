
import type { Post } from "../types/post";
import { api } from "./api";

export const createPost = async (payload: { body: string, title: string, userId: string }) => {
    const response = await api.post("/posts", payload);
    return response.data;
};

export const deletePost = async (postId: number) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};

export const updatePost = async (postId: string, post: Post) => {
    const response = await api.put(`/posts/${postId}`, post);
    return response.data;
};