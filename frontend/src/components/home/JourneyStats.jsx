import React, { useState, useEffect } from 'react';
import { Award, Compass, Heart, Users } from 'lucide-react';

const stats = [
  {
    id: 1,
    title: 'Tickets Booked',
    endValue: 15,
    suffix: 'M+',
    icon: <Users className="w-6 h-6 text-indigo-500" />,
    desc: 'Satisfied passengers served worldwide'
  },
  {
    id: 2,
    title: 'Active Routes',
    endValue: 1200,
    suffix: '+',
    icon: <Compass className="w-6 h-6 text-cyan-500" />,
    desc: 'Connecting cities across multiple states'
  },
  {
    id: 3,
    title: 'Premium Operators',
    endValue: 450,
    suffix: '+',
    icon: <Award className="w-6 h-6 text-emerald-500" />,
    desc: 'Verified brands offering luxury coaches'
  },
  {
    id: 4,
    title: 'Customer Rating',
    endValue: 98,
    suffix: '%',
    icon: <Heart className="w-6 h-6 text-red-500 animate-pulse" />,
    desc: 'Positive review rating on service quality'
  }
];

const StatCard = ({ item }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = item.endValue;
    const duration = 1800; // ms
    const increment = Math.ceil(end / (duration / 30));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [item.endValue]);

  return (
    <div className="p-8 bg-white/70 dark:bg-[#0c111e]/70 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] text-center flex flex-col items-center hover:scale-102 transition-transform duration-300">
      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 flex items-center justify-center mb-4">
        {item.icon}
      </div>
      <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
        {item.id === 4 ? (count / 20).toFixed(1) : count.toLocaleString()}
        {item.id === 4 ? '/5' : item.suffix}
      </span>
      <h4 className="text-sm font-extrabold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider mb-2">
        {item.title}
      </h4>
      <p className="text-xs text-slate-450 dark:text-slate-500 font-semibold leading-relaxed">
        {item.desc}
      </p>
    </div>
  );
};

const JourneyStats = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0b0f19] transition-colors duration-300 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatCard key={stat.id} item={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyStats;
