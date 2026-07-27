import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, ArrowRightLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RECENT_SEARCHES = [
  { id: 1, from: 'Delhi', to: 'Manali', date: 'Oct 15, 2026', type: 'AC Sleeper' },
  { id: 2, from: 'Bangalore', to: 'Chennai', date: 'Oct 18, 2026', type: 'AC Seater' },
  { id: 3, from: 'Mumbai', to: 'Pune', date: 'Oct 20, 2026', type: 'Non-AC Sleeper' },
];

const RecentlySearchedRoutes = ({ onRouteSelect }) => {
  const navigate = useNavigate();

  return (
    <section className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-indigo-500" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recently Searched</h2>
      </div>
      
      <div className="flex flex-nowrap overflow-x-auto pb-4 gap-4 no-scrollbar">
        {RECENT_SEARCHES.map((search, idx) => (
          <motion.div
            key={search.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => {
              const data = {
                fromCity: search.from,
                toCity: search.to,
                travelDate: new Date().toISOString().split('T')[0], // Simulate upcoming
                passengers: 1,
                busType: search.type
              };
              if (onRouteSelect) {
                onRouteSelect(data);
              } else {
                navigate('/search-results', { state: data });
              }
            }}
            className="flex-shrink-0 w-72 bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all group"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3 w-full">
                <span className="font-bold text-slate-800 dark:text-slate-200">{search.from}</span>
                <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                <span className="font-bold text-slate-800 dark:text-slate-200">{search.to}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
              <span>{search.date}</span>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md font-medium">{search.type}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentlySearchedRoutes;
