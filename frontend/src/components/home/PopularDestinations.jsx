import React, { useState } from 'react';
import { Star, MapPin, ArrowRight, Image as ImageIcon, Map } from 'lucide-react';
import Button from '../Button';
import toast from 'react-hot-toast';
import SectionHeading from '../ui/SectionHeading';

const destinations = [
  {
    id: 1,
    name: 'Goa',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    price: '₹899',
    rating: '4.9',
    buses: '18 Daily Buses',
    desc: 'Sunset beaches and dynamic coastal vibes.'
  },
  {
    id: 2,
    name: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80',
    price: '₹599',
    rating: '4.8',
    buses: '32 Daily Buses',
    desc: 'The city of dreams and heritage architecture.'
  },
  {
    id: 3,
    name: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80',
    price: '₹499',
    rating: '4.7',
    buses: '24 Daily Buses',
    desc: 'Sleek gardens, palaces, and technology hubs.'
  },
  {
    id: 4,
    name: 'Delhi',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80',
    price: '₹999',
    rating: '4.8',
    buses: '15 Daily Buses',
    desc: 'Rich historic monuments and iconic street food.'
  }
];

const DestinationImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
      )}
      {hasError ? (
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800/80 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-[10px] font-bold uppercase tracking-wider">No Image</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
        />
      )}
    </>
  );
};

const PopularDestinations = () => {
  const handleQuickBook = (name) => {
    toast.success(`Redirecting to route bookings for ${name}...`);
  };

  return (
    <section id="destinations" className="py-12 sm:py-14 lg:py-16 bg-slate-50 dark:bg-[#080c14] transition-colors duration-300 relative select-none">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading 
          badge="TOP ROUTES" 
          icon={Map} 
          title="Popular Destinations" 
          subtitle="Explore our most popular travel spots with comfortable buses flying regular schedules."
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#0f1524] border border-slate-150 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.1)] hover:-translate-y-1.5 transition-all duration-350 flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                <DestinationImage src={dest.image} alt={dest.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-85" />
                
                {/* Rating Tag */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 text-xs font-extrabold text-slate-900 dark:text-white shadow-md">
                  <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                  {dest.rating}
                </div>

                {/* Price tag */}
                <div className="absolute bottom-4 left-4 flex flex-col text-left">
                  <span className="text-[10px] text-slate-300 dark:text-slate-400 font-extrabold uppercase tracking-wide">Starting from</span>
                  <span className="text-lg font-black text-white">{dest.price}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow text-left space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{dest.name}</h3>
                  <span className="text-xs font-semibold text-indigo-650 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-lg">
                    {dest.buses}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed flex-grow">
                  {dest.desc}
                </p>

                {/* Hover Reveal Button */}
                <div className="pt-4 mt-auto">
                  <button
                    onClick={() => handleQuickBook(dest.name)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 shadow-sm transition-all shimmer-container shimmer-delayed-effect cursor-pointer"
                  >
                    <span>Book Ticket Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularDestinations;
