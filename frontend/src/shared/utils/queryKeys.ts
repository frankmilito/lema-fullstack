export const postKeys = {
    all: ['posts'] as const,
    lists: () => [...postKeys.all, 'list'] as const,
    list: (user_id: string | number) => [...postKeys.lists(), user_id] as const,
};

export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (pageNumber: number, pageSize: number) => [...userKeys.lists(), pageNumber, pageSize] as const,
    count: () => [...userKeys.all, 'count'] as const,
};


