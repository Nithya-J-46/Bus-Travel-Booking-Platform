import React from 'react';
import { Search, SlidersHorizontal, Flame, Clock, ThumbsUp, MessageSquare } from 'lucide-react';

const FILTERS = [
  { id: 'latest', label: 'Latest', icon: Clock },
  { id: 'trending', label: 'Trending', icon: Flame },
  { id: 'liked', label: 'Most Liked', icon: ThumbsUp },
  { id: 'commented', label: 'Most Commented', icon: MessageSquare }
];

const CommunityFilters = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
      
      {/* Search */}
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search posts, routes, users..."
          className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
        {FILTERS.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeFilter === filter.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <filter.icon className={`w-4 h-4 ${activeFilter === filter.id ? 'text-white' : 'text-gray-400'}`} />
            {filter.label}
          </button>
        ))}
      </div>

    </div>
  );
};

export default CommunityFilters;
