"use client";

import { Category } from "@/app/generated/prisma/client";

interface ExpenseFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function ExpenseFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}: ExpenseFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
      >
        <option value="all">All categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.icon} {cat.name}
          </option>
        ))}
      </select>

      <div className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search description"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
    </div>
  );
}
