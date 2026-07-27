import React, { memo } from 'react';
import { Navigation, MapPin } from 'lucide-react';
import Button from '../Button';

const BusCard = ({ bus, onViewSeats }) => {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getSeatStatus = (available, total) => {
    const ratio = available / total;
    if (ratio > 0.5) return '🟢';
    if (ratio > 0.2) return '🟡';
    return '🔴';
  };

  const seatIndicator = getSeatStatus(bus.seatsAvailable, bus.totalSeats);

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-md border border-gray-200 dark:border-slate-800/80 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-slate-700 transition-all duration-300 relative group">
      
      {/* Top Quality Tags (Max 2) */}
      {bus.qualityTags && bus.qualityTags.length > 0 && (
        <div className="absolute top-0 left-6 -translate-y-1/2 flex items-center gap-2 z-20">
          {bus.qualityTags.slice(0, 2).map((tag, i) => (
            <span key={`qt-${i}`} className="px-3 py-1 text-[10px] font-bold rounded-full bg-slate-900 text-white shadow-sm border border-slate-700">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 relative z-10 pt-2">
        
        {/* Left Side: Bus Info & Timing */}
        <div className="flex-1 flex flex-col sm:flex-row gap-6 justify-between border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-slate-800/80 pb-6 lg:pb-0 lg:pr-8 items-center">
          
          <div className="flex flex-col min-w-[200px] w-full sm:w-auto">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-sm">
                {getInitials(bus.operator)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{bus.operator}</h3>
                <span className="text-xs text-gray-500 dark:text-slate-400">{bus.busType} • {bus.seatTypeBadges?.map(b => b.replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim()).join(', ') || ''}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-2 ml-13">
              <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded border border-emerald-200 dark:border-emerald-500/20">
                ⭐ {bus.rating} {bus.ratingText}
              </span>
              <span className="text-xs text-gray-400 font-medium">{bus.reviews} Reviews</span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between sm:justify-center gap-4 lg:min-w-[280px] w-full sm:w-auto">
            <div className="flex flex-col text-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">{bus.departureTime}</span>
            </div>
            
            <div className="flex flex-col items-center px-4 flex-1 sm:max-w-[120px]">
              <span className="text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">{bus.duration}</span>
              <div className="w-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                <div className="h-[1px] flex-1 bg-gray-300 dark:bg-slate-700 border-t border-dashed border-gray-300 dark:border-slate-600"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
              </div>
              {bus.isNightJourney && <span className="text-[10px] text-gray-400 mt-1">Night Journey</span>}
            </div>

            <div className="flex flex-col text-center">
              <div className="flex items-center justify-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{bus.arrivalTime}</span>
                {bus.isNextDay && <span className="text-[9px] text-rose-500 font-bold ml-1 -mt-2">+1d</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Price & Action */}
        <div className="w-full lg:w-48 flex flex-col justify-center gap-4">
          <div className="flex flex-col items-center lg:items-end w-full">
            <div className="flex items-center gap-2">
              {bus.originalPrice && (
                <span className="text-sm font-medium text-gray-400 line-through">₹{bus.originalPrice}</span>
              )}
              <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{bus.price}</span>
            </div>
            
            {bus.offers && bus.offers.length > 0 && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded mt-1 border border-emerald-100">
                {bus.offers[0]}
              </span>
            )}

            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-sm">{seatIndicator}</span>
              <span className="text-xs font-medium text-gray-700 dark:text-slate-300">{bus.seatsAvailable} Seats Left</span>
            </div>
            {bus.windowSeats > 0 && (
              <span className="text-[10px] text-gray-500 mt-0.5">{bus.windowSeats} Window</span>
            )}
          </div>

          <Button 
            variant="primary" 
            className="w-full py-2.5 font-bold text-sm shadow-md shadow-indigo-500/20"
            onClick={() => onViewSeats(bus.id)}
          >
            View Seats
          </Button>
        </div>

      </div>
      
    </div>
  );
};

export default memo(BusCard);
