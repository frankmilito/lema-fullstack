import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUserPosts, getUsers, getUsersCount } from "../services/users";
import { postKeys, userKeys } from "../utils/queryKeys";

export const useGetUsers = (pageNumber: number, pageSize = 4) => {
    const backendPageNumber = pageNumber - 1;

    const usersQuery = useQuery({
        queryKey: userKeys.list(pageNumber, pageSize),
        queryFn: () => getUsers(backendPageNumber, pageSize),
        placeholderData: keepPreviousData,
    });

    const countQuery = useQuery({
        queryKey: userKeys.count(),
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
        queryKey: postKeys.list(userId),
        queryFn: () => getUserPosts(userId),
        staleTime: 0,
    });

    return query;
};