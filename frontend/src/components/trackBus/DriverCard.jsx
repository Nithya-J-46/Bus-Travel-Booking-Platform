import React from 'react';
import { Star, Phone, ShieldAlert, Award } from 'lucide-react';
import Button from '../Button';

const DriverCard = () => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
        Driver Information
      </h3>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 relative">
          <img loading="lazy" 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Driver"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-emerald-500 w-3 h-3 rounded-full border-2 border-white dark:border-[#111827]"></div>
        </div>
        
        <div>
          <h4 className="text-lg font-black text-gray-900 dark:text-white">Ramesh Kumar</h4>
          <p className="text-xs font-bold text-gray-500 flex items-center gap-1 mt-1">
            <Award className="w-3 h-3 text-indigo-500" /> 8 Years Experience
          </p>
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-sm font-black text-gray-900 dark:text-white">4.9</span>
            <span className="text-[10px] font-bold text-gray-400 ml-1">(2.1k trips)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="outline" className="w-full py-3 rounded-xl border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
          <span className="flex flex-row items-center justify-center gap-[10px] w-full">
            <Phone className="w-[20px] h-[20px] shrink-0" />
            <span className="font-semibold whitespace-nowrap">Call Driver</span>
          </span>
        </Button>
        <button className="w-full flex justify-center items-center gap-2 py-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-sm transition-colors hover:bg-rose-100 dark:hover:bg-rose-500/20">
          <ShieldAlert className="w-4 h-4" />
          Emergency Contact Support
        </button>
      </div>
    </div>
  );
};

export default DriverCard;
