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
