import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const ACHIEVEMENTS_DATA = [
  { id: 1, title: 'First Journey', icon: '🌟', unlocked: true, desc: 'Complete your first bus trip.' },
  { id: 2, title: 'First Review', icon: '⭐', unlocked: true, desc: 'Write your first trip review.' },
  { id: 3, title: '10 Trips', icon: '🚌', unlocked: true, desc: 'Complete 10 successful trips.' },
  { id: 4, title: '1K Points', icon: '💯', unlocked: true, desc: 'Earn 1000 total reward points.' },
  { id: 5, title: 'Frequent Flyer', icon: '🏅', unlocked: false, desc: 'Complete 50 trips in one year.' },
  { id: 6, title: 'Social Butterfly', icon: '🦋', unlocked: false, desc: 'Refer 10 friends to BusGo.' }
];

const Achievements = () => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800">
      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Achievements</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {ACHIEVEMENTS_DATA.map((badge, idx) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-2xl flex flex-col items-center text-center relative border transition-all ${
              badge.unlocked 
                ? 'bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/20 dark:to-slate-900 border-indigo-100 dark:border-indigo-800/30 shadow-sm' 
                : 'bg-slate-50 dark:bg-slate-900 border-gray-200 dark:border-slate-800 opacity-60 grayscale'
            }`}
          >
            {!badge.unlocked && (
              <div className="absolute top-2 right-2 text-gray-400">
                <Lock className="w-3.5 h-3.5" />
              </div>
            )}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 ${
              badge.unlocked ? 'bg-white dark:bg-slate-800 shadow-sm' : 'bg-transparent'
            }`}>
              {badge.icon}
            </div>
            <h4 className="text-xs font-black text-gray-900 dark:text-white mb-1">{badge.title}</h4>
            <p className="text-[10px] font-medium text-gray-500 dark:text-slate-400 leading-tight">
              {badge.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
