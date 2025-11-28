"use client";

import { ExpenseWithCategory } from "@/app/types";
import { useState } from "react";

interface ExpenseTableProps {
  expenses: ExpenseWithCategory[];
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

type SortField = "date" | "category" | null;
type SortOrder = "asc" | "desc";

export default function ExpenseTable({
  expenses,
  onDelete,
  onEdit,
}: ExpenseTableProps) {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (!sortField) return 0;

    let comparison = 0;
    if (sortField === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortField === "category") {
      comparison = a.category.name.localeCompare(b.category.name);
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }
    return sortOrder === "asc" ? (
      <svg
        className="w-4 h-4 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 text-indigo-600"
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
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-y border-gray-200">
          <tr>
            <th
              onClick={() => handleSort("date")}
              className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                Date
                <SortIcon field="date" />
              </div>
            </th>
            <th
              onClick={() => handleSort("category")}
              className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                Category
                <SortIcon field="category" />
              </div>
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedExpenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {expense.category.icon} {expense.category.name}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {expense.description || "-"}
              </td>
              <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                ฿{expense.amount.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-sm text-right">
                <div className="flex items-center justify-end gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(expense.id)}
                      className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedExpenses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No expenses found for the selected period.
        </div>
      )}
    </div>
  );
}
