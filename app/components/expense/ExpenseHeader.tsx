"use client";

interface ExpenseHeaderProps {
  onNewExpense: () => void;
}

export default function ExpenseHeader({ onNewExpense }: ExpenseHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Expense Tracker</h2>
        <p className="text-sm text-gray-600">
          Record and analyze your spending by time period.
        </p>
      </div>
      <button
        onClick={onNewExpense}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        New Expense
      </button>
    </div>
  );
}
