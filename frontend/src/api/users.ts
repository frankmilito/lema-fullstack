import { useQuery } from "@tanstack/react-query";
import { api } from "./client";

export const getUsers = async (
    pageNumber: number,
    pageSize: number
) => {
    const res = await api.get(
        `/users?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data;
};

export const getUsersCount = async (): Promise<number> => {
    const res = await api.get('/users/count');
    return res.data.count;
};

export const useGetUserPosts = (userId: string) => {
    const getPosts = async () => {
        const response = await api.get(`/posts?userId=${userId}`);
        return response.data;
    };
    const query = useQuery({
        queryKey: ["posts", userId],
        queryFn: getPosts,
        staleTime: 0,
    });

    return query;
};