import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";


type PageProps = {
  params: {
    id: string;
  };
};

export default async function BlogViewPage({ params }: PageProps) {
    const { id } = await params;
  const blog = await prisma.blog.findUnique({
    where: {
      id: BigInt(id),
    },
  });

  if (!blog) {
    redirect("/blogs");
  }
  return (
    <div>
        <h1 className="text-2xl font-semibold">Blog Details</h1>
        <p>{blog.title}</p>
        <p>{blog.content}</p>
        <p>{blog.published ? "Published" : "Draft"}</p>
        <p>Slug: {blog.slug}</p>
        <Link href="/blogs" className="text-blue-500 hover:underline">
          Back to all blogs
        </Link>

    </div>
  );
}