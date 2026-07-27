import React from 'react';
import { Clock, Map, Navigation, Wind } from 'lucide-react';
import { motion } from 'framer-motion';

const LiveStatusCard = ({ speed, eta, distanceRemaining, lastUpdated }) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <span className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">
            Bus is On Time
          </span>
        </div>
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          Updated: {lastUpdated}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 mb-1">
            <Navigation className="w-4 h-4 text-indigo-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Current Speed</span>
          </div>
          <motion.div 
            key={speed}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-black text-gray-900 dark:text-white"
          >
            {speed} <span className="text-sm font-bold text-gray-500">km/h</span>
          </motion.div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 mb-1">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Estimated Arrival</span>
          </div>
          <span className="text-2xl font-black text-gray-900 dark:text-white">
            {eta}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 mb-1">
            <Map className="w-4 h-4 text-emerald-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Remaining</span>
          </div>
          <motion.div 
            key={distanceRemaining}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-2xl font-black text-gray-900 dark:text-white"
          >
            {distanceRemaining} <span className="text-sm font-bold text-gray-500">km</span>
          </motion.div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 mb-1">
            <Wind className="w-4 h-4 text-cyan-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Weather on route</span>
          </div>
          <span className="text-xl font-black text-gray-900 dark:text-white mt-1">
            28°C <span className="text-sm font-bold text-gray-500">Clear</span>
          </span>
        </div>

      </div>
    </div>
  );
};

export default LiveStatusCard;
