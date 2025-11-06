import { z } from 'zod';

export const paginateUserSchema = z.object({
    pageNumber: z.string().min(1, { message: 'Page number is required' }),
    pageSize: z.string().min(1, { message: 'Page size is required' }),
});
