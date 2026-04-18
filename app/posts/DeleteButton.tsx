"use client";

import { deletePost } from "@/app/actions/deletePost";
import { useTransition } from "react";

type DeleteButtonProps = {
  id: number;
};

export function DeleteButton({ id }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      startTransition(() => {
        deletePost(id);
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
