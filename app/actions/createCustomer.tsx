"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { customerFormSchema } from "@/lib/schemas/customer";

export async function createCustomer(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  const validatedResult = customerFormSchema.safeParse(rawData);

  if (!validatedResult.success) {
    return {
      errors: validatedResult.error.flatten().fieldErrors,
    };
  }

  const existingEmail = await prisma.customer.findFirst({
    where: { email: rawData.email },
  });

  if (existingEmail) {
    return {
      errors: { email: ["Email already exists"] },
    };
  }

  await prisma.customer.create({
    data: validatedResult.data,
  });

  redirect("/customers");
}
