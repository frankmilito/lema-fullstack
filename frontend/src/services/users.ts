
import { api } from "./api";

export const getUsers = async (pageNumber: number, pageSize: number) => {
    const res = await api.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return res.data;
};

export const getUsersCount = async (): Promise<number> => {
    const res = await api.get('/users/count');
    return res.data.count;
};

export const getUserPosts = async (userId: string) => {
    const response = await api.get(`/posts?userId=${userId}`);
    return response.data;
};