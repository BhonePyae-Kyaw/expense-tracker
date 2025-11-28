"use client";

interface CategoryBreakdown {
  name: string;
  amount: number;
}

interface ExpenseCategoryChartProps {
  expensesByCategory: CategoryBreakdown[];
  totalExpenses: number;
}

export default function ExpenseCategoryChart({
  expensesByCategory,
  totalExpenses,
}: ExpenseCategoryChartProps) {
  const chartColors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];

  // Check if there's no data
  if (expensesByCategory.length === 0 || totalExpenses === 0) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Expenses by category
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Visual breakdown of how your money goes.
        </p>
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-12">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="mt-4 text-sm font-medium text-gray-900">
              Not enough data to display the chart yet
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Add some expenses to see your spending breakdown
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Expenses by category
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Visual breakdown of how your money goes.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie chart */}
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {expensesByCategory.map((item, index) => {
                const percentage = (item.amount / totalExpenses) * 100;
                const prevPercentages = expensesByCategory
                  .slice(0, index)
                  .reduce(
                    (sum, i) => sum + (i.amount / totalExpenses) * 100,
                    0
                  );
                return (
                  <circle
                    key={item.name}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={chartColors[index % chartColors.length]}
                    strokeWidth="20"
                    strokeDasharray={`${percentage * 2.51} ${
                      251.2 - percentage * 2.51
                    }`}
                    strokeDashoffset={-prevPercentages * 2.51}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Category list */}
        <div className="space-y-3">
          {expensesByCategory.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded"
                  style={{
                    backgroundColor: chartColors[index % chartColors.length],
                  }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                ฿{item.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
