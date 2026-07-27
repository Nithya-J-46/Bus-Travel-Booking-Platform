import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const PaymentSecurity = () => {
  return (
    <div className="flex items-center justify-center gap-6 py-4 mt-2">
      <div className="flex flex-col items-center gap-1">
        <ShieldCheck className="w-5 h-5 text-emerald-500" />
        <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide">100% Secure</span>
      </div>
      <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-700" />
      <div className="flex flex-col items-center gap-1">
        <Lock className="w-5 h-5 text-indigo-500" />
        <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide">256-bit SSL</span>
      </div>
      <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-700" />
      <div className="flex flex-col items-center gap-1">
        <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
        </svg>
        <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wide">Trusted</span>
      </div>
    </div>
  );
};

export default PaymentSecurity;
