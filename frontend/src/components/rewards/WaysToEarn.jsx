import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useRewards } from '../../context/RewardsContext';

const WaysToEarn = () => {
  const { earnDemoPoints } = useRewards();

  const earnWays = [
    { title: 'Daily Login Bonus', points: 10, icon: '📅' },
    { title: 'Complete Profile', points: 50, icon: '👤' },
    { title: 'Write a Review', points: 25, icon: '⭐' },
    { title: 'Refer a Friend', points: 100, icon: '🤝' },
  ];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800">
      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Ways to Earn</h3>
      <div className="space-y-3">
        {earnWays.map((way, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{way.icon}</span>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{way.title}</h4>
                <p className="text-xs font-bold text-emerald-500">+{way.points} pts</p>
              </div>
            </div>
            <button 
              onClick={() => earnDemoPoints(way.points, way.title)}
              className="opacity-0 group-hover:opacity-100 p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all"
              title={`Simulate earning ${way.points} points`}
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaysToEarn;
