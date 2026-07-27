import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRewards } from '../../context/RewardsContext';
import Button from '../Button';
import RedeemModal from './RedeemModal';

const AvailableRewards = () => {
  const { rewardsList, points } = useRewards();
  const [selectedReward, setSelectedReward] = useState(null);

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black text-gray-900 dark:text-white">Available Rewards</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewardsList.map((reward, index) => {
          const canAfford = points >= reward.points;
          
          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-2xl border border-gray-100 dark:border-slate-800 flex flex-col h-full hover:shadow-lg transition-shadow bg-slate-50 dark:bg-slate-900"
            >
              <div className="w-12 h-12 rounded-full bg-white dark:bg-[#111827] flex items-center justify-center text-2xl shadow-sm mb-3">
                {reward.icon}
              </div>
              <h4 className="text-sm font-black text-gray-900 dark:text-white mb-1">{reward.title}</h4>
              <p className="text-xs font-medium text-gray-500 dark:text-slate-400 mb-4 flex-1">
                {reward.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-slate-700">
                <span className={`text-sm font-black ${canAfford ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
                  {reward.points} pts
                </span>
                <Button 
                  variant={canAfford ? 'primary' : 'secondary'}
                  size="sm"
                  className={canAfford ? 'shadow-md shadow-indigo-500/20' : 'opacity-50'}
                  onClick={() => canAfford && setSelectedReward(reward)}
                  disabled={!canAfford}
                >
                  Redeem
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedReward && (
          <RedeemModal 
            reward={selectedReward} 
            onClose={() => setSelectedReward(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvailableRewards;
