import z from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(20, "Title is too long"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(200, "Content is too long"),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

export const updatePostSchema = createPostSchema.pick({
  title: true,
  content: true,
});

export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
