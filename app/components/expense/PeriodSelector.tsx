"use client";

interface PeriodSelectorProps {
  selectedPeriod: "today" | "week" | "month" | "3months" | "all";
  onPeriodChange: (
    period: "today" | "week" | "month" | "3months" | "all"
  ) => void;
}

export default function PeriodSelector({
  selectedPeriod,
  onPeriodChange,
}: PeriodSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => onPeriodChange("today")}
        className={`px-4 py-2 rounded-lg transition-colors ${
          selectedPeriod === "today"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Today
      </button>
      <button
        onClick={() => onPeriodChange("week")}
        className={`px-4 py-2 rounded-lg transition-colors ${
          selectedPeriod === "week"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Last 7 Days
      </button>
      <button
        onClick={() => onPeriodChange("month")}
        className={`px-4 py-2 rounded-lg transition-colors ${
          selectedPeriod === "month"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Last 30 Days
      </button>
      <button
        onClick={() => onPeriodChange("3months")}
        className={`px-4 py-2 rounded-lg transition-colors ${
          selectedPeriod === "3months"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Last 3 Months
      </button>
      <button
        onClick={() => onPeriodChange("all")}
        className={`px-4 py-2 rounded-lg transition-colors ${
          selectedPeriod === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All Time
      </button>
    </div>
  );
}
