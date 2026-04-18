// components/Header.tsx (new component)
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-background border-b">
      <p className="font-semibold text-lg">Expense Tracker Admin</p>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">John Doe</span>
          <img
            src="/avatar.png"
            className="h-8 w-8 rounded-full object-cover"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
}