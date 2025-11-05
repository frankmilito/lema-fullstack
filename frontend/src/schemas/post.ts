import { z } from 'zod';

export const postFormSchema = z.object({
    title: z
        .string()
        .min(1, 'Post title is required')
        .min(3, 'Post title must be at least 3 characters')
        .max(100, 'Post title must be less than 100 characters')
        .trim(),
    body: z
        .string()
        .min(1, 'Post content is required')
        .min(10, 'Post content must be at least 10 characters')
        .max(300, 'Post content must be less than 300 characters')
        .trim(),
});

export type PostFormData = z.infer<typeof postFormSchema>;

