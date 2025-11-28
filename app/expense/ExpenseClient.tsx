"use client";

import { useState, useMemo } from "react";
import { Category } from "@/app/generated/prisma/client";
import { ExpenseWithCategory } from "@/app/types";
import { deleteExpense as deleteExpenseApi } from "@/app/utils/expenseHelper";
import ExpenseCreateModal from "@/app/components/expense/ExpenseCreateModal";
import ExpenseEditModal from "@/app/components/expense/ExpenseEditModal";
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
    "today" | "week" | "month" | "3months" | "all"
  >("3months");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewExpenseModal, setShowNewExpenseModal] = useState(false);
  const [editingExpense, setEditingExpense] =
    useState<ExpenseWithCategory | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredExpenses = useMemo(() => {
    let filtered = expenses;

    // Filter by period
    if (selectedPeriod !== "all") {
      const now = new Date();
      let cutoffDate: Date;

      if (selectedPeriod === "today") {
        cutoffDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          0,
          0,
          0,
          0
        );
      } else if (selectedPeriod === "week") {
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (selectedPeriod === "month") {
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      } else if (selectedPeriod === "3months") {
        cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      } else {
        cutoffDate = new Date(0); // All time
      }

      filtered = filtered.filter((e) => new Date(e.date) >= cutoffDate);
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

  // Pagination
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const paginatedExpenses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredExpenses.slice(startIndex, endIndex);
  }, [filteredExpenses, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedPeriod, startDate, endDate, selectedCategory, searchTerm]);

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

  const handleEditExpense = (id: string) => {
    const expense = expenses.find((e) => e.id === id);
    if (expense) {
      setEditingExpense(expense);
    }
  };

  const handleUpdateExpense = (updatedExpense: ExpenseWithCategory) => {
    setExpenses(
      expenses.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
    );
    setEditingExpense(null);
  };

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    if (date) {
      setSelectedPeriod("all");
    }
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    if (date) {
      setSelectedPeriod("all");
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
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
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
          expenses={paginatedExpenses}
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 px-4">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredExpenses.length)} of{" "}
              {filteredExpenses.length} expenses
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first page, last page, current page, and pages around current
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    // Add ellipsis if there's a gap
                    const prevPage = array[index - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;

                    return (
                      <div key={page} className="flex items-center">
                        {showEllipsis && (
                          <span className="px-2 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
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

      {/* Edit Expense Modal */}
      {editingExpense && (
        <ExpenseEditModal
          expense={editingExpense}
          categories={categories}
          onClose={() => setEditingExpense(null)}
          onSuccess={handleUpdateExpense}
        />
      )}
    </div>
  );
}
