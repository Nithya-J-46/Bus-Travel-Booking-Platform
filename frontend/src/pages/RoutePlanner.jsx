import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, Share2, Save } from 'lucide-react';
import InteractiveMap from '../components/routePlanner/InteractiveMap';
import JourneySearchForm from '../components/routePlanner/JourneySearchForm';
import RouteOptions from '../components/routePlanner/RouteOptions';
import TrafficPanel from '../components/routePlanner/TrafficPanel';
import SavedRoutes from '../components/routePlanner/SavedRoutes';
import InsightsWidget from '../components/routePlanner/InsightsWidget';
import toast from 'react-hot-toast';

const MOCK_ROUTES = [
  { id: 'r1', name: 'Fastest Route', distance: '560 km', duration: 520, traffic: 'Low', type: 'fastest', stops: 2, cost: '₹ 1,200' },
  { id: 'r2', name: 'Scenic Route', distance: '610 km', duration: 580, traffic: 'Moderate', type: 'scenic', stops: 4, cost: '₹ 1,450' },
  { id: 'r3', name: 'Economy Route', distance: '575 km', duration: 550, traffic: 'Heavy', type: 'economy', stops: 6, cost: '₹ 950' }
];

const RoutePlanner = () => {
  const [source, setSource] = useState('Bangalore');
  const [destination, setDestination] = useState('Goa');
  const [waypoints, setWaypoints] = useState([]);
  const [routes, setRoutes] = useState(MOCK_ROUTES);
  const [activeRoute, setActiveRoute] = useState(MOCK_ROUTES[0]);
  const [trafficLevel, setTrafficLevel] = useState('Low'); // Low, Moderate, Heavy, Severe
  const [eta, setEta] = useState('');

  // Traffic Simulation Engine
  useEffect(() => {
    const calculateEta = (baseDuration, traffic) => {
      let multiplier = 1;
      if (traffic === 'Moderate') multiplier = 1.15;
      if (traffic === 'Heavy') multiplier = 1.4;
      if (traffic === 'Severe') multiplier = 1.8;
      
      const totalMins = baseDuration * multiplier;
      const hrs = Math.floor(totalMins / 60);
      const mins = Math.floor(totalMins % 60);
      return `${hrs}h ${mins}m`;
    };

    setEta(calculateEta(activeRoute.duration, trafficLevel));

    const interval = setInterval(() => {
      const levels = ['Low', 'Moderate', 'Heavy', 'Severe'];
      const currentIdx = levels.indexOf(trafficLevel);
      let nextIdx = currentIdx + (Math.random() > 0.5 ? 1 : -1);
      nextIdx = Math.max(0, Math.min(3, nextIdx));
      
      const nextLevel = levels[nextIdx];
      
      if (nextLevel === 'Severe' && trafficLevel !== 'Severe') {
        toast.error('Traffic alert! Severe congestion detected ahead.', { icon: '🚨' });
        const alternative = routes.find(r => r.id !== activeRoute.id);
        if (alternative) {
          setTimeout(() => {
            toast.success(`Suggesting alternative: ${alternative.name}`);
            setActiveRoute(alternative);
          }, 2000);
        }
      } else if (nextLevel !== trafficLevel) {
        toast('Traffic conditions updated', { icon: '🔄' });
      }

      setTrafficLevel(nextLevel);
    }, 15000);

    return () => clearInterval(interval);
  }, [trafficLevel, activeRoute, routes]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-20">
      
      {/* Hero Header */}
      <div className="bg-indigo-900 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold mb-4 flex items-center gap-3"
          >
            <Map className="w-8 h-8 text-cyan-400" />
            Smart Route Planner
          </motion.h1>
          <p className="text-indigo-200 text-lg max-w-2xl">
            Plan your journey with interactive maps, add multiple stops, and get real-time traffic simulations and alternative route suggestions before you travel.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Controls & Options (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <JourneySearchForm 
            source={source} setSource={setSource}
            destination={destination} setDestination={setDestination}
            waypoints={waypoints} setWaypoints={setWaypoints}
          />
          
          <RouteOptions 
            routes={routes} 
            activeRoute={activeRoute} 
            setActiveRoute={setActiveRoute}
            eta={eta}
            trafficLevel={trafficLevel}
          />

          <TrafficPanel trafficLevel={trafficLevel} />
          
          <InsightsWidget />

          <SavedRoutes />
        </div>

        {/* Right Main Area: Interactive Map (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col h-[600px] lg:h-auto">
          {/* Quick Actions Bar */}
          <div className="bg-white dark:bg-[#1e293b] p-4 rounded-t-2xl border border-gray-100 dark:border-slate-800 flex flex-wrap gap-2 justify-between items-center shadow-sm z-10">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 dark:text-white">Active Route:</span>
              <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold rounded-full">
                {activeRoute.name}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toast.success('Route saved to favorites!')} className="p-2 text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors" title="Save Route">
                <Save className="w-5 h-5" />
              </button>
              <button onClick={() => toast.success('Link copied to clipboard!')} className="p-2 text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors" title="Share Route">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-grow bg-slate-200 dark:bg-slate-800 rounded-b-2xl overflow-hidden shadow-lg border-x border-b border-gray-100 dark:border-slate-800 relative z-0 min-h-[500px]">
            <InteractiveMap 
              source={source} 
              destination={destination} 
              waypoints={waypoints} 
              trafficLevel={trafficLevel}
              activeRoute={activeRoute}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoutePlanner;
