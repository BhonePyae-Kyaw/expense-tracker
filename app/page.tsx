import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/expense");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="mb-6 text-4xl font-bold text-red-900 dark:text-zinc-100 sm:text-5xl">
            Welcome to Next.js!
          </h1>
          <p className="mb-6 text-zinc-700 dark:text-zinc-300 sm:text-lg">
            Get started by editing{" "}
            <code className="rounded bg-zinc-100 px-2 py-1 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              app/page.tsx
            </code>
          </p>
        </div>
      </main>
    </div>
  );
}
