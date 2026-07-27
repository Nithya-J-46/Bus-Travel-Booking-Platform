import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Map, Navigation, ArrowRight } from 'lucide-react';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const MOCK_ROUTES = [
  { id: 1, from: 'Bangalore', to: 'Hyderabad', distance: '570 km', duration: '9h 30m', fare: 899, rating: 4.8, operatorCount: 45 },
  { id: 2, from: 'Chennai', to: 'Coimbatore', distance: '510 km', duration: '8h 15m', fare: 650, rating: 4.6, operatorCount: 32 },
  { id: 3, from: 'Mumbai', to: 'Pune', distance: '150 km', duration: '3h 30m', fare: 350, rating: 4.7, operatorCount: 88 },
  { id: 4, from: 'Hyderabad', to: 'Vijayawada', distance: '275 km', duration: '5h 00m', fare: 450, rating: 4.5, operatorCount: 60 },
  { id: 5, from: 'Delhi', to: 'Manali', distance: '540 km', duration: '12h 45m', fare: 1200, rating: 4.9, operatorCount: 25 },
  { id: 6, from: 'Bangalore', to: 'Chennai', distance: '350 km', duration: '6h 30m', fare: 599, rating: 4.4, operatorCount: 75 },
];

const PopularRoutes = ({ onRouteSelect }) => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Popular Routes</h2>
          <p className="text-gray-500 dark:text-gray-400">Discover the most frequently traveled routes across the country.</p>
        </div>
        <button className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all mt-4 md:mt-0">
          View all <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ROUTES.map((route, idx) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="group bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-16 bg-gradient-to-br from-indigo-50 to-transparent dark:from-indigo-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none -mr-8 -mt-8" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {route.from}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-emerald-500" /> Start
                  </p>
                </div>
                <div className="w-8 flex justify-center text-gray-300 dark:text-slate-600">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {route.to}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-end gap-1">
                    <Map className="w-3 h-3 text-cyan-500" /> End
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 dark:bg-slate-800/50 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                <Map className="w-3.5 h-3.5" /> {route.distance}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 dark:bg-slate-800/50 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                <Clock className="w-3.5 h-3.5" /> {route.duration}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                <Star className="w-3.5 h-3.5 fill-current" /> {route.rating}
              </span>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-800 relative z-10">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Starting from</p>
                <p className="font-bold text-lg text-gray-900 dark:text-white">₹{route.fare}</p>
              </div>
              <Button 
                variant="primary" 
                className="py-2 px-5 text-sm"
                onClick={() => {
                  const data = {
                    fromCity: route.from,
                    toCity: route.to,
                    travelDate: new Date().toISOString().split('T')[0],
                    passengers: 1,
                    busType: 'AC Sleeper'
                  };
                  if (onRouteSelect) {
                    onRouteSelect(data);
                  } else {
                    navigate('/search-results', { state: data });
                  }
                }}
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PopularRoutes;
