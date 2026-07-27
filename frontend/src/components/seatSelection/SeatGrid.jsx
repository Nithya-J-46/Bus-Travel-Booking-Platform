import React from 'react';
import Seat from './Seat';
import { CircleDot } from 'lucide-react'; // For Steering Wheel

const SeatGrid = ({ deckData, seatType, onSeatClick, getSeatStatus }) => {
  return (
    <div className="bg-white dark:bg-[#111827] border-4 border-gray-300 dark:border-slate-600 rounded-[3rem] rounded-tl-[4.5rem] rounded-tr-[4.5rem] p-6 sm:p-10 shadow-2xl w-full max-w-4xl min-w-[400px] sm:min-w-[600px] relative mx-auto before:content-[''] before:absolute before:top-3 before:left-1/2 before:-translate-x-1/2 before:w-1/3 before:h-2.5 before:bg-gray-200 dark:before:bg-slate-700 before:rounded-full">
      
      {/* Front of Bus (Driver Area) */}
      <div className="w-full mb-12 border-b-[4px] border-gray-200 dark:border-slate-700 flex justify-between items-end pb-8 mt-6 px-4 sm:px-12 relative">
        {/* Entrance (Left side of bus) */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-3.5 bg-gray-300 dark:bg-slate-600 rounded-full mb-3 shadow-inner"></div>
          <span className="text-xs font-black text-gray-400 tracking-widest uppercase">Entrance</span>
        </div>
        
        {/* Driver Cabin (Right side of bus) */}
        <div className="flex flex-col items-center gap-4">
          {/* Steering Wheel */}
          <div className="w-14 h-14 border-[5px] border-gray-300 dark:border-slate-600 rounded-full flex items-center justify-center relative shadow-sm">
            <div className="w-full h-1.5 bg-gray-300 dark:bg-slate-600 absolute"></div>
            <div className="w-5 h-5 bg-gray-400 dark:bg-slate-500 rounded-full z-10 shadow-md"></div>
          </div>
          {/* Driver Seat */}
          <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-lg border-4 border-gray-300 dark:border-slate-600 shadow-md"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase mt-1">Driver Cabin</span>
        </div>
      </div>

      {/* Main Seat Grid */}
      <div className="flex flex-col gap-12 sm:gap-16 relative pb-6 px-2 sm:px-8">
        
        {/* Textured Aisle Background */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-20 sm:w-28 bg-gray-50/50 dark:bg-slate-800/20 border-x-2 border-dashed border-gray-200 dark:border-slate-700 -z-10 flex flex-col items-center justify-center">
          <span className="text-gray-300 dark:text-slate-600 font-bold uppercase tracking-[0.5em] rotate-90 text-sm sm:text-base whitespace-nowrap">Walking Aisle</span>
        </div>

        {deckData.leftRows.map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-between items-center w-full gap-24 sm:gap-40 relative z-10">
            
            {/* Left Side */}
            <div className="flex gap-4 sm:gap-6">
              {deckData.leftRows[rowIndex].map(seatId => (
                <Seat 
                  key={seatId} 
                  id={seatId} 
                  type={seatType}
                  status={getSeatStatus(seatId)}
                  onClick={onSeatClick}
                />
              ))}
            </div>
            
            {/* Right Side */}
            <div className="flex gap-4 sm:gap-6">
              {deckData.rightRows[rowIndex]?.map(seatId => (
                <Seat 
                  key={seatId} 
                  id={seatId} 
                  type={seatType}
                  status={getSeatStatus(seatId)}
                  onClick={onSeatClick}
                />
              ))}
            </div>
            
          </div>
        ))}
        
        {/* Rear Row */}
        {deckData.rearRow && deckData.rearRow.length > 0 && (
          <div className="flex gap-4 sm:gap-6 mt-8 justify-center w-full bg-gray-50 dark:bg-slate-800/30 p-6 rounded-[2rem] border-2 border-gray-100 dark:border-slate-700/50 relative z-10">
            {deckData.rearRow.map(seatId => (
              <Seat 
                key={seatId} 
                id={seatId} 
                type={seatType}
                status={getSeatStatus(seatId)}
                onClick={onSeatClick}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default SeatGrid;
