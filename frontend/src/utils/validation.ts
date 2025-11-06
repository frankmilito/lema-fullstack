
export const validateUserId = (id: string | undefined): string | null => {
    if (!id) return null;
    return id.trim() || null;
};
