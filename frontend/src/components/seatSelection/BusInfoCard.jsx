import React from 'react';
import { MapPin, Calendar, Users, Star, Clock } from 'lucide-react';
import BusAmenities from './BusAmenities';

const BusInfoCard = ({ bus, searchData }) => {
  if (!bus) return null;
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Jul 27, 2026';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  
  const journeyDate = formatDate(searchData?.travelDate);

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-md border border-gray-200 dark:border-slate-800/80 relative overflow-hidden flex flex-col gap-6 w-full">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-bl-full pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 w-full relative z-10 gap-y-6 lg:gap-y-0">
        
        {/* Left Section: Operator Info */}
        <div className="lg:col-span-3 flex flex-col lg:pr-6 lg:border-r border-gray-200 dark:border-slate-800 justify-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
              {bus.operator.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{bus.operator}</h2>
              <span className="text-sm font-semibold text-gray-500 dark:text-slate-400 mt-0.5">{bus.busType}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current" /> {bus.rating}
            </span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-500/20">
              {bus.seatsAvailable} Seats Left
            </span>
          </div>
        </div>

        {/* Middle Section: Journey Timeline */}
        <div className="lg:col-span-6 flex items-center justify-center lg:px-6 lg:border-r border-gray-200 dark:border-slate-800 gap-2 sm:gap-6 pt-4 lg:pt-0 border-t lg:border-t-0">
          
          {/* Departure */}
          <div className="flex flex-col items-end text-right w-1/3">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{bus.departureTime}</span>
            <span className="text-sm font-bold text-gray-800 dark:text-slate-200 mt-1 truncate w-full">{bus.source}</span>
            <span className="text-xs font-medium text-gray-500 dark:text-slate-400 truncate w-full" title={bus.boardingPoint}>{bus.boardingPoint}</span>
          </div>

          {/* Timeline */}
          <div className="flex flex-col items-center flex-1 max-w-[220px]">
            <div className="flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs font-bold text-gray-500 dark:text-slate-400">{bus.duration}</span>
            </div>
            
            <div className="w-full flex items-center relative my-1">
              <div className="w-3 h-3 rounded-full border-2 border-indigo-500 bg-white dark:bg-[#111827] z-10"></div>
              <div className="h-[2px] flex-1 bg-gray-200 dark:bg-slate-700 mx-1"></div>
              <div className="w-3 h-3 rounded-full border-2 border-cyan-500 bg-white dark:bg-[#111827] z-10"></div>
            </div>

            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-1 rounded-md">
              <Calendar className="w-3.5 h-3.5" />
              {journeyDate}
            </div>
          </div>

          {/* Arrival */}
          <div className="flex flex-col items-start text-left w-1/3 relative">
            <div className="flex items-center relative">
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{bus.arrivalTime}</span>
              {bus.isNextDay && <span className="absolute -top-2 left-full ml-1 text-[10px] text-rose-500 font-bold bg-rose-50 dark:bg-rose-500/10 px-1 py-0.5 rounded whitespace-nowrap">+1 Day</span>}
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-slate-200 mt-1 truncate w-full">{bus.destination}</span>
            <span className="text-xs font-medium text-gray-500 dark:text-slate-400 truncate w-full" title={bus.droppingPoint}>{bus.droppingPoint}</span>
          </div>

        </div>
        
        {/* Right Section: Price */}
        <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-center lg:pl-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-200 dark:border-slate-800">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Seat Price</span>
          <span className="text-3xl font-black text-gray-900 dark:text-white leading-none">₹{bus.price}</span>
          {bus.originalPrice && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-medium text-gray-400 line-through">₹{bus.originalPrice}</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
                {Math.round(((bus.originalPrice - bus.price) / bus.originalPrice) * 100)}% OFF
              </span>
            </div>
          )}
        </div>

      </div>
      
      {/* BOTTOM: Amenities Bar */}
      <div className="w-full relative z-10 pt-5 border-t border-gray-100 dark:border-slate-800">
        <BusAmenities />
      </div>
    </div>
  );
};

export default BusInfoCard;
