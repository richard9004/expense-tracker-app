import *  as z from "zod";

export const blogFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be 100 characters or less"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    published: z.boolean(),
    slug: z.string().min(3, "Slug must be at least 3 characters").max(100, "Slug must be 100 characters or less").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-friendly (lowercase letters, numbers, and hyphens only)"),
    
});