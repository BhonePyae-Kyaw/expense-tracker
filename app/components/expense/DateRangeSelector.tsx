"use client";

interface DateRangeSelectorProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export default function DateRangeSelector({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col md:flex-row gap-2 align-center items-start md:items-center">
        <span className="text-sm text-gray-600">Start</span>

        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
        <span className="text-sm text-gray-600">End</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
    </div>
  );
}
