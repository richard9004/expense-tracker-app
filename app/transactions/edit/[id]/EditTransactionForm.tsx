"use client";
import Link from "next/link";
import { useActionState } from "react";
import { updateTransaction } from "@/app/actions/updateTransaction";
import { useEffect } from "react";

type Props = {
  transaction: {
    id: bigint;
    amount: number | null;
    type: string | null;
    description: string | null;
  };
};

type State = {
  errors?: {
    amount?: string[];
    type?: string[];
    description?: string[];
  };
  values?: {
    amount?: number;
    type?: string;
    description?: string;
  };
};

export default function EditTransactionForm({ transaction }: Props) {
    
    const initialState: State = { errors: {} };

    const [state, formAction] = useActionState(updateTransaction, initialState);
    useEffect(() => {
      if (state?.errors) {
        console.log("Validation errors:", state.errors);
      }
    }, [state]);

    return (
    <form action={formAction} className="space-y-4 rounded-lg border p-4 md:p-6">
      <input type="hidden" name="id" value={transaction.id.toString()} />

      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium">
          Amount
        </label>        
        <input type="number" id="amount" name="amount" defaultValue={transaction.amount ?? ""} className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground" />
      </div>

      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium">
          Type
        </label>
        <select id="type" name="type" defaultValue={transaction.type ?? ""} className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground">
          <option value="income">Income</option>
          <option value="expense">Expense</option>        
        </select>        
      </div>    

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <input type="text" id="description" name="description" defaultValue={transaction.description ?? ""} className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground" />
      </div>

        <div className="flex items-center gap-3 pt-2">  
            <button type="submit" className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
                Update Transaction
            </button>
            <Link href="/transactions" className="inline-flex h-9 items-center rounded-md bg-muted px-4 text-sm font-medium text-muted-foreground">
                Cancel
            </Link>
        </div>
    </form>
  );
}

   




