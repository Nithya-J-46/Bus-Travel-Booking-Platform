import React from 'react';
import { Search } from 'lucide-react';
import { useHelp } from '../../context/HelpContext';

const HelpHero = () => {
  const { searchQuery, setSearchQuery } = useHelp();

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-[#0b0f19] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-8 text-center">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Need Help?</h1>
        <p className="text-lg font-medium text-indigo-200/80 mb-8">We're here 24/7 to assist you with bookings, refunds, and more.</p>
        
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-indigo-300" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for articles, tracking, refunds..."
            className="block w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-indigo-200/50 shadow-xl font-medium text-lg transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default HelpHero;
