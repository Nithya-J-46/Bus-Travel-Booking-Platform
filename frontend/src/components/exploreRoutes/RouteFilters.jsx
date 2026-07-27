import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

const RouteFilters = () => {
  return (
    <div className="w-full bg-white dark:bg-[#1e293b] border-y md:border md:rounded-2xl border-gray-200 dark:border-slate-800 p-4 shadow-sm my-8 flex flex-col md:flex-row items-center gap-4 overflow-x-auto custom-scrollbar">
      <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mr-4 shrink-0">
        <SlidersHorizontal className="w-5 h-5 text-indigo-500" />
        Quick Filters:
      </div>
      
      <div className="flex gap-3 shrink-0">
        <select className="bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none cursor-pointer">
          <option>Sort by: Price</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>

        <select className="bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none cursor-pointer">
          <option>Bus Type</option>
          <option>AC</option>
          <option>Non-AC</option>
          <option>Sleeper</option>
          <option>Seater</option>
        </select>

        <select className="bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none cursor-pointer">
          <option>Departure Time</option>
          <option>Before 6 AM</option>
          <option>6 AM to 12 PM</option>
          <option>12 PM to 6 PM</option>
          <option>After 6 PM</option>
        </select>
      </div>
    </div>
  );
};

export default RouteFilters;
