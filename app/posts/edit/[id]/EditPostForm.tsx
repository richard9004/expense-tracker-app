"use client";
import Link from "next/link";
import { updatePost } from "@/app/actions/updatePost";
import { useActionState } from "react";
import { useEffect } from "react";


type Props = {
  post: {
    id: bigint;
    title: string;
    content: string | null;
    published: boolean;
  };

};

type State = {
  errors?: {
    title?: string[];
    content?: string[];
    published?: string[];
  };
  values?: {
    title?: string;
    content?: string;
    published?: boolean;
  };
};


export default function EditPostForm({ post }: Props) {
   const initialState: State = { errors: {} };
   
   
      const [state, formAction] = useActionState(updatePost, initialState);
   
      useEffect(() => {
      if (state?.errors) {
        console.log("Validation errors:", state.errors);
      }
    }, [state]);
  return (
    <form action={formAction} className="space-y-4 rounded-lg border p-4 md:p-6">
      <input type="hidden" name="id" value={post.id.toString()} />

      <div className="space-y-2">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          required
          defaultValue={post.title}
          className="h-10 w-full rounded-md border px-3"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={4}
          defaultValue={post.content ?? ""}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={post.published}
        />
        <label htmlFor="published">Published</label>
      </div>

      <button type="submit">Update</button>

      <Link href="/posts">Cancel</Link>
    </form>
  );
}