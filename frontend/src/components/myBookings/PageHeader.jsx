import React from 'react';
import { CalendarDays } from 'lucide-react';

const PageHeader = () => {
  return (
    <div className="bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="animate-[fadeInUp_0.5s_ease-out]">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white flex items-center gap-3 mb-2">
              <CalendarDays className="w-8 h-8 md:w-10 md:h-10 text-indigo-500" />
              My Bookings
            </h1>
            <p className="text-sm md:text-base font-bold text-gray-500 dark:text-slate-400">
              Manage all your bus journeys in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
