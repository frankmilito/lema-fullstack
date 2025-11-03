import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers, getUsersCount } from "../api/users";

export const useUsers = (pageNumber: number, pageSize = 4) => {
    // Backend uses 0-indexed page numbers, so convert from 1-indexed
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