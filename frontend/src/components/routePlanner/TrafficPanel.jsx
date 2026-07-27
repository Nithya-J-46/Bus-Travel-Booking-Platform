import React from 'react';
import { AlertTriangle, Activity } from 'lucide-react';

const TrafficPanel = ({ trafficLevel }) => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          Traffic Analysis
        </h3>
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </div>

      {/* Speed gauge visualization */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
          <span>0 km/h</span>
          <span>Avg Speed</span>
          <span>100 km/h</span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${
              trafficLevel === 'Low' ? 'w-4/5 bg-emerald-500' :
              trafficLevel === 'Moderate' ? 'w-3/5 bg-yellow-500' :
              trafficLevel === 'Heavy' ? 'w-2/5 bg-orange-500' : 'w-1/5 bg-red-500'
            }`}
          />
        </div>
        <div className="text-center mt-2 text-xl font-black text-gray-900 dark:text-white">
          {trafficLevel === 'Low' ? '65' : trafficLevel === 'Moderate' ? '45' : trafficLevel === 'Heavy' ? '25' : '10'} <span className="text-sm font-medium text-gray-400">km/h</span>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800">
          <div className="flex gap-3">
            <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
              trafficLevel === 'Severe' || trafficLevel === 'Heavy' ? 'text-rose-500' : 'text-emerald-500'
            }`} />
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                {trafficLevel === 'Severe' ? 'Major delays ahead' : trafficLevel === 'Heavy' ? 'Slow moving traffic' : 'Clear roads ahead'}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {trafficLevel === 'Severe' ? 'An accident reported 15km ahead on the main highway.' : 
                 trafficLevel === 'Heavy' ? 'Expected congestion near city outskirts.' : 
                 'No significant delays detected on your route.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficPanel;
