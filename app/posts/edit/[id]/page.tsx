import Link from "next/link";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import EditPostForm from "./EditPostForm";

type PageProps = {
  params: {
    id: string;
  };
};



export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  console.log("Editing post with ID:", id);

  const post = await prisma.post.findUnique({
    where: { id: BigInt(id) },
  });

  if (!post) {
    return (
      <div className="max-w-2xl space-y-6 p-4 md:p-6">
        <p>Post not found.</p>
        <Link href="/posts" className="text-sm underline underline-offset-4">
          Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <EditPostForm post={post} />
  );
}