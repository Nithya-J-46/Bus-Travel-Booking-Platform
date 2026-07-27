import React from 'react';
import { useRewards } from '../../context/RewardsContext';

const TravelMilestones = () => {
  const { stats } = useRewards();

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800">
      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Travel Milestones</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total Savings</p>
            <p className="text-lg font-black text-emerald-500">₹{stats.moneySaved.toLocaleString()}</p>
          </div>
          <div className="text-3xl">🤑</div>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Favorite Route</p>
            <p className="text-sm font-black text-gray-900 dark:text-white">{stats.favoriteRoute}</p>
          </div>
          <div className="text-2xl">🗺️</div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Favorite Operator</p>
            <p className="text-sm font-black text-gray-900 dark:text-white">{stats.favoriteOperator}</p>
          </div>
          <div className="text-2xl">🚌</div>
        </div>
      </div>
    </div>
  );
};

export default TravelMilestones;
