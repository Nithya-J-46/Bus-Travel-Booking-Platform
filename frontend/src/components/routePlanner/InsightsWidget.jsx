import React from 'react';
import { CloudRain, Map as MapIcon, Coffee, Fuel, HeartPulse, Bed } from 'lucide-react';

const InsightsWidget = () => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
      
      {/* Weather Insights */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CloudRain className="w-5 h-5 text-sky-500" />
          Route Weather
        </h3>
        <div className="flex items-center justify-between p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border border-sky-100 dark:border-sky-800/30">
          <div>
            <div className="text-3xl font-black text-gray-900 dark:text-white">24°C</div>
            <div className="text-sm font-semibold text-sky-600 dark:text-sky-400 mt-1">Light Rain Expected</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">Humidity: 78%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Wind: 14 km/h</div>
          </div>
        </div>
      </div>

      {/* Nearby Places */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MapIcon className="w-5 h-5 text-indigo-500" />
          Nearby Amenities
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-indigo-300 transition-colors group">
            <Fuel className="w-6 h-6 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Petrol Pumps</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-indigo-300 transition-colors group">
            <Coffee className="w-6 h-6 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Restaurants</span>
          </button>

          <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-indigo-300 transition-colors group">
            <HeartPulse className="w-6 h-6 text-rose-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Hospitals</span>
          </button>

          <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-indigo-300 transition-colors group">
            <Bed className="w-6 h-6 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Hotels</span>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default InsightsWidget;
