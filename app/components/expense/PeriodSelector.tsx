"use client";

interface PeriodSelectorProps {
  selectedPeriod: "today" | "week" | "month";
  onPeriodChange: (period: "today" | "week" | "month") => void;
}

export default function PeriodSelector({
  selectedPeriod,
  onPeriodChange,
}: PeriodSelectorProps) {
  return (
    <div className="flex gap-2">
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
        This Week
      </button>
      <button
        onClick={() => onPeriodChange("month")}
        className={`px-4 py-2 rounded-lg transition-colors ${
          selectedPeriod === "month"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        This Month
      </button>
    </div>
  );
}
