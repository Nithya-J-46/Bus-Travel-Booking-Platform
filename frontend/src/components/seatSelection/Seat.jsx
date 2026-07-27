import React from 'react';
import { Check, Columns } from 'lucide-react';

const Seat = ({ id, status, type = 'seater', onClick }) => {
  // status: 'available', 'booked', 'selected', 'ladies'
  
  const isSleeper = type === 'sleeper';
  
  // Dummy logic to determine if it's a window seat
  const isWindow = id.includes('A') || id.includes('D') || id.includes('1') || id.includes('4');
  const price = isSleeper ? '₹1500' : '₹850';
  
  const getStatusStyles = () => {
    switch (status) {
      case 'booked':
        return 'bg-[#E5E7EB] border-[#9CA3AF] text-[#9CA3AF] cursor-not-allowed opacity-80 shadow-sm';
      case 'selected':
        return 'bg-gradient-to-b from-indigo-500 to-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/40 transform scale-110';
      case 'ladies':
        return 'bg-[#FCE7F3] border-[#EC4899] text-[#EC4899] hover:bg-pink-100 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-1';
      case 'available':
      default:
        // Note: the green bottom indicator is handled in the render block for available seats
        return 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1';
    }
  };

  const getSeatDimensions = () => {
    return isSleeper 
      ? 'w-28 h-14 sm:w-[9.5rem] sm:h-20 rounded-lg' // Sleeper (horizontal bed)
      : 'w-14 h-14 sm:w-[5.5rem] sm:h-[5.5rem] rounded-t-3xl rounded-b-xl'; // Seater (rounded chair)
  };

  const handleInteraction = (e) => {
    if (status !== 'booked') {
      if (e.type === 'click' || (e.type === 'keydown' && (e.key === 'Enter' || e.key === ' '))) {
        e.preventDefault();
        onClick(id);
      }
    }
  };

  return (
    <div className="relative group/seat">
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded-xl opacity-0 group-hover/seat:opacity-100 pointer-events-none transition-opacity duration-200 z-50 shadow-xl flex flex-col items-center gap-1">
        <span className="font-black text-sm">{id}</span>
        <span className="font-medium opacity-80">{isSleeper ? 'Sleeper' : 'Seater'} {isWindow ? '• Window' : '• Aisle'}</span>
        <span className="font-bold text-emerald-400 dark:text-emerald-600 mt-0.5">{price}</span>
        <span className="capitalize font-semibold mt-1 bg-gray-800 dark:bg-gray-100 px-2 py-0.5 rounded-md">{status}</span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-white" />
      </div>

      <div 
        onClick={handleInteraction}
        onKeyDown={handleInteraction}
        tabIndex={status === 'booked' ? -1 : 0}
        aria-label={`Seat ${id}, ${isSleeper ? 'Sleeper' : 'Seater'}, ${isWindow ? 'Window' : 'Aisle'}, Price ${price}, Status ${status}`}
        role="button"
        aria-pressed={status === 'selected'}
        className={`
          relative border-2 flex flex-col items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 z-20 outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 focus-visible:ring-offset-2
          ${getSeatDimensions()}
          ${getStatusStyles()}
          ${isWindow && status === 'available' ? 'border-[#0EA5E9]' : ''}
        `}
      >
        {status === 'available' && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#22C55E] rounded-b-sm"></div>
        )}
        
        {status === 'selected' ? (
          <Check className="w-5 h-5 z-30 animate-in zoom-in duration-200" strokeWidth={4} />
        ) : (
          <span className="z-30 drop-shadow-sm">{id}</span>
        )}
      </div>

      {/* Window Indicator */}
      {isWindow && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-30 group-hover/seat:opacity-100 transition-opacity pointer-events-none z-10">
          <Columns className="w-3 h-3 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default Seat;
