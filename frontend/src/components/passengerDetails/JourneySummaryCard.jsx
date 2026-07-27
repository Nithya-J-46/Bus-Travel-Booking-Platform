import React from 'react';
import { Clock, Calendar, Users, MapPin, CheckCircle } from 'lucide-react';

const JourneySummaryCard = ({ busInfo, searchData, selectedSeats, fareDetails }) => {
  if (!busInfo) return null;

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

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-800 pb-5 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
            {busInfo.operator.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{busInfo.operator}</h2>
            <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 mt-0.5">{busInfo.busType}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-gray-100 dark:border-slate-700">
          <div className="flex flex-col items-center border-r border-gray-200 dark:border-slate-700 pr-3">
            <span className="text-[10px] uppercase font-bold text-gray-400">Total Fare</span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 leading-none mt-1">₹{fareDetails?.totalAmount}</span>
          </div>
          <div className="flex flex-col items-center pl-1">
            <span className="text-[10px] uppercase font-bold text-gray-400">Passengers</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1 mt-1">
              <Users className="w-3.5 h-3.5 text-indigo-500" /> {selectedSeats.length}
            </span>
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="flex flex-col sm:flex-row items-center justify-between relative z-10 gap-6">
        
        {/* Departure */}
        <div className="flex flex-col items-start w-full sm:w-[35%]">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{busInfo.departureTime}</span>
          <span className="text-sm font-bold text-gray-800 dark:text-slate-200 mt-1">{busInfo.source}</span>
          <span className="text-xs font-medium text-gray-500 dark:text-slate-400 mt-0.5 flex items-start gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{busInfo.boardingPoint}</span>
          </span>
        </div>

        {/* Timeline Graphic */}
        <div className="flex flex-col items-center flex-1 w-full min-w-[150px]">
          <div className="flex items-center gap-1.5 mb-2">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-[11px] font-bold text-gray-500 dark:text-slate-400">{busInfo.duration}</span>
          </div>
          
          <div className="w-full flex items-center relative my-1">
            <div className="w-3 h-3 rounded-full border-2 border-indigo-500 bg-white dark:bg-[#111827] z-10"></div>
            <div className="h-[2px] flex-1 bg-gray-200 dark:bg-slate-700 mx-1"></div>
            <div className="w-3 h-3 rounded-full border-2 border-cyan-500 bg-white dark:bg-[#111827] z-10"></div>
          </div>

          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-1 rounded-md">
            <Calendar className="w-3 h-3" />
            {journeyDate}
          </div>
        </div>

        {/* Arrival */}
        <div className="flex flex-col items-end sm:items-start text-right sm:text-left w-full sm:w-[35%] relative">
          <div className="flex items-center relative">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{busInfo.arrivalTime}</span>
            {busInfo.isNextDay && <span className="absolute -top-2 left-full ml-1 text-[9px] text-rose-500 font-bold bg-rose-50 dark:bg-rose-500/10 px-1 py-0.5 rounded whitespace-nowrap">+1 Day</span>}
          </div>
          <span className="text-sm font-bold text-gray-800 dark:text-slate-200 mt-1">{busInfo.destination}</span>
          <span className="text-xs font-medium text-gray-500 dark:text-slate-400 mt-0.5 flex items-start justify-end sm:justify-start gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{busInfo.droppingPoint}</span>
          </span>
        </div>

      </div>

      {/* Selected Seats Bottom Bar */}
      <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-gray-100 dark:border-slate-700 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Selected Seats</span>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600"></div>
          <span className="text-sm font-black text-gray-900 dark:text-white">{selectedSeats.length}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {selectedSeats.map(seat => (
            <div key={seat} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 font-bold rounded-lg text-sm shadow-sm flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              {seat}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default JourneySummaryCard;
