import Link from "next/link";

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="flex items-center gap-4 border-b px-4 py-3 md:px-6">
        <Link href="/posts" className="text-sm font-medium hover:underline">
          All Posts
        </Link>
        <Link href="/posts/add" className="text-sm font-medium hover:underline">
          Add
        </Link>
      </div>
      {children}
    </section>
  );
}
