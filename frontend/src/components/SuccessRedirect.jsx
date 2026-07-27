import React from 'react';
import { motion } from 'framer-motion';
import { Bus } from 'lucide-react';

const SuccessRedirect = ({
  title = 'Verification Successful!',
  subtitle = 'Your credentials have been securely verified. Preparing your travel dashboard...',
  message = 'Redirecting to your dashboard...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center select-none">
      
      {/* Animated Checkmark SVG (CSS animated stroke drawing) */}
      <div className="relative mb-6">
        <svg className="w-20 h-20" viewBox="0 0 52 52">
          <circle
            className="checkmark-circle stroke-emerald-500"
            cx="26"
            cy="26"
            r="25"
            strokeWidth="3.5"
            fill="none"
          />
          <path
            className="checkmark-check stroke-emerald-500"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Soft background pulse behind checkmark */}
        <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-xl scale-75 animate-pulse" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
        {title}
      </h3>

      {/* Message */}
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 max-w-xs leading-relaxed">
        {subtitle}
      </p>

      {/* Mini Bus Driving across a lane */}
      <div className="w-full max-w-[280px] h-10 relative overflow-hidden bg-slate-55/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl flex items-center px-4">
        {/* Dotted lane line */}
        <div className="absolute inset-x-0 h-0.5 border-t border-dashed border-slate-200 dark:border-slate-800 top-1/2 -translate-y-1/2 z-0" />
        
        {/* Driving Bus */}
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 260 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          className="absolute z-10 flex items-center"
        >
          <Bus className="w-5 h-5 text-indigo-500 dark:text-indigo-400 stroke-[2]" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping ml-0.5" />
        </motion.div>
      </div>

      {/* Redirect status message with bouncing dots */}
      <div className="flex items-center gap-1 mt-5 text-xs font-bold text-indigo-650 dark:text-indigo-400 tracking-wide">
        <span>{message}</span>
        <span className="flex gap-0.5">
          <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
      </div>

    </div>
  );
};

export default SuccessRedirect;
