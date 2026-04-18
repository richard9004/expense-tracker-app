"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useActionState, useEffect, useTransition  } from "react";
import { createBlog } from "@/app/actions/createBlog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogFormSchema } from "@/lib/schemas/blog";

type FormData = z.infer<typeof blogFormSchema>;

type State = {
    errors?: {
      title?: string[];
      content?: string[];
      published?: string[];
      slug?: string[];
    };
  };

export default function CreateBlogPage() {
    
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
        resolver: zodResolver(blogFormSchema),
    });

    const initialState: State = { errors: {} };

    const [state, formAction] = useActionState(createBlog, initialState);

    const [isPending, startTransition] = useTransition();

      useEffect(() => {
          if (state?.errors) {
            Object.entries(state.errors).forEach(([field, messages]) => {
              if (messages?.[0]) {
                setError(field as keyof FormData, {
                  type: "server",
                  message: messages[0],
                });
              }
            });
          }
        }, [state, setError]);

    const onSubmit = handleSubmit(async (data) => {
        
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, typeof value === "boolean" ? value.toString() : value);
        });

        console.log("Form Data:", data); // Debugging log


        startTransition(() => {
         formAction(formData);
        });
    })
    
    return (
        // Lets construct a simple form for creating a new blog post
         <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-lg border p-4 md:p-6"
        >
            <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    {...register("title")}
                    className="h-10 w-full rounded-md border px-3"
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    {...register("content")}
                    className="h-20 w-full rounded-md border px-3"
                />
                {errors.content && (
                    <p className="text-red-500 text-sm">{errors.content.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="published">Published</label>
                <input
                    id="published"
                    type="checkbox"
                    {...register("published")}
                    className="h-5 w-5"
                />
                {errors.published && (
                    <p className="text-red-500 text-sm">{errors.published.message}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="slug">Slug</label>
                <input
                    id="slug"
                    
                    {...register("slug")}
                    className="h-10 w-full rounded-md border px-3"
                />
                {errors.slug && (
                    <p className="text-red-500 text-sm">{errors.slug.message}</p>
                )}
            </div>
           
           <button type="submit" className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white" disabled={isPending}>
            {isPending ? "Submitting..." : "Add Blog"}
            </button>
        </form>
        
    );
}