"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { blogFormSchema } from "@/lib/schemas/blog";

export async function createBlog(prevState: any, formData: FormData) {
    let rawData = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        published: formData.get("published") === "true",
        slug: formData.get("slug") as string,
       
    };

    const validatedResult = blogFormSchema.safeParse(rawData);

    if (!validatedResult.success) {
        return {
            errors: validatedResult.error.flatten().fieldErrors,
        };
    }

    console.log("Validated Data:", validatedResult.data); // Debugging log
     
    // validation for slug#
    const existingSlug = await prisma.blog.findFirst({
        where: { slug: rawData.slug },
    });

    if (existingSlug) {
        return {
            errors: { slug: ["Slug already exists"] },
        };
    }


    await prisma.blog.create({
        data: validatedResult.data,
    });

    redirect("/blogs");
}