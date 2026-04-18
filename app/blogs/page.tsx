
import Link from "next/link";
import prisma from "@/lib/prisma";
import { DeleteButton } from "./DeleteButton";

export default async function BlogsPage() {
    const blogs = await prisma.blog.findMany();
    return (
        <>
        <div className="max-w-2xl space-y-6 p-4 md:p-6">
            <h1 className="text-2xl font-semibold">Blogs</h1>
            <p className="text-sm text-muted-foreground">List of blogs will be displayed here.</p>
        </div>

       
        <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                    <tr>
                        <th className="px-4 py-3 font-medium">ID</th>   
                        <th className="px-4 py-3 font-medium">Title</th>
                        <th className="px-4 py-3 font-medium">Content</th>
                        <th className="px-4 py-3 font-medium">Published</th>
                         <th className="px-4 py-3 font-medium">Slug</th>  
                        <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-muted/50">
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td className="px-4 py-3">{blog.id}</td>
                            <td className="px-4 py-3">{blog.title}</td>
                            <td className="px-4 py-3">{blog.content}</td>
                            <td className="px-4 py-3">{blog.published ? "Yes" : "No"}</td>
                            <td className="px-4 py-3">{blog.slug}</td>
                            <td className="px-4 py-3">
                                <Link href={`/blogs/${blog.id}`} className="text-sm font-medium hover:underline">
                                    View
                                </Link>
                                <DeleteButton id={Number(blog.id)} />

                            </td>
                        </tr>
                    ))}
                </tbody>
                          
            </table>
        </div>      

</>

    );
}