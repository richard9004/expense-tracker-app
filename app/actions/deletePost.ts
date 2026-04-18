"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePost(id: number) {
  await prisma.post.delete({
    where: { id },
  });
  revalidatePath("/posts");
}
