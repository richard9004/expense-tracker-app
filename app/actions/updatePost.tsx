"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import * as z from "zod";   

const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be 100 characters or less"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    published: z.boolean(),
});

export async function updatePost(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;
    const rawData = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        published: formData.get("published") === "on",
    };

    const parsed = formSchema.safeParse(rawData);

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            values: rawData,
        };
    }

    await prisma.post.update({
        where: { id: BigInt(id) },
        data: parsed.data,
    });

    redirect("/posts");
}