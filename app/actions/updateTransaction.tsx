"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import * as z from "zod";

const formSchema = z.object({
    amount: z.number().positive("Amount must be a positive number"),
    type: z.enum(["income", "expense"], "Type must be either 'income' or 'expense'"),
    description: z.string().min(3, "Description must be at least 3 characters").max(255, "Description must be 255 characters or less"),
});

export async function updateTransaction(prevState: any, formData: FormData) {
    const id = formData.get("id") as string;
    
    const rawData = {
        amount: parseFloat(formData.get("amount") as string),
        type: formData.get("type") as string,
        description: formData.get("description") as string,
    }; 

    const parsed = formSchema.safeParse(rawData);

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            values: rawData,
        };
    }

    await prisma.transaction.update({
        where: { id: BigInt(id) },
        data: parsed.data,
    });

    redirect("/transactions");



    
}