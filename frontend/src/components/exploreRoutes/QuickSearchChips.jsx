import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CITIES = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Hyderabad', 'Goa', 'Kolkata'];

const QuickSearchChips = ({ onRouteSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center gap-3 mt-4">
      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
        <Search className="w-3 h-3" /> Quick Search:
      </span>
      {CITIES.map((city, idx) => (
        <motion.button
          key={city}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + idx * 0.05 }}
          onClick={() => {
            const data = {
              fromCity: '',
              toCity: city,
              travelDate: new Date().toISOString().split('T')[0],
              passengers: 1,
              busType: 'AC Sleeper'
            };
            if (onRouteSelect) {
              onRouteSelect(data);
            } else {
              navigate('/search-results', { state: data });
            }
          }}
          className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a2235] text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm cursor-pointer"
        >
          {city}
        </motion.button>
      ))}
    </div>
  );
};

export default QuickSearchChips;
