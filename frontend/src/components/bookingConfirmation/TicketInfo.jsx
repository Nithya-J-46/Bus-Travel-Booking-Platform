import React from 'react';
import { Bus, MapPin, Users, Ticket, Check } from 'lucide-react';

const TicketInfo = ({ busInfo, searchData, passengers, fareDetails, selectedSeats }) => {
  return (
    <div className="flex flex-col gap-8 animate-[fadeInUp_0.5s_ease-out_0.2s_both]">
      
      {/* Journey Details */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Bus className="w-6 h-6 text-indigo-500" />
          Journey Details
        </h3>
        
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-slate-800">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl flex items-center justify-center shrink-0">
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {busInfo?.operator?.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="text-lg font-black text-gray-900 dark:text-white">{busInfo?.operator}</h4>
            <p className="text-sm font-bold text-gray-500 dark:text-slate-400">{busInfo?.busType}</p>
          </div>
        </div>

        <div className="flex items-center justify-between relative mb-6">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-2xl font-black text-gray-900 dark:text-white mb-1">{busInfo?.departureTime}</p>
            <p className="text-sm font-bold text-gray-500 dark:text-slate-400">{searchData?.from}</p>
          </div>

          <div className="flex-[2] flex flex-col items-center px-4 relative z-10">
            <div className="w-full h-[2px] bg-indigo-100 dark:bg-slate-800 absolute top-1/2 -translate-y-1/2 -z-10"></div>
            <div className="bg-white dark:bg-[#111827] px-4 py-1.5 rounded-full border border-gray-200 dark:border-slate-700">
              <span className="text-xs font-bold text-gray-500 dark:text-slate-400">
                {busInfo?.duration}
              </span>
            </div>
            <p className="text-xs font-bold text-gray-400 dark:text-slate-500 mt-2">{searchData?.date}</p>
          </div>

          <div className="flex-1 text-center sm:text-right">
            <p className="text-2xl font-black text-gray-900 dark:text-white mb-1">{busInfo?.arrivalTime}</p>
            <p className="text-sm font-bold text-gray-500 dark:text-slate-400">{searchData?.to}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Boarding Point</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Main Bus Terminus, {searchData?.from}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Dropping Point</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Central Station, {searchData?.to}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Passenger & Ticket Information */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-cyan-500" />
            Passenger Details
          </h3>
          <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold border border-indigo-100 dark:border-indigo-500/20">
            {passengers?.length || 0} Passengers
          </span>
        </div>

        <div className="space-y-4 mb-8">
          {(Array.isArray(passengers) ? passengers : Object.entries(passengers || {}).map(([seat, data]) => ({ ...data, seat }))).map((passenger, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-black text-sm">
                  P{index + 1}
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">{passenger.name || 'Passenger'}</h4>
                  <p className="text-xs font-bold text-gray-500 dark:text-slate-400">
                    {passenger.gender || 'N/A'}, {passenger.age || '--'} yrs
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Seat</p>
                <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{passenger.seat}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 dark:border-slate-800 pt-6">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Ticket className="w-6 h-6 text-purple-500" />
            Fare Breakdown
          </h3>
          <div className="space-y-4 text-sm font-bold">
            <div className="flex justify-between text-gray-600 dark:text-slate-400">
              <span>Base Fare ({passengers?.length || 0} Seats)</span>
              <span className="text-gray-900 dark:text-white">₹{Number(fareDetails?.baseFare || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-slate-400">
              <span>Convenience Fee</span>
              <span className="text-gray-900 dark:text-white">₹{Number(fareDetails?.convenienceFee || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-slate-400">
              <span>GST (5%)</span>
              <span className="text-gray-900 dark:text-white">₹{Number(fareDetails?.gst || 0).toFixed(2)}</span>
            </div>
            {Number(fareDetails?.discount || 0) > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Discount Applied</span>
                <span>-₹{Number(fareDetails.discount).toFixed(2)}</span>
              </div>
            )}
            
            <div className="h-px bg-gray-200 dark:bg-slate-800 my-4"></div>
            
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-900 dark:text-white font-black">Grand Total</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-black">₹{Number(fareDetails?.totalAmount || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TicketInfo;
