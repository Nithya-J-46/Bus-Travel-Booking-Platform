import React from 'react';
import { TrendingUp, Map, Star, Route, Navigation, Compass } from 'lucide-react';

const StatisticsSection = () => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-indigo-500" />
        Travel Statistics
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        
        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-2">
            <Route className="w-5 h-5 text-indigo-500" />
          </div>
          <span className="text-2xl font-black text-gray-900 dark:text-white">12</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Total Trips</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-2">
            <Navigation className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="text-2xl font-black text-gray-900 dark:text-white">4,250<span className="text-sm">km</span></span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Distance Travelled</span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 flex flex-col items-center justify-center text-center col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-2">
            <Star className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-2xl font-black text-gray-900 dark:text-white">4.8</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Avg Rating Given</span>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-slate-700">
          <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Map className="w-4 h-4 text-indigo-500" /> Most Travelled Route
          </h4>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <span className="block text-lg font-black text-gray-900 dark:text-white">BLR</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase">Bangalore</span>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 relative">
              <div className="w-full h-px bg-gray-300 dark:bg-slate-700 absolute"></div>
              <div className="bg-white dark:bg-[#111827] px-2 relative z-10 text-xs font-bold text-indigo-500">6 Trips</div>
            </div>
            <div className="text-center">
              <span className="block text-lg font-black text-gray-900 dark:text-white">HYD</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase">Hyderabad</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-gray-200 dark:border-slate-700">
          <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-500" /> Favorite Operator
          </h4>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl flex items-center justify-center font-black text-indigo-600 text-lg shrink-0">
              I
            </div>
            <div>
              <p className="text-base font-black text-gray-900 dark:text-white">IntrCity SmartBus</p>
              <p className="text-[11px] font-bold text-gray-500">You've booked with them 5 times.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default StatisticsSection;
