import React from 'react';
import { Clock, Route as RouteIcon, IndianRupee, MapPin } from 'lucide-react';

const RouteOptions = ({ routes, activeRoute, setActiveRoute, eta, trafficLevel }) => {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Suggested Routes</h3>
      
      <div className="space-y-3">
        {routes.map(route => (
          <div 
            key={route.id}
            onClick={() => setActiveRoute(route)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              activeRoute.id === route.id 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                : 'border-transparent bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                route.type === 'fastest' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' :
                route.type === 'scenic' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' :
                'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'
              }`}>
                {route.name}
              </span>
              
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {activeRoute.id === route.id ? eta : `${Math.floor(route.duration/60)}h ${route.duration%60}m`}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 mt-3">
              <span className="flex items-center gap-1">
                <RouteIcon className="w-3.5 h-3.5" />
                {route.distance}
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5" />
                {route.cost}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {route.stops} stops
              </span>
            </div>
            
            {activeRoute.id === route.id && (
              <div className="mt-3 pt-3 border-t border-indigo-200 dark:border-indigo-800/50 flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-700 dark:text-indigo-400">Selected Route</span>
                <span className={`font-bold ${
                  trafficLevel === 'Low' ? 'text-emerald-500' :
                  trafficLevel === 'Moderate' ? 'text-yellow-500' : 'text-rose-500'
                }`}>
                  {trafficLevel} Traffic
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteOptions;
