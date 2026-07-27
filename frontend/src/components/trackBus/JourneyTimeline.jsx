import React from 'react';
import { MapPin, Navigation, Map, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  { id: 1, label: 'Boarding Point', sub: 'Bangalore - 09:30 PM', icon: MapPin },
  { id: 2, label: 'Departed', sub: 'On Time - 09:45 PM', icon: Navigation },
  { id: 3, label: 'Current Position', sub: 'Moving...', icon: Navigation },
  { id: 4, label: 'Next Stop', sub: 'Anantapur - 01:15 AM', icon: Map },
  { id: 5, label: 'Destination', sub: 'Hyderabad - 06:30 AM', icon: Flag }
];

const JourneyTimeline = ({ currentStepId }) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
        Journey Progress
      </h3>

      <div className="relative pl-3">
        {STEPS.map((step, index) => {
          const isCompleted = step.id < currentStepId;
          const isCurrent = step.id === currentStepId;
          const isUpcoming = step.id > currentStepId;
          const isLast = index === STEPS.length - 1;

          const Icon = step.icon;

          return (
            <div key={step.id} className="relative pb-8 last:pb-0">
              {/* Vertical connecting line */}
              {!isLast && (
                <div className={`absolute left-3.5 top-8 bottom-0 w-0.5 rounded-full ${isCompleted ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-slate-700'}`} />
              )}
              
              <div className="flex gap-4">
                {/* Node icon */}
                <div className="relative z-10 shrink-0">
                  <div 
                    className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                      isCompleted ? 'bg-indigo-500 border-indigo-500 text-white' :
                      isCurrent ? 'bg-white dark:bg-slate-900 border-indigo-500 text-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' :
                      'bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-400 dark:text-slate-500'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-indigo-500"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </div>
                
                {/* Text Content */}
                <div className={`pt-1 ${isUpcoming ? 'opacity-60' : 'opacity-100'}`}>
                  <h4 className={`text-sm font-black ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'}`}>
                    {step.label}
                  </h4>
                  <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-1">
                    {step.sub}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyTimeline;
