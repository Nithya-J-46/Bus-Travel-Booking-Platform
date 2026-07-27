import React from 'react';
import { Star, Clock } from 'lucide-react';

const SavedRoutes = () => {
  // Mock saved routes
  const routes = [
    { id: 1, name: 'Home to Office', from: 'Bangalore', to: 'Hyderabad' },
    { id: 2, name: 'Weekend Trip', from: 'Chennai', to: 'Coimbatore' },
  ];

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500" />
        Saved & Recent
      </h3>
      
      <div className="space-y-3">
        {routes.map(route => (
          <div key={route.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">{route.name}</h4>
              <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <span>{route.from}</span>
                <span>→</span>
                <span>{route.to}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-indigo-500 transition-colors">
              <Clock className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRoutes;
