import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const reviews = [
  {
    id: 1,
    name: 'Aishwarya Roy',
    role: 'Frequent Business Traveler',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    text: 'Booking through BusGo was incredibly seamless. The luxury AC sleeper was clean, departed exactly on time, and the live tracking link kept my family completely at ease. Highly recommended!',
    route: 'Mumbai to Bangalore'
  },
  {
    id: 2,
    name: 'Rohan Sharma',
    role: 'Weekend Explorer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    text: 'I travel to Goa almost every other weekend, and the operator ratings here are extremely accurate. I got the lowest fare with an instant discount code. The seat selection layout is perfect!',
    route: 'Bangalore to Goa'
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'Student traveler',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 4,
    text: 'The 24/7 help desk is outstanding! My bus was delayed due to heavy rain, and the agent instantly rescheduled my journey on a different operator coach without any cancellation charges.',
    route: 'Pune to Hyderabad'
  }
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [current]);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-slate-50 dark:bg-[#080c14] transition-colors duration-300 relative overflow-hidden select-none">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <SectionHeading 
          badge="REVIEWS" 
          icon={Star} 
          title="What Our Travelers Say" 
          subtitle="Read real stories from our verified passengers."
        />

        {/* Carousel Frame */}
        <div className="relative p-[1.5px] rounded-[32px] bg-gradient-to-tr from-white/20 via-white/5 to-white/30 dark:from-white/10 dark:via-white/5 dark:to-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden">
          
          <div className="bg-white/60 dark:bg-[#0c111e]/60 backdrop-blur-xl rounded-[30.5px] p-8 sm:p-12 relative flex flex-col items-center">
            
            {/* Quote Icon background decoration */}
            <Quote className="absolute top-6 right-8 w-24 h-24 text-indigo-500/10 dark:text-indigo-400/5 pointer-events-none" />
            
            {/* Slides container */}
            <div className="w-full relative min-h-[220px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500/35 shadow-md">
                    <img
                      src={reviews[current].avatar}
                      alt={reviews[current].name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 justify-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4.5 h-4.5 ${
                          i < reviews[current].rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-350 italic font-medium leading-relaxed max-w-2xl">
                    "{reviews[current].text}"
                  </p>

                  {/* User Profile */}
                  <div className="flex flex-col text-center">
                    <span className="text-base font-extrabold text-slate-905 dark:text-white">
                      {reviews[current].name}
                    </span>
                    <span className="text-2xs font-extrabold text-slate-400 dark:text-slate-550 uppercase tracking-widest mt-0.5">
                      {reviews[current].role} • Route: {reviews[current].route}
                    </span>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider triggers */}
            <div className="flex items-center gap-6 mt-8">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 active:scale-90 transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-350 ${
                      index === current ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 active:scale-90 transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialCarousel;
