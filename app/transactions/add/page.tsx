"use client";
import Link from "next/link";
import { useActionState } from "react";
import { createTransaction } from "@/app/actions/createTransaction";
import { useEffect } from "react";


export default function AddTransactionPage() {
   
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

   const initialState: State = { errors: {} };
   
   
  const [state, formAction] = useActionState(createTransaction, initialState);

  useEffect(() => {
    if (state.errors) {
      console.log("Validation errors:", state.errors);
    }
  }, [state.errors]);

  return (
    <div className="max-w-2xl space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold">Add Transaction</h1>
        <p className="text-sm text-muted-foreground">Create a new transaction.</p>
      </div>

      <form action={formAction} className="space-y-4 rounded-lg border p-4 md:p-6">
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount
          </label>         
          <input  type="number" id="amount" name="amount" className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground" defaultValue={state.values?.amount}/>
          {state.errors?.amount && (
            <p className="text-red-500 text-sm">{state.errors.amount[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Type
          </label>           
          <select id="type" name="type" className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground" defaultValue={state.values?.type}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {state.errors?.type && (
            <p className="text-red-500 text-sm">{state.errors.type[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>          
          <input type="text" id="description" name="description" className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground" defaultValue={state.values?.description}/>
          {state.errors?.description && (
            <p className="text-red-500 text-sm">{state.errors.description[0]}</p>
          )}
        </div>

       

        <button type="submit" className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white">
          Add Transaction
        </button>

        <Link href="/transactions" className="text-sm text-muted-foreground underline">
          Cancel
        </Link>
      </form>
    </div>
  );
}
