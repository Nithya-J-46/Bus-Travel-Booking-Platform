import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessBanner = () => {
  // Generate dummy IDs
  const bookingId = `BG${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const pnrNumber = `PNR${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  const transactionId = `TXN${Date.now().toString().slice(-8)}`;
  
  const today = new Date();
  const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const bookingDate = today.toLocaleDateString('en-IN', dateOptions);

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 w-full animate-[fadeInUp_0.5s_ease-out]">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <CheckCircle className="w-10 h-10 text-emerald-500" strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 dark:text-slate-400 font-bold">Your ticket has been booked successfully.</p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Booking ID</p>
            <p className="text-base font-black text-gray-900 dark:text-white">{bookingId}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">PNR Number</p>
            <p className="text-base font-black text-gray-900 dark:text-white">{pnrNumber}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Transaction ID</p>
            <p className="text-base font-black text-gray-900 dark:text-white">{transactionId}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Booking Date</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{bookingDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessBanner;
