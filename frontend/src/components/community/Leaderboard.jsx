import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';

const TOP_USERS = [
  { id: 1, name: 'Rahul Sharma', avatar: 'https://i.pravatar.cc/150?u=1', points: '12.4K', role: 'Travel Expert', verified: true },
  { id: 2, name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?u=2', points: '9.8K', role: 'Top Contributor', verified: true },
  { id: 3, name: 'Amit Kumar', avatar: 'https://i.pravatar.cc/150?u=3', points: '7.2K', role: 'Helpful Member', verified: false },
  { id: 4, name: 'Neha Singh', avatar: 'https://i.pravatar.cc/150?u=4', points: '5.5K', role: 'Explorer', verified: false },
  { id: 5, name: 'Vikram Das', avatar: 'https://i.pravatar.cc/150?u=5', points: '4.1K', role: 'Explorer', verified: false },
];

const Leaderboard = () => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-6 h-6 text-amber-500" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Contributors</h2>
      </div>

      <div className="space-y-4">
        {TOP_USERS.map((user, idx) => (
          <motion.div 
            key={user.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center justify-between group p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img loading="lazy" src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-500 transition-all" />
                {idx < 3 && (
                  <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm border border-white dark:border-slate-800 ${idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-slate-400' : 'bg-amber-700'}`}>
                    {idx + 1}
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                  {user.name}
                  {user.verified && <CheckCircle className="w-3 h-3 text-blue-500" />}
                </h4>
                <p className="text-xs font-medium text-indigo-500 dark:text-indigo-400">{user.role}</p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-sm font-bold text-gray-900 dark:text-white">{user.points}</span>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">pts</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
        View Full Leaderboard
      </button>
    </div>
  );
};

export default Leaderboard;
