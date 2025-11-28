"use client";

import { useState } from "react";
import { Category } from "@/app/generated/prisma/client";
import { ExpenseWithCategory } from "@/app/types";

interface ExpenseEditModalProps {
  expense: ExpenseWithCategory;
  categories: Category[];
  onClose: () => void;
  onSuccess: (expense: ExpenseWithCategory) => void;
}

export default function ExpenseEditModal({
  expense,
  categories,
  onClose,
  onSuccess,
}: ExpenseEditModalProps) {
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState(expense.categoryId);
  const [description, setDescription] = useState(expense.description || "");
  const [date, setDate] = useState(
    new Date(expense.date).toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/expenses/${expense.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          categoryId: category,
          description,
          date: new Date(date),
        }),
      });

      if (response.ok) {
        const updatedExpense = await response.json();
        onSuccess(updatedExpense);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Expense</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="What did you spend on?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
