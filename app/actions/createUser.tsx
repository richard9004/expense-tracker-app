"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UserSchema } from "@/lib/schemas/user";

export async function createUser(prevState: any, formData: FormData) {
    const rawData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    const validatedResult = UserSchema.safeParse(rawData);

    if (!validatedResult.success) {
        return {
            errors: validatedResult.error.flatten().fieldErrors,
        };
    }

    const existingEmail = await prisma.user.findFirst({
        where: { email: rawData.email },
    });

    if (existingEmail) {
        return {
            errors: { email: ["Email already exists"] },
        };
    }

    //Remove confirmPassword before saving to database
    const { confirmPassword, ...userData } = validatedResult.data;

    // save it to the database
    await prisma.user.create({
        data: userData,
    });

    redirect("/users");
}
