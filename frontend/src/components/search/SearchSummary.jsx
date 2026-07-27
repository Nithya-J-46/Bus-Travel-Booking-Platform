import React from 'react';
import { ArrowRight, Calendar, Users, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchSummary = ({ searchData }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    // Navigate back to home, we could pass state if needed
    navigate('/');
  };

  if (!searchData) return null;

  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-md border border-gray-200 dark:border-slate-800/50 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-slate-400 font-semibold uppercase tracking-wider">From</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{searchData.fromCity || 'Bangalore'}</span>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-500 dark:text-indigo-400 mx-1" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-slate-400 font-semibold uppercase tracking-wider">To</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{searchData.toCity || 'Goa'}</span>
          </div>
        </div>

        <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-slate-800"></div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg text-indigo-500 dark:text-indigo-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Date</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {searchData.travelDate ? new Date(searchData.travelDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select Date'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg text-cyan-500 dark:text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Passengers</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{searchData.passengers || 1} Seat(s)</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleEdit}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-transparent shadow-sm rounded-xl font-semibold text-sm transition-all active:scale-95 hover:border-indigo-300 dark:hover:border-transparent"
      >
        <Edit2 className="w-4 h-4" />
        Modify Search
      </button>
    </div>
  );
};

export default SearchSummary;
