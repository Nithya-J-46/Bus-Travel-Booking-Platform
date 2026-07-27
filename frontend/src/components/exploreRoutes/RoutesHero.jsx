import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const RoutesHero = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // default to tomorrow
    return today.toISOString().split('T')[0];
  });

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search-results', {
      state: { fromCity: from, toCity: to, travelDate: date, passengers: 1, busType: 'AC Sleeper' }
    });
  };

  return (
    <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 flex items-center bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950 text-white overflow-hidden select-none">
      {/* Background Ornaments */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-900/50 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
        >
          Explore Over <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">10,000+</span> Routes
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
        >
          Find the best buses, compare fares, and book your tickets instantly with zero booking fees.
        </motion.p>
      </div>
    </section>
  );
};

export default RoutesHero;
