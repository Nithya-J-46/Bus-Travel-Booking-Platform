import React from 'react';
import { User, Calendar, Users, AlertCircle } from 'lucide-react';

const PassengerForm = ({ seatId, passenger, onChange, errors }) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-md border border-gray-200 dark:border-slate-800/80 relative flex flex-col gap-5 w-full mt-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20">
          <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Passenger Details</h3>
          <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">Seat {seatId}</span>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-2">
        
        {/* Full Name */}
        <div className="md:col-span-6 relative">
          <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={passenger.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="Enter full name"
              className={`w-full bg-gray-50 dark:bg-slate-900/50 border ${errors?.name ? 'border-rose-300 dark:border-rose-500/50 focus:ring-rose-500' : 'border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm font-semibold placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
            />
          </div>
          {errors?.name && (
            <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        {/* Age */}
        <div className="md:col-span-3 relative">
          <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
            Age <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              value={passenger.age || ''}
              onChange={(e) => onChange('age', e.target.value)}
              placeholder="Years"
              min="1"
              max="120"
              className={`w-full bg-gray-50 dark:bg-slate-900/50 border ${errors?.age ? 'border-rose-300 dark:border-rose-500/50 focus:ring-rose-500' : 'border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm font-semibold placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
            />
          </div>
          {errors?.age && (
            <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.age}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="md:col-span-3 relative">
          <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
            Gender <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              value={passenger.gender || ''}
              onChange={(e) => onChange('gender', e.target.value)}
              className={`w-full bg-gray-50 dark:bg-slate-900/50 border ${errors?.gender ? 'border-rose-300 dark:border-rose-500/50 focus:ring-rose-500' : 'border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all appearance-none`}
            >
              <option value="" disabled>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </div>
          </div>
          {errors?.gender && (
            <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.gender}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default PassengerForm;
