import React from 'react';
import { MapPin, Clock, Info } from 'lucide-react';

const BoardingInfo = ({ booking }) => {
  const boardingTime = booking?.schedule?.departure_time || '21:30';
  const boardingName = 'Madiwala Boarding Point';
  const address = 'Opposite Ayyappa Temple, Hosur Road, Madiwala, Bangalore, 560068';
  const landmark = 'Near Madiwala Police Station';
  const platform = 'Platform 3';

  // Calculate reporting time (30 mins before)
  const [hours, minutes] = boardingTime.split(':').map(Number);
  const reportingDate = new Date();
  reportingDate.setHours(hours, minutes - 30, 0);
  const reportingTime = reportingDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 h-full">
      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-rose-500" />
        Boarding Details
      </h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{boardingName}</h4>
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400 leading-relaxed">
            {address}
          </p>
        </div>

        <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-100 dark:border-amber-500/20 text-amber-800 dark:text-amber-200">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-xs font-bold leading-tight">
            Landmark: {landmark}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-1">Departure Time</p>
            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span className="text-lg font-black">{boardingTime}</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-1">Reporting Time</p>
            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span className="text-lg font-black">{reportingTime}</span>
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="inline-flex items-center justify-center w-full p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
            <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
              Assigned Platform: <span className="text-lg font-black ml-1">{platform}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingInfo;
