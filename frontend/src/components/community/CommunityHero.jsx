import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Star, TrendingUp } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const STATS = [
  { label: 'Members', value: '45.2K+', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
  { label: 'Active Discussions', value: '1,204', icon: MessageCircle, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/30' },
  { label: 'Travel Reviews', value: '8.4K', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/30' },
  { label: 'Trending Posts', value: '142', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/30' }
];

const CommunityHero = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 p-8 md:p-12 mb-8 text-white shadow-2xl">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />
      
      <div className="relative z-10 mb-10">
        <SectionHeading 
          badge="COMMUNITY" 
          icon={Users} 
          title={
            <>
              BusGo <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Community</span>
            </>
          }
          subtitle="Connect with fellow travellers, share your journey experiences, ask questions, and discover new routes."
          className="[&_h2]:!text-white [&_p]:!text-indigo-100 [&_div.bg-indigo-500]:hidden"
        />
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-white/20 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-3 bg-white`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-indigo-200">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityHero;
