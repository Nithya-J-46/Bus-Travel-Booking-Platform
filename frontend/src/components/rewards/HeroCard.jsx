import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';
import { useRewards } from '../../context/RewardsContext';

const HeroCard = () => {
  const { points, lifetimePoints, tierInfo } = useRewards();
  const { currentTier, nextTier } = tierInfo;

  // Calculate progress to next tier
  let progress = 100;
  let pointsNeeded = 0;
  if (nextTier) {
    const range = nextTier.minPoints - currentTier.minPoints;
    const earnedInCurrentRange = lifetimePoints - currentTier.minPoints;
    progress = Math.min(100, Math.max(0, (earnedInCurrentRange / range) * 100));
    pointsNeeded = nextTier.minPoints - lifetimePoints;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-900 via-slate-900 to-[#0b0f19] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          {/* BusGo Rewards badge removed as it's now in SectionHeading */}
          
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
            {points.toLocaleString()} <span className="text-xl sm:text-2xl text-indigo-200">pts</span>
          </h1>
          <p className="text-sm font-medium text-indigo-200/80">Available to redeem</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:w-80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-xl">{currentTier.icon}</span> {currentTier.name} Member
            </span>
            <span className="text-xs font-bold text-indigo-300">{lifetimePoints.toLocaleString()} Lifetime Pts</span>
          </div>
          
          {nextTier ? (
            <>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2 mt-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full"
                />
              </div>
              <p className="text-xs font-medium text-slate-400">
                Earn <strong className="text-white">{pointsNeeded.toLocaleString()} more points</strong> to unlock {nextTier.name} tier
              </p>
            </>
          ) : (
            <div className="mt-4 p-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-center">
              <p className="text-xs font-bold text-amber-400">You've reached the highest tier!</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroCard;
