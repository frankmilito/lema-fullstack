import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUserPosts, getUsers, getUsersCount } from "../services/users";

export const useGetUsers = (pageNumber: number, pageSize = 4) => {
    const backendPageNumber = pageNumber - 1;

    const usersQuery = useQuery({
        queryKey: ['users', pageNumber, pageSize],
        queryFn: () => getUsers(backendPageNumber, pageSize),
        placeholderData: keepPreviousData,
    });

    const countQuery = useQuery({
        queryKey: ['users', 'count'],
        queryFn: getUsersCount,
    });

    const totalPages = countQuery.data
        ? Math.ceil(countQuery.data / pageSize)
        : 0;

    return {
        ...usersQuery,
        totalCount: countQuery.data ?? 0,
        totalPages,
        isCountLoading: countQuery.isLoading,
    };
};

export const useGetUserPosts = (userId: string) => {
    const query = useQuery({
        queryKey: ["posts", userId],
        queryFn: () => getUserPosts(userId),
        staleTime: 0,
    });

    return query;
};