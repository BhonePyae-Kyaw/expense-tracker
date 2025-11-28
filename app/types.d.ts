import NextAuth from "next-auth";
import { Expense, Category } from "@/app/generated/prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Expense types
export type ExpenseWithCategory = Expense & {
  category: Category;
};
