'use client';

import { FilterType } from '@/types/todo';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
}

export const TodoFilters = ({ currentFilter, onFilterChange, activeCount }: TodoFiltersProps) => {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="space-y-4 mb-4">
      <div className="flex justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-4 py-1 rounded-full capitalize text-sm transition-all ${
              currentFilter === f.value
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500 text-center">{activeCount} items remaining</p>
    </div>
  );
};
