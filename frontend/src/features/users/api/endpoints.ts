import { api } from '@shared/utils/api';
import type { User } from '../types/user.types';
import type { Post } from '../../posts/types/post.types';

export const getUsers = async (pageNumber: number, pageSize: number): Promise<User[]> => {
    const res = await api.get<User[]>(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return res.data;
};

export const getUsersCount = async (): Promise<number> => {
    const res = await api.get<{ count: number }>('/users/count');
    return res.data.count;
};

export const getUserPosts = async (userId: string | number): Promise<Post[]> => {
    const response = await api.get<Post[]>(`/posts?userId=${userId}`);
    return response.data;
};

