import React from 'react';
import { Bus } from 'lucide-react';

const AuthCard = ({ children, title, subtitle, footer }) => {
  return (
    /* Double-shadow wrapper with animated border glow for SaaS feel */
    <div className="w-full max-w-md p-[1.5px] rounded-[2rem] bg-gradient-to-tr from-indigo-500/30 via-cyan-400/20 to-emerald-500/30 dark:from-indigo-500/40 dark:via-cyan-400/25 dark:to-emerald-500/40 shadow-[0_20px_50px_rgba(99,102,241,0.2)] dark:shadow-[0_0_60px_rgba(99,102,241,0.2)] hover:shadow-[0_0_80px_rgba(99,102,241,0.3)] animate-border-glow border border-transparent transition-all duration-500">
      
      <div className="w-full rounded-[1.9rem] overflow-hidden bg-theme-card backdrop-blur-xl border border-theme-border shadow-2xl transition-all duration-300">
        
        {/* Glow decoration bar */}
        <div className="h-[3px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-500 opacity-90 shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
        
        <div className="p-8 sm:p-10 flex flex-col">
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-7">
            <div className="w-12 h-12 bg-theme-bg rounded-2xl flex items-center justify-center text-indigo-650 dark:text-indigo-400 mb-4 shadow-[0_8px_20px_rgba(99,102,241,0.15)] border border-theme-border transition-transform duration-300 hover:scale-110 hover:rotate-3">
              <Bus className="w-6 h-6 stroke-[2.2]" />
            </div>
            {title && (
              <h2 className="text-2xl font-extrabold text-theme-text tracking-tight text-center font-sans">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-theme-text-sec mt-2.5 text-center leading-relaxed font-medium max-w-[280px]">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Content */}
          <div className="space-y-5">{children}</div>

          {/* Footer links */}
          {footer && (
            <div className="mt-8 pt-6 border-t border-theme-border text-center text-xs text-theme-text-sec font-bold tracking-wide">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
