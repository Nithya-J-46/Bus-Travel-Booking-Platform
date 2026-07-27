import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

const SortBar = ({ currentSort, onSortChange, onOpenMobileFilters, resultCount }) => {
  const sortOptions = [
    { id: 'price_low', label: 'Lowest Price' },
    { id: 'best_value', label: 'Best Value' },
    { id: 'rating_high', label: 'Highest Rating' },
    { id: 'most_popular', label: 'Most Popular' },
    { id: 'fastest', label: 'Fastest' },
    { id: 'departure_early', label: 'Earliest' },
    { id: 'departure_late', label: 'Latest' }
  ];

  return (
    <div className="bg-white dark:bg-[#111827]/90 backdrop-blur-md rounded-2xl p-3 shadow-sm border border-gray-200 dark:border-slate-800/80 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors z-20 sticky top-20 lg:top-auto">
      
      <div className="flex items-center justify-between w-full sm:w-auto px-2 sm:px-0">
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          {resultCount} Buses Found
        </span>
        
        {/* Mobile Filter Toggle */}
        <button 
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-semibold active:scale-95 transition-transform"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar px-1 sm:px-0">
        <span className="text-xs font-semibold text-gray-500 dark:text-slate-500 uppercase tracking-wider mr-2 hidden md:block">
          Sort by:
        </span>
        
        {sortOptions.map(option => (
          <button
            key={option.id}
            onClick={() => onSortChange(option.id)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300
              ${currentSort === option.id 
                ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold shadow-md scale-105 shimmer-container shimmer-delayed-effect border-0' 
                : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white border-0 bg-transparent'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>

    </div>
  );
};

export default SortBar;
