import Link from "next/link";

import prisma from "@/lib/prisma";

export default async function TransactionsPage() {
  const transactions = await prisma.transaction.findMany();
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Transactions</h1>
          <p className="text-sm text-muted-foreground">Manage your transactions</p>
        </div>
        <Link
          href="/transactions/add"
          className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Add Transaction
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id.toString()} className="border-t">
                <td className="px-4 py-3 font-mono text-xs">{txn.id.toString()}</td>
                <td className="px-4 py-3">{txn.createdAt.toLocaleDateString()}</td>
                <td className="px-4 py-3">{txn.type}</td>
                <td className="px-4 py-3">{txn.description}</td>
                <td className="px-4 py-3">${txn.amount?.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/transactions/edit/${txn.id}`}
                    className="text-primary underline underline-offset-4"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
