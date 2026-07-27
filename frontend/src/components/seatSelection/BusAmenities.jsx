import React from 'react';
import { Wifi, BatteryCharging, Bed, Droplets, DoorOpen, Navigation } from 'lucide-react';

const BusAmenities = () => {
  const amenities = [
    { id: 'wifi', icon: Wifi, label: 'WiFi' },
    { id: 'charging', icon: BatteryCharging, label: 'Charging' },
    { id: 'blanket', icon: Bed, label: 'Blanket' },
    { id: 'water', icon: Droplets, label: 'Water Bottle' },
    { id: 'exit', icon: DoorOpen, label: 'Emergency Exit' },
    { id: 'gps', icon: Navigation, label: 'Live GPS' },
  ];

  return (
    <div className="flex flex-wrap xl:flex-nowrap items-center w-full gap-3 lg:gap-4">
      {amenities.map((item) => {
        const Icon = item.icon;
        return (
          <div 
            key={item.id} 
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-[#111827] border border-gray-200 dark:border-slate-700 rounded-full text-gray-700 dark:text-slate-300 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:-translate-y-0.5 transition-all duration-300 cursor-default min-w-[max-content]"
          >
            <Icon className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="text-xs font-bold tracking-wide whitespace-nowrap">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BusAmenities;
