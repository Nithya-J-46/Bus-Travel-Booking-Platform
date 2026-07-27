import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Shield, Briefcase, GraduationCap, Map } from 'lucide-react';

const TIPS = [
  { icon: Shield, title: 'Women Safety Tips', desc: 'Secure booking & seating.', color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/30' },
  { icon: Map, title: 'Best Night Travel', desc: 'How to sleep comfortably on a bus.', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
  { icon: Briefcase, title: 'Packing Checklist', desc: 'Essentials for long journeys.', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  { icon: GraduationCap, title: 'Student Discounts', desc: 'How to avail max offers.', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/30' }
];

const TravelTipsWidget = () => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-6 h-6 text-amber-500" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Travel Tips</h2>
      </div>

      <div className="space-y-3">
        {TIPS.map((tip, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-900 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-lg shrink-0 flex items-center justify-center ${tip.bg} ${tip.color} group-hover:scale-110 transition-transform`}>
              <tip.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">{tip.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{tip.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TravelTipsWidget;
