import Link from "next/link";

export default function TransactionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="flex items-center gap-4 border-b px-4 py-3 md:px-6">
        <Link href="/transactions" className="text-sm font-medium hover:underline">
          All Transactions
        </Link>
        <Link href="/transactions/add" className="text-sm font-medium hover:underline">
          Add
        </Link>
      </div>
      {children}
    </section>
  );
}
