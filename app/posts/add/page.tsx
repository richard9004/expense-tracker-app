"use client";
import Link from "next/link";
import { useActionState } from "react";
import { createPost } from "@/app/actions/createPost";
import { useEffect } from "react";

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


export default function AddPostPage() {
  // 初始化状态，包含错误对象
  const initialState: State = { errors: {} };


  // 使用 useActionState 钩子管理表单状态和操作
  // createPost 是处理表单提交的函数，initialState 是初始状态
  const [state, formAction] = useActionState(createPost, initialState);

  // 使用 useEffect 监听验证错误并在控制台输出
   useEffect(() => {
    if (state.errors) {
      console.log("Validation errors:", state.errors);
    }
  }, [state.errors]);

  return (
    <div className="max-w-2xl space-y-6 p-4 md:p-6">
      {/* 页面标题区域 */}
      <div>
        <h1 className="text-2xl font-semibold">Add Post</h1>
        <p className="text-sm text-muted-foreground">Create a new post.</p>
      </div>

      {/* 表单区域，包含文章标题、内容和发布状态 */}
      <form action={formAction} className="space-y-4 rounded-lg border p-4 md:p-6">
        {/* 标题输入区域 */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="Post title"
            defaultValue={state.values?.title}
            className="h-10 w-full rounded-md border px-3"
          />
          {/* 标题验证错误提示 */}
          {state.errors?.title && (
            <p className="text-red-500 text-sm">{state.errors.title[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            placeholder="Post content"
            defaultValue={state.values?.content}
            className="w-full rounded-md border px-3 py-2"
          />
          {state.errors?.content && (
            <p className="text-red-500 text-sm">{state.errors.content[0]}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={state.values?.published}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Published
          </label>
          {state.errors?.published && (
            <p className="text-red-500 text-sm">{state.errors.published[0]}</p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Save
          </button>
          <Link href="/posts" className="text-sm underline underline-offset-4">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
