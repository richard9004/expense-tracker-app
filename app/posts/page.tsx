import Link from "next/link";

import prisma from "@/lib/prisma";
import { DeleteButton } from "./DeleteButton";

export default async function PostsPage() {
  const posts = await prisma.post.findMany();
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Posts</h1>
          <p className="text-sm text-muted-foreground">Manage your posts</p>
        </div>
        <Link
          href="/posts/add"
          className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Add Post
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Content</th>
              <th className="px-4 py-3 font-medium">Published</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id.toString()} className="border-t">
                <td className="px-4 py-3 font-mono text-xs">{post.id.toString()}</td>
                <td className="px-4 py-3">{post.createdAt.toLocaleDateString()}</td>
                <td className="px-4 py-3">{post.title}</td>
                <td className="px-4 py-3">{post.content}</td>
                <td className="px-4 py-3">{post.published ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/posts/edit/${post.id}`}
                    className="text-primary underline underline-offset-4"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={Number(post.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
