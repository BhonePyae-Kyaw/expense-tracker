"use client";

interface ExpenseSummaryCardProps {
  totalExpenses: number;
  transactionCount: number;
  categoryCount: number;
}

export default function ExpenseSummaryCard({
  totalExpenses,
  transactionCount,
  categoryCount,
}: ExpenseSummaryCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">Total expenses</p>
          <p className="text-4xl font-bold text-gray-900">
            ฿{totalExpenses.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Across {transactionCount} transactions in {categoryCount} categories
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">For selected period</p>
        </div>
      </div>
    </div>
  );
}
