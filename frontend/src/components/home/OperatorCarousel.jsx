import React from 'react';
import { Star, ShieldCheck, Bus } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const operators = [
  { name: 'National Express', rating: '4.8', routes: '220+ Routes', type: 'Premium' },
  { name: 'GreenBus Travels', rating: '4.7', routes: '140+ Routes', type: 'Eco Sleeper' },
  { name: 'SwiftTravel India', rating: '4.9', routes: '310+ Routes', type: 'Multi-Axle Scania' },
  { name: 'Royal Cruiser', rating: '4.6', routes: '180+ Routes', type: 'Luxury AC' },
  { name: 'SafeExpress Lines', rating: '4.8', routes: '150+ Routes', type: 'Verified Safe' },
  { name: 'CityLiners', rating: '4.7', routes: '280+ Routes', type: 'AC Seater' }
];

const OperatorCarousel = () => {
  // Duplicate operators array for seamless infinite marquee scrolling
  const marqueeItems = [...operators, ...operators, ...operators];

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-slate-50 dark:bg-[#080c14] border-t border-b border-slate-150 dark:border-slate-800/40 transition-colors duration-300 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          badge="OPERATORS" 
          icon={Bus} 
          title="Featured Bus Operators" 
          subtitle="Book directly from verified premium operators holding highest service reviews."
        />
      </div>

      {/* Marquee Row Container */}
      <div className="w-full relative flex overflow-hidden py-4 bg-slate-100/50 dark:bg-slate-900/10 border-t border-b border-slate-200/30 dark:border-slate-800/20">
        <div className="animate-ticker flex gap-6">
          {marqueeItems.map((op, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 px-6 py-4 bg-white dark:bg-[#0f1524] rounded-2xl border border-slate-200/50 dark:border-slate-800/80 shadow-[0_4px_15px_rgba(0,0,0,0.01)] hover:border-indigo-500/30 transition-all hover:scale-[1.02] cursor-pointer min-w-[240px]"
            >
              {/* Logo graphic */}
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-900/20 flex-shrink-0">
                <Bus className="w-5 h-5 stroke-[2.2]" />
              </div>
              
              {/* Operator details */}
              <div className="flex flex-col text-left">
                <span className="text-sm font-extrabold text-slate-800 dark:text-white truncate max-w-[150px]">{op.name}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-550 font-bold mb-1">{op.type}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded">
                    {op.routes}
                  </span>
                  <div className="flex items-center gap-0.5 text-[10px] font-extrabold text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    {op.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperatorCarousel;
