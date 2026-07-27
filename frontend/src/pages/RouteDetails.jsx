import React, { useEffect } from 'react';
import { Bus, MapPin, Clock, ArrowRight } from 'lucide-react';
import RouteInsights, { ReviewList } from '../components/reviews/RouteInsights';

const RouteDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-indigo-600 dark:bg-indigo-900 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Bus className="w-64 h-64 -rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-indigo-200 text-sm font-bold uppercase tracking-wider mb-4">
              <MapPin className="w-4 h-4" /> Route Details
            </div>
            <div className="flex items-center gap-4 text-3xl sm:text-4xl font-black mb-6">
              <span>Bangalore</span>
              <ArrowRight className="w-8 h-8 text-indigo-300" />
              <span>Hyderabad</span>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2 bg-indigo-500/30 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 text-indigo-200" />
                8h 45m Average Duration
              </div>
              <div className="flex items-center gap-2 bg-indigo-500/30 px-3 py-1.5 rounded-full">
                <Bus className="w-4 h-4 text-indigo-200" />
                Multiple Operators
              </div>
            </div>
          </div>
        </div>

        {/* Insights & Reviews */}
        <div className="space-y-8">
          <RouteInsights />
          <ReviewList />
        </div>

      </div>
    </div>
  );
};

export default RouteDetails;
