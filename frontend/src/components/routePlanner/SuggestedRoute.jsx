import React, { useState } from 'react';
import { Car, Footprints, Train } from 'lucide-react';
import Button from '../Button';

const SuggestedRoute = () => {
  const [activeTab, setActiveTab] = useState('driving');
  
  const options = {
    driving: { time: '12 mins', distance: '2.4 km', cost: '₹50-80 (Cab)', icon: Car },
    walking: { time: '30 mins', distance: '2.1 km', cost: 'Free', icon: Footprints },
    transit: { time: '20 mins', distance: '2.4 km', cost: '₹15 (Bus)', icon: Train }
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800">
      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Suggested Route</h3>
      
      <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1 mb-6">
        {Object.entries(options).map(([key, data]) => {
          const Icon = data.icon;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                isActive 
                  ? 'bg-white dark:bg-[#111827] text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline capitalize">{key}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900 mb-6">
        <div>
          <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Time</p>
          <p className="text-xl font-black text-gray-900 dark:text-white">{options[activeTab].time}</p>
        </div>
        <div className="w-px h-10 bg-gray-200 dark:bg-slate-700"></div>
        <div>
          <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Distance</p>
          <p className="text-xl font-black text-gray-900 dark:text-white">{options[activeTab].distance}</p>
        </div>
        <div className="w-px h-10 bg-gray-200 dark:bg-slate-700"></div>
        <div>
          <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Est. Cost</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{options[activeTab].cost}</p>
        </div>
      </div>

      <Button variant="primary" className="w-full justify-center shadow-lg shadow-indigo-500/20 py-3">
        Navigate via Google Maps
      </Button>
    </div>
  );
};

export default SuggestedRoute;
