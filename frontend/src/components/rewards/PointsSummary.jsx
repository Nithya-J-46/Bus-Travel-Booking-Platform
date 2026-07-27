import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Route, Star, MapPin } from 'lucide-react';
import { useRewards } from '../../context/RewardsContext';

const PointsSummary = () => {
  const { stats } = useRewards();

  const metrics = [
    { label: 'Points Expiring Soon', value: stats.pointsExpiring, icon: Clock, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
    { label: 'Trips Completed', value: stats.tripsCompleted, icon: Route, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
    { label: 'Total Distance (km)', value: stats.distanceTravelled.toLocaleString(), icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { label: 'Average Rating', value: stats.averageRating, icon: Star, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-[#111827] rounded-3xl p-5 shadow-xl border border-gray-100 dark:border-slate-800"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${metric.bg} mb-4`}>
              <Icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
              {metric.value}
            </h4>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400">
              {metric.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PointsSummary;
