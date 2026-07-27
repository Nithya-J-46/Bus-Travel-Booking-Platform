import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Bus, XCircle, RotateCcw, MapPin, FileText, Gift, Settings } from 'lucide-react';
import { useHelp } from '../../context/HelpContext';

const CATEGORIES = [
  { id: 'booking', title: 'Booking Issues', icon: Bus, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
  { id: 'payment', title: 'Payment Issues', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { id: 'cancellation', title: 'Cancellation', icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
  { id: 'refund', title: 'Refund Status', icon: RotateCcw, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  { id: 'tracking', title: 'Bus Tracking', icon: MapPin, color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-500/10' },
  { id: 'ticket', title: 'E-Ticket', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
  { id: 'rewards', title: 'Offers & Rewards', icon: Gift, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-500/10' },
  { id: 'profile', title: 'Account Settings', icon: Settings, color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-500/10' },
];

const QuickCategories = () => {
  const { setSearchQuery } = useHelp();

  return (
    <div className="mb-10">
      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Quick Help</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSearchQuery(cat.id)}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#111827] rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.bg} mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${cat.color}`} />
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-slate-300 text-center">
                {cat.title}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickCategories;
