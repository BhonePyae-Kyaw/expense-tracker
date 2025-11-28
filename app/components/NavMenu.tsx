"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

function AuthButton() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("Session data in NavMenu:", session);

  if (session) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1 rounded-lg dark:hover:bg-zinc-800 transition-colors"
        >
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-8 h-8 rounded-full"
              width={24}
              height={24}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {session.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <svg
            className={`w-4 h-4 text-zinc-600 dark:text-zinc-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-1 z-50">
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {session.user?.name || "User"}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {session.user?.email}
              </p>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign out
            </button>
          </div>
        )}
      </div>
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
  return (
    <nav className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-900">
      <Link
        href="/"
        className="text-lg font-bold text-zinc-800 dark:text-zinc-200"
      >
        Expense Tracker
      </Link>
      <AuthButton />
    </nav>
  );
}
