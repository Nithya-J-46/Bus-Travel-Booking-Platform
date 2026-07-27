import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, IndianRupee, Star, Bus, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

// Category-based Fallback Images
const FALLBACK_IMAGES = {
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  mountain: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80',
  heritage: 'https://images.unsplash.com/photo-1599661559929-14a93a152631?auto=format&fit=crop&w=600&q=80',
  metro: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&w=600&q=80'
};

const DESTINATIONS = [
  {
    id: 'd1',
    city: 'Goa',
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop',
    routesCount: 150,
    avgFare: 850,
    rating: 4.8,
    topOperators: 'VRL, SRS Travels'
  },
  {
    id: 'd2',
    city: 'Manali',
    category: 'mountain',
    image: 'https://images.unsplash.com/photo-1623949826353-83ebce25c88c?q=80&w=600&auto=format&fit=crop',
    routesCount: 85,
    avgFare: 1100,
    rating: 4.7,
    topOperators: 'IntrCity, Zingbus'
  },
  {
    id: 'd3',
    city: 'Jaipur',
    category: 'heritage',
    image: 'https://images.unsplash.com/photo-1599661559929-14a93a152631?q=80&w=600&auto=format&fit=crop',
    routesCount: 120,
    avgFare: 650,
    rating: 4.6,
    topOperators: 'RSRTC, Gujarat Travels'
  },
  {
    id: 'd4',
    city: 'Mumbai',
    category: 'metro',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=600&auto=format&fit=crop',
    routesCount: 300,
    avgFare: 950,
    rating: 4.5,
    topOperators: 'Neeta, Paulo'
  },
  {
    id: 'd5',
    city: 'Munnar',
    category: 'mountain',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop',
    routesCount: 65,
    avgFare: 700,
    rating: 4.9,
    topOperators: 'KSRTC, Kallada'
  },
  {
    id: 'd6',
    city: 'Varanasi',
    category: 'heritage',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=600&auto=format&fit=crop',
    routesCount: 90,
    avgFare: 550,
    rating: 4.4,
    topOperators: 'UPSRTC, NueGo'
  },
  {
    id: 'd7',
    city: 'Bangalore',
    category: 'metro',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600&auto=format&fit=crop',
    routesCount: 400,
    avgFare: 1200,
    rating: 4.8,
    topOperators: 'KSRTC, VRL'
  },
  {
    id: 'd8',
    city: 'Ooty',
    category: 'mountain',
    image: 'https://images.unsplash.com/photo-1596895111956-bf570531bd06?q=80&w=600&auto=format&fit=crop',
    routesCount: 110,
    avgFare: 600,
    rating: 4.7,
    topOperators: 'KPN, SRM'
  }
];

const TopDestinations = ({ onRouteSelect }) => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Trending Destinations</h2>
          <p className="text-gray-500 dark:text-gray-400">Discover India's most breathtaking locations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DESTINATIONS.map((dest, idx) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 4) * 0.1, duration: 0.5 }}
            onClick={() => {
              const data = {
                fromCity: '',
                toCity: dest.city,
                travelDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                passengers: 1,
                busType: 'AC Sleeper'
              };
              if (onRouteSelect) {
                onRouteSelect(data);
              } else {
                navigate('/search-results', { state: data });
              }
            }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer h-[380px] shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
          >
            {/* Image with Category-based fallback */}
            <img 
              src={dest.image} 
              alt={dest.city}
              onError={(e) => { 
                e.target.onerror = null; // Prevent infinite loops
                e.target.src = FALLBACK_IMAGES[dest.category] || FALLBACK_IMAGES.metro; 
              }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-slate-200 dark:bg-slate-800"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            
            {/* Rating Badge */}
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/20 shadow-sm z-10">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-white">{dest.rating}</span>
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md transform group-hover:-translate-y-1 transition-transform duration-300">
                {dest.city}
              </h3>
              
              <div className="space-y-3 opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 overflow-hidden transition-all duration-300 delay-75 ease-in-out">
                
                <div className="flex justify-between items-center text-gray-200 text-sm border-b border-white/20 pb-2 mt-2">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-indigo-400" /> {dest.routesCount}+ Routes</span>
                  <span className="flex items-center gap-1 font-bold text-white"><IndianRupee className="w-4 h-4 text-emerald-400" /> {dest.avgFare}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-300 pb-2">
                  <Bus className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="truncate">{dest.topOperators}</span>
                </div>
                
                <div className="pt-1">
                  <Button 
                    variant="primary" 
                    className="w-full py-2.5 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 shadow-[0_4px_15px_rgba(79,70,229,0.4)] border-0 flex items-center justify-center gap-2"
                  >
                    Explore Route
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopDestinations;
