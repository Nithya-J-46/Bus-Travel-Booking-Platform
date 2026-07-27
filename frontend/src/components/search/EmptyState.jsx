import React from 'react';
import { SearchX } from 'lucide-react';
import Button from '../Button';

const EmptyState = ({ onModifySearch }) => {
  return (
    <div className="bg-white/50 dark:bg-[#111827]/50 backdrop-blur-sm rounded-3xl p-10 flex flex-col items-center justify-center text-center border border-slate-200/50 dark:border-slate-800/50 min-h-[400px]">
      
      <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 relative">
        <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-500/20 rounded-full animate-ping opacity-25"></div>
        <SearchX className="w-12 h-12 text-indigo-500 dark:text-indigo-400 relative z-10" />
      </div>

      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">No buses found</h3>
      <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mb-8">
        We couldn't find any buses matching your current filters. Try modifying your search criteria or changing the date.
      </p>

      <Button variant="primary" onClick={onModifySearch} className="px-8 py-3 shadow-lg shadow-indigo-500/20">
        Modify Search
      </Button>

    </div>
  );
};

export default EmptyState;
