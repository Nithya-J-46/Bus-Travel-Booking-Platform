import React from 'react';
import { CheckCircle2, Clock, Wallet } from 'lucide-react';

const BookingStatus = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 animate-[fadeInUp_0.5s_ease-out_0.1s_both]">
      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-full">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">Confirmed</span>
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-full">
        <Wallet className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 tracking-wide uppercase">Paid</span>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-full">
        <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 tracking-wide uppercase">Upcoming Journey</span>
      </div>
    </div>
  );
};

export default BookingStatus;
