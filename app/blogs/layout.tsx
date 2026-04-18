import Link from "next/link";

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="flex items-center gap-4 border-b px-4 py-3 md:px-6">
        <Link href="/blogs" className="text-sm font-medium hover:underline">
          All Blogs
        </Link>
        <Link href="/blogs/create" className="text-sm font-medium hover:underline">
          Add New Blog
        </Link>
      </div>
      {children}
    </section>
);
}