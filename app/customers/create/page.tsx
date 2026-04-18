"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createCustomer } from "@/app/actions/createCustomer";
import { customerFormSchema } from "@/lib/schemas/customer";
import { useActionState, useEffect, useTransition  } from "react";

type FormData = z.infer<typeof customerFormSchema>;
type State = {
    errors?: {
      name?: string[];
      email?: string[];
      phone?: string[];
      address?: string[];
      username?: string[];
      password?: string[];
    };
  };
export default function CreateCustomerPage() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
    resolver: zodResolver(customerFormSchema),
  });

  const initialState: State = { errors: {} };
  
  const [state, formAction] = useActionState(createCustomer, initialState);

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
        <h1 className="text-2xl font-semibold">Add Customer</h1>
        <p className="text-sm text-muted-foreground">Create a new customer.</p>
      </div>

      <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-lg border p-4 md:p-6"
        >
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input type="text" id="name" {...register("name")} className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input type="email" id="email" {...register("email")} className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground" />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <input type="tel" id="phone" {...register("phone")} className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground" />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <input type="text" id="address" {...register("address")} className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground" />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <input type="text" id="username" {...register("username")} className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground" />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input type="password" id="password" {...register("password")} className="w-full rounded-lg border p-2.5 text-sm text-muted-foreground" />
            {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white" disabled={isPending}>
          {isPending ? "Submitting..." : "Add Customer"}
        </button>

        <Link href="/customers" className="text-sm text-muted-foreground underline">
          Cancel
        </Link>
      </form>
    </div>
  );
}
