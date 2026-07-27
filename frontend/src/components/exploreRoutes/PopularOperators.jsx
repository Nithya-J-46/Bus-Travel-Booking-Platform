import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Users, Navigation, IndianRupee } from 'lucide-react';
import Button from '../Button';

const OPERATORS = [
  { id: 1, name: 'IntrCity SmartBus', rating: 4.8, fleet: 350, routes: '150+', initials: 'IC', fare: 800 },
  { id: 2, name: 'VRL Travels', rating: 4.6, fleet: 500, routes: '220+', initials: 'VR', fare: 750 },
  { id: 3, name: 'SRS Travels', rating: 4.5, fleet: 420, routes: '180+', initials: 'SR', fare: 700 },
  { id: 4, name: 'Orange Tours', rating: 4.7, fleet: 280, routes: '120+', initials: 'OT', fare: 850 }
];

const PopularOperators = () => {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Premium Operators</h2>
        <p className="text-gray-500 dark:text-gray-400">Travel with top-rated and verified bus operators.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {OPERATORS.map((op, idx) => (
          <motion.div
            key={op.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-white dark:bg-[#111827] p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-500/30 transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Initial Logo / Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl font-black mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner border border-indigo-200/50 dark:border-indigo-500/20">
              {op.initials}
            </div>
            
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{op.name}</h3>
            
            {/* Rating Badge */}
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full mb-5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="font-bold text-xs text-amber-700 dark:text-amber-400">{op.rating}</span>
            </div>

            {/* Stats Row */}
            <div className="w-full flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 mb-5">
              <div className="text-center flex-1 border-r border-slate-100 dark:border-slate-800/80">
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Routes</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm flex items-center justify-center gap-1">
                  <Navigation className="w-3 h-3 text-indigo-500" /> {op.routes}
                </p>
              </div>
              <div className="text-center flex-1">
                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Starting</p>
                <p className="font-bold text-gray-900 dark:text-white text-sm flex items-center justify-center gap-1">
                  <IndianRupee className="w-3 h-3 text-emerald-500" /> {op.fare}
                </p>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full py-2.5 text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:border-indigo-200 dark:group-hover:border-indigo-800/50 transition-all duration-300"
            >
              View Routes
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PopularOperators;
