import { cookies } from "next/headers";

// Server-side only functions that use next/headers
export async function fetchExpenses() {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/expenses`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
}

export async function fetchCategories() {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/categories`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}
