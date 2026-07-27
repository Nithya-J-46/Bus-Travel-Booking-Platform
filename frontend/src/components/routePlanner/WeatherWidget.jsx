import React from 'react';
import { CloudRain, ThermometerSun, AlertTriangle } from 'lucide-react';

const WeatherWidget = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10">
        <h3 className="text-sm font-bold text-indigo-100 uppercase tracking-wider mb-4">Boarding Point Weather</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ThermometerSun className="w-10 h-10 text-amber-300" />
            <div>
              <span className="text-3xl font-black">28°C</span>
              <p className="text-sm font-medium text-indigo-100">Partly Cloudy</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-indigo-200 mb-1">Humidity</p>
            <p className="font-bold">65%</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-start gap-3">
          <CloudRain className="w-5 h-5 text-indigo-200 shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-indigo-50 leading-tight">
            Light rain expected around your boarding time. Don't forget your umbrella!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
