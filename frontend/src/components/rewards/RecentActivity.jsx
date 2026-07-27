import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useRewards } from '../../context/RewardsContext';

// Simple time formatter
const formatTime = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const RecentActivity = () => {
  const { activity } = useRewards();

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 h-full">
      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Recent Activity</h3>
      
      <div className="space-y-6">
        {activity.slice(0, 6).map((item, index) => (
          <div key={item.id} className="flex gap-4 relative">
            {/* Timeline line */}
            {index !== Math.min(activity.length - 1, 5) && (
              <div className="absolute top-8 left-4 bottom-[-24px] w-0.5 bg-gray-100 dark:bg-slate-800" />
            )}
            
            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white dark:border-[#111827] ${
              item.type === 'earn' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' 
              : 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400'
            }`}>
              {item.type === 'earn' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            </div>
            
            <div className="flex-1 pt-1 pb-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</h4>
                <span className={`text-sm font-black ${item.type === 'earn' ? 'text-emerald-500' : 'text-gray-900 dark:text-white'}`}>
                  {item.type === 'earn' ? '+' : ''}{item.points}
                </span>
              </div>
              <p className="text-xs font-medium text-gray-400 mt-1">{formatTime(item.date)}</p>
            </div>
          </div>
        ))}
        
        {activity.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm font-medium text-gray-500">No recent activity.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
