import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GETAWAYS = [
  { id: 1, title: 'Mountain Escapes', routes: 'Delhi to Manali, Chandigarh to Shimla', tag: 'Weekend' },
  { id: 2, title: 'Beach Retreats', routes: 'Mumbai to Goa, Bangalore to Pondicherry', tag: 'Relax' },
  { id: 3, title: 'Heritage Tours', routes: 'Jaipur to Udaipur, Chennai to Madurai', tag: 'Culture' }
];

const TrendingRoutes = ({ onRouteSelect }) => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Curated Getaways</h2>
        <p className="text-gray-500 dark:text-gray-400">Handpicked routes for your next weekend escape.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {GETAWAYS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            onClick={() => {
              const data = {
                fromCity: route.split(' to ')[0] || route.split(' - ')[0],
                toCity: route.split(' to ')[1] || route.split(' - ')[1],
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
            className="group cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-[#1e293b] dark:to-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-slate-800"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white">{item.title}</h3>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                {item.tag}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              {item.routes}
            </p>
            <div className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              <Calendar className="w-4 h-4 mr-1.5" /> Book for this weekend
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingRoutes;
