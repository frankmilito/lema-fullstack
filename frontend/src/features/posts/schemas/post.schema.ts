import { z } from 'zod';

export const postFormSchema = z.object({
    title: z
        .string()
        .min(1, 'Post title is required')
        .trim(),
    body: z
        .string()
        .min(1, 'Post content is required')
        .trim(),
});

export type PostFormData = z.infer<typeof postFormSchema>;


