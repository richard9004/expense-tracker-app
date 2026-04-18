import Link from "next/link";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import EditTransactionForm from "./EditTransactionForm";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EditTransactionPage({ params }: PageProps) {
  const { id } = await params;
  console.log("Editing transaction with ID:", id);
  
  const transaction = await prisma.transaction.findUnique({
    where: { id: BigInt(id) },
  });

  if (!transaction) {
    return (
      <div className="max-w-2xl space-y-6 p-4 md:p-6">
        <p>Transaction not found.</p>
        <Link href="/transactions" className="text-sm underline underline-offset-4">
          Back to Transactions
        </Link>
      </div>
    );
  }

  return (
    <EditTransactionForm transaction={transaction} />
  )
}




