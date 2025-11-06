
export const postKeys = {
    all: ['posts'] as const,
    lists: () => [...postKeys.all, 'list'] as const,
    list: (userId: string | number) => [...postKeys.lists(), userId] as const,
};

export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (pageNumber: number, pageSize: number) => [...userKeys.lists(), pageNumber, pageSize] as const,
    count: () => [...userKeys.all, 'count'] as const,
};

