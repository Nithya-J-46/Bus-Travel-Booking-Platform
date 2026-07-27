import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const PlannerHeader = ({ booking }) => {
  // Use mock data if no booking is provided
  const source = booking?.schedule?.route?.source?.name || 'Bangalore';
  const destination = booking?.schedule?.route?.destination?.name || 'Hyderabad';
  
  const formattedDate = booking?.travel_date 
    ? new Date(booking.travel_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-3xl p-6 sm:p-8 shadow-xl text-white relative overflow-hidden mb-8">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="text-sm font-bold text-indigo-100 uppercase tracking-wider mb-2">Route Planner</p>
          <div className="flex items-center gap-4 text-2xl sm:text-3xl font-black mb-2">
            <span>{source}</span>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <ArrowRight className="w-5 h-5" />
            </div>
            <span>{destination}</span>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/50 flex items-center justify-center text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-indigo-100">Travel Date</p>
              <p className="text-sm font-bold">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerHeader;
