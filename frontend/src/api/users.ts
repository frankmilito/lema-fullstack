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