import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ExpenseClient from "./ExpenseClient";
import { fetchExpenses, fetchCategories } from "../utils/expenseHelper.server";

export default async function ExpensePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const [expenses, categories] = await Promise.all([
    fetchExpenses(),
    fetchCategories(),
  ]);

  return (
    <ExpenseClient
      initialExpenses={expenses}
      categories={categories}
      userId={session.user.id}
    />
  );
}
