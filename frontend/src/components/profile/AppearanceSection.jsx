import React, { useState, useEffect } from 'react';
import { Palette, Moon, Sun, Monitor } from 'lucide-react';
import toast from 'react-hot-toast';

const AppearanceSection = () => {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    toast.success('Appearance updated successfully.');
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Palette className="w-6 h-6 text-indigo-500" />
        Appearance Settings
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4">Theme Preference</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <button 
              onClick={() => handleThemeChange('light')}
              className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${theme === 'light' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-600' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-500 hover:border-indigo-300'}`}
            >
              <Sun className={`w-8 h-8 ${theme === 'light' ? 'text-indigo-500' : 'text-gray-400'}`} />
              <span className="text-sm font-bold">Light Mode</span>
            </button>

            <button 
              onClick={() => handleThemeChange('dark')}
              className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-600' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-500 hover:border-indigo-300'}`}
            >
              <Moon className={`w-8 h-8 ${theme === 'dark' ? 'text-indigo-500' : 'text-gray-400'}`} />
              <span className="text-sm font-bold">Dark Mode</span>
            </button>

            <button 
              onClick={() => handleThemeChange('system')}
              className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${theme === 'system' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-600' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-500 hover:border-indigo-300'}`}
            >
              <Monitor className={`w-8 h-8 ${theme === 'system' ? 'text-indigo-500' : 'text-gray-400'}`} />
              <span className="text-sm font-bold">System Default</span>
            </button>

          </div>
        </div>

        {/* Accent Color Demo */}
        <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
          <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4">Accent Color (Demo)</h3>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-indigo-500 ring-4 ring-indigo-500/30 transition-transform hover:scale-110"></button>
            <button className="w-10 h-10 rounded-full bg-emerald-500 hover:scale-110 transition-transform cursor-not-allowed opacity-50"></button>
            <button className="w-10 h-10 rounded-full bg-rose-500 hover:scale-110 transition-transform cursor-not-allowed opacity-50"></button>
            <button className="w-10 h-10 rounded-full bg-cyan-500 hover:scale-110 transition-transform cursor-not-allowed opacity-50"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSection;
