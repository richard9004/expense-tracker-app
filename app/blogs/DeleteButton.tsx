"use client";

import { deleteBlog } from "@/app/actions/deleteBlog";
import { useTransition } from "react";

type DeleteButtonProps = {
  id: number;
};

export function DeleteButton({ id }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            startTransition(() => {
                deleteBlog(id);
            });
        }

    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="ml-3 text-red-500 underline underline-offset-4 disabled:opacity-50"
        >
            {isPending ? "Deleting..." : "Delete"}
        </button>
    );
}