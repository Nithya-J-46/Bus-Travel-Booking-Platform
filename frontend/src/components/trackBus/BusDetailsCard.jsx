import React from 'react';
import { Bus, Armchair, Wifi, Wind, Info } from 'lucide-react';

const BusDetailsCard = ({ bookingData }) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-6 pb-4 border-b border-gray-100 dark:border-slate-800 flex items-center gap-2">
        <Info className="w-4 h-4 text-indigo-500" /> Bus Details
      </h3>

      <div className="grid grid-cols-2 gap-4">
        
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 h-full flex flex-col justify-center">
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 mb-1">
            <Bus className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Bus Number</span>
          </div>
          <p className="text-sm font-black text-gray-900 dark:text-white">KA 01 HG 1234</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 h-full flex flex-col justify-center">
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 mb-1">
            <Armchair className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Seat No</span>
          </div>
          <p className="text-sm font-black text-indigo-600 dark:text-indigo-400">
            {bookingData?.selected_seats || 'A1, A2'}
          </p>
        </div>

      </div>

      <div className="mt-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Amenities Provided</p>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white dark:bg-[#111827] rounded-md border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 shadow-sm">
            <Wind className="w-3 h-3" /> AC
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white dark:bg-[#111827] rounded-md border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 shadow-sm">
            <Wifi className="w-3 h-3" /> WiFi
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white dark:bg-[#111827] rounded-md border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 shadow-sm">
            <span className="w-3 h-3 block text-center leading-3">🔌</span> Charging
          </span>
        </div>
      </div>
    </div>
  );
};

export default BusDetailsCard;
