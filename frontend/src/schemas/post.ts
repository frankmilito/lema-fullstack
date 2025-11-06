import { z } from 'zod';

export const postFormSchema = z.object({
    title: z
        .string()
        .min(1, 'Post title is required')
        .min(3, 'Post title must be at least 3 characters')
        .max(200, 'Post title must be less than 200 characters')
        .trim(),
    body: z
        .string()
        .min(1, 'Post content is required')
        .min(5, 'Post content must be at least 5 characters')
        .max(1000, 'Post content must be less than 1000 characters')
        .trim(),
});

export type PostFormData = z.infer<typeof postFormSchema>;

