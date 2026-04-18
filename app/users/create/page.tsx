"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserSchema } from "@/lib/schemas/user";
import { useActionState, useEffect, useTransition  } from "react";
import { createUser } from "@/app/actions/createUser";

type FormData = z.infer<typeof UserSchema>;

type State = {
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
      confirmPassword?: string[];
    };
  };

export default function CreateUserPage() {


  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
      resolver: zodResolver(UserSchema),
  });

  const initialState: State = { errors: {} };

  const [state, formAction] = useActionState(createUser, initialState);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state?.errors) {
      Object.entries(state.errors).forEach(([field, messages]) => {
        if (messages?.[0]) {
          setError(field as keyof FormData, {
            type: "server",
            message: messages[0],
          });
        }
      });
    }
  }, [state, setError]);

 const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    console.log("Form Data:", data); // Debugging log
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      formAction(formData);
    });
  });

  return (
    <div className="max-w-2xl space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold">Add User</h1>
        <p className="text-sm text-muted-foreground">
          Create a new user.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-lg border p-4 md:p-6"
      >
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground"
          />
          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground"
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground"
          />
          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white"
        >
            {isPending ? "Creating..." : "Create User"}
        </button>

        <Link
          href="/users"
          className="text-sm text-muted-foreground underline"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}