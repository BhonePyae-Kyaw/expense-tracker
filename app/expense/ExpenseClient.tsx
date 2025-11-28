"use client";

import { useState, useMemo } from "react";
import { Category } from "@/app/generated/prisma/client";
import { ExpenseWithCategory } from "@/app/types";
import { deleteExpense as deleteExpenseApi } from "@/app/utils/expenseHelper";
import ExpenseCreateModal from "@/app/components/expense/ExpenseCreateModal";
import ExpenseTable from "@/app/components/expense/ExpenseTable";
import ExpenseHeader from "@/app/components/expense/ExpenseHeader";
import PeriodSelector from "@/app/components/expense/PeriodSelector";
import DateRangeSelector from "@/app/components/expense/DateRangeSelector";
import ExpenseSummaryCard from "@/app/components/expense/ExpenseSummaryCard";
import ExpenseCategoryChart from "@/app/components/expense/ExpenseCategoryChart";
import ExpenseFilters from "@/app/components/expense/ExpenseFilters";

interface ExpenseClientProps {
  initialExpenses: ExpenseWithCategory[];
  categories: Category[];
  userId: string;
}

export default function ExpenseClient({
  initialExpenses,
  categories,
  userId,
}: ExpenseClientProps) {
  const [expenses, setExpenses] =
    useState<ExpenseWithCategory[]>(initialExpenses);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "today" | "week" | "month"
  >("today");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewExpenseModal, setShowNewExpenseModal] = useState(false);

  const filteredExpenses = useMemo(() => {
    let filtered = expenses;

    // Filter by period
    const now = new Date();
    if (selectedPeriod === "today") {
      const today = new Date(now.setHours(0, 0, 0, 0));
      filtered = filtered.filter((e) => new Date(e.date) >= today);
    } else if (selectedPeriod === "week") {
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      filtered = filtered.filter((e) => new Date(e.date) >= weekAgo);
    } else if (selectedPeriod === "month") {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      filtered = filtered.filter((e) => new Date(e.date) >= monthAgo);
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(
        (e) => new Date(e.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter((e) => new Date(e.date) <= new Date(endDate));
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((e) => e.categoryId === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (e) =>
          e.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [
    expenses,
    selectedPeriod,
    startDate,
    endDate,
    selectedCategory,
    searchTerm,
  ]);

  // Calculate total and category breakdown
  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  const expensesByCategory = useMemo(() => {
    const categoryMap = new Map<string, { name: string; amount: number }>();
    filteredExpenses.forEach((expense) => {
      const catName = expense.category.name;
      const current = categoryMap.get(catName);
      if (current) {
        current.amount += expense.amount;
      } else {
        categoryMap.set(catName, { name: catName, amount: expense.amount });
      }
    });
    return Array.from(categoryMap.values()).sort((a, b) => b.amount - a.amount);
  }, [filteredExpenses]);

  const handleDeleteExpense = async (id: string) => {
    const success = await deleteExpenseApi(id);
    if (success) {
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="p-6">
      <ExpenseHeader onNewExpense={() => setShowNewExpenseModal(true)} />

      {/* Period selector and date range */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <PeriodSelector
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      <ExpenseSummaryCard
        totalExpenses={totalExpenses}
        transactionCount={filteredExpenses.length}
        categoryCount={expensesByCategory.length}
      />

      <ExpenseCategoryChart
        expensesByCategory={expensesByCategory}
        totalExpenses={totalExpenses}
      />

      {/* Expenses list */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expenses</h3>
        <p className="text-sm text-gray-600 mb-4">
          View and filter all expenses in the selected period.
        </p>

        <ExpenseFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <ExpenseTable
          expenses={filteredExpenses}
          onDelete={handleDeleteExpense}
        />
      </div>

      {/* New Expense Modal */}
      {showNewExpenseModal && (
        <ExpenseCreateModal
          categories={categories}
          userId={userId}
          onClose={() => setShowNewExpenseModal(false)}
          onSuccess={(newExpense) => {
            setExpenses([newExpense, ...expenses]);
            setShowNewExpenseModal(false);
          }}
        />
      )}
    </div>
  );
}
