import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  iconColor = "text-indigo-500"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-2xl animate-pulse-slow scale-150"></div>
        <div className={`relative w-24 h-24 mb-6 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl flex items-center justify-center ${iconColor}`}>
          <Icon className="w-12 h-12" />
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed"
      >
        {description}
      </motion.p>

      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button variant="primary" onClick={onAction} className="px-8 py-3 shadow-lg shadow-indigo-500/25">
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default EmptyState;
