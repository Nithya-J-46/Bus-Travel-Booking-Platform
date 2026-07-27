import React from 'react';

const SeatIcon = ({ className }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="3" width="14" height="15" rx="3" fill="currentColor" opacity="0.2"/>
    <rect x="5" y="3" width="14" height="15" rx="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M3 13C3 11.8954 3.89543 11 5 11H19C20.1046 11 21 11.8954 21 13V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V13Z" fill="currentColor"/>
  </svg>
);

const SeatLegend = () => {
  const legendItems = [
    { label: 'Available', type: 'available', colorClass: 'text-green-500' },
    { label: 'Booked', type: 'booked', colorClass: 'text-gray-400' },
    { label: 'Selected', type: 'selected', colorClass: 'text-purple-500' },
    { label: 'Ladies', type: 'ladies', colorClass: 'text-pink-500' },
    { label: 'Window', type: 'window', colorClass: 'text-blue-500' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 w-full">
      {legendItems.map((item, index) => (
        <div 
          key={index} 
          className="flex items-center gap-2 bg-white dark:bg-[#111827] px-3.5 py-2 rounded-full border border-gray-200 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md cursor-default"
        >
          <SeatIcon className={`shrink-0 ${item.colorClass}`} />
          <span className="text-xs font-bold text-gray-700 dark:text-slate-300">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SeatLegend;
