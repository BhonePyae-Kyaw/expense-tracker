"use client";

import { ExpenseWithCategory } from "@/app/types";

interface ExpenseTableProps {
  expenses: ExpenseWithCategory[];
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function ExpenseTable({
  expenses,
  onDelete,
  onEdit,
}: ExpenseTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-y border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Category
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
          {expenses.map((expense) => (
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

      {expenses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No expenses found for the selected period.
        </div>
      )}
    </div>
  );
}
