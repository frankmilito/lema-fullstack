import type { Post } from '../types/post.types';
import { api } from '@shared/utils/api';

export const createPost = async (payload: { body: string, title: string, user_id: string | number }) => {
    const response = await api.post<Post>("/posts", payload);
    return response.data;
};

export const deletePost = async (postId: number) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};

