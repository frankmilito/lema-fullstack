import { z } from "zod";

const PostTitleSchema = z
    .string()
    .min(1, "Post title is required")
    .min(3, "Post title must be at least 3 characters")
    .max(200, "Post title must be less than 200 characters")
    .trim();

const PostBodySchema = z
    .string()
    .min(1, "Post content is required")
    .min(5, "Post content must be at least 5 characters")
    .max(1000, "Post content must be less than 1000 characters")
    .trim();

const BasePostSchema = z.object({
    title: PostTitleSchema,
    body: PostBodySchema,
});

export const CreatePostSchema = BasePostSchema.extend({
    user_id: z.string(),
});

export const UpdatePostSchema = BasePostSchema;

export const RemovePostSchema = z.object({
    userId: z.string(),
    postId: z.string(),
});

export const GetPostSchema = z.object({
    userId: z.string(),
});
