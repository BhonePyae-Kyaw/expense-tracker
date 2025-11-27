"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="text-sm text-red-600 hover:underline"
      >
        Sign out
      </button>
    );
  }
  return (
    <button
      onClick={() => signIn()}
      className="text-sm text-green-600 hover:underline"
    >
      Sign in
    </button>
  );
}

export default function NavMenu() {
  const { data: session } = useSession();
  return (
    <nav className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-900">
      <Link
        href="/"
        className="text-lg font-bold text-zinc-800 dark:text-zinc-200"
      >
        Expense Tracker {session?.user?.name}
      </Link>
      <AuthButton />
    </nav>
  );
}
