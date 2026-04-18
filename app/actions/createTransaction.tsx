"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import * as z from "zod";


const formSchema = z.object({
  amount: z.number().positive("Amount must be a positive number"),
  type: z.enum(["income", "expense"], "Type must be either 'income' or 'expense'"),
  description: z.string().min(5, "Description must be at least 5 characters").max(255, "Description must be 255 characters or less"),
});

export async function createTransaction(prevState: any, formData: FormData) {
    const rawData = {
    amount: parseFloat(formData.get("amount") as string),
    type: formData.get("type") as string,
    description: formData.get("description") as string,
  };

  const validatedResult = formSchema.safeParse(rawData);

  if (!validatedResult.success) {
    return {
      errors: validatedResult.error.flatten().fieldErrors,
      values: rawData,
    };
  }

  await prisma.transaction.create({
    data: validatedResult.data,
  });

  redirect("/transactions");

}