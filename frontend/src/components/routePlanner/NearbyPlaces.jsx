import React from 'react';
import { Coffee, Banknote, UtilityPole, Stethoscope } from 'lucide-react';

const PLACES = [
  { name: 'Udupi Cafe', type: 'Restaurant', icon: Coffee, distance: '100m', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  { name: 'HDFC ATM', type: 'ATM', icon: Banknote, distance: '150m', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { name: 'Public Restroom', type: 'Facility', icon: UtilityPole, distance: '50m', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-500/10' },
  { name: 'City Hospital', type: 'Hospital', icon: Stethoscope, distance: '500m', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
];

const NearbyPlaces = () => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800">
      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Nearby Places</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {PLACES.map((place, idx) => {
          const Icon = place.icon;
          return (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-indigo-100 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${place.bg}`}>
                <Icon className={`w-5 h-5 ${place.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">{place.name}</p>
                <p className="text-[10px] font-bold text-gray-400">{place.distance}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NearbyPlaces;
