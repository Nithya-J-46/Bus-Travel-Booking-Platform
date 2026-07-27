import React from 'react';
import { motion } from 'framer-motion';
import TravelHero from './TravelHero';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col lg:flex-row bg-theme-bg animate-bg-shift relative overflow-hidden transition-colors duration-500">
      
      {/* Background glowing aurora blobs */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/6 blur-[100px] animate-blob-1 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/6 blur-[100px] animate-blob-2 pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[250px] h-[250px] rounded-full bg-emerald-500/6 dark:bg-emerald-500/4 blur-[80px] animate-blob-3 pointer-events-none" />

      {/* Background floating particle system */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute w-3 h-3 rounded-full bg-indigo-500/10 dark:bg-indigo-400/5 animate-particle-1" style={{ left: '10%' }} />
        <div className="absolute w-4 h-4 rounded-full bg-cyan-500/8 dark:bg-cyan-400/4 animate-particle-2" style={{ left: '35%' }} />
        <div className="absolute w-2 h-2 rounded-full bg-emerald-500/10 dark:bg-emerald-400/5 animate-particle-3" style={{ left: '60%' }} />
        <div className="absolute w-3 h-3 rounded-full bg-indigo-500/8 dark:bg-indigo-400/4 animate-particle-4" style={{ left: '85%' }} />
      </div>

      {/* Left side: Form Column */}
      <div className="relative w-full lg:w-[42%] flex flex-col justify-center items-center px-4 py-12 md:px-8 z-10 overflow-hidden min-h-[calc(100vh-4rem)]">
        
        {/* Form entrance animation card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.98 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          {children}
        </motion.div>
      </div>

      {/* Right side: Illustration Column */}
      <div className="hidden lg:block lg:w-[58%] h-[calc(100vh-4rem)] sticky top-16 border-l border-slate-100/50 dark:border-slate-900/50">
        <TravelHero />
      </div>
    </div>
  );
};

export default AuthLayout;
