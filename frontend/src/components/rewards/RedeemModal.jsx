import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useRewards } from '../../context/RewardsContext';
import Button from '../Button';

const RedeemModal = ({ reward, onClose }) => {
  const { points, redeemReward } = useRewards();
  const [success, setSuccess] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const handleRedeem = () => {
    setIsRedeeming(true);
    // Simulate network delay
    setTimeout(() => {
      const success = redeemReward(reward);
      if (success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
      setIsRedeeming(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={!isRedeeming && !success ? onClose : undefined}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative z-10 border border-gray-100 dark:border-slate-800"
      >
        {!success && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            disabled={isRedeeming}
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {success ? (
          <div className="text-center py-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Redeemed Successfully!</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
              You have redeemed {reward.title}. The reward details have been sent to your email.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8 pt-4">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border border-gray-100 dark:border-slate-800 shadow-sm">
                {reward.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">Redeem Reward</h3>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{reward.title}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 mb-8 border border-gray-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Current Balance</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{points.toLocaleString()} pts</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Points Required</span>
                <span className="text-sm font-black text-rose-500">-{reward.points.toLocaleString()} pts</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-slate-800 my-3"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Remaining Balance</span>
                <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{(points - reward.points).toLocaleString()} pts</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                className="flex-1 py-3"
                onClick={onClose}
                disabled={isRedeeming}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                className="flex-1 py-3 shadow-lg shadow-indigo-500/20"
                onClick={handleRedeem}
                isLoading={isRedeeming}
              >
                Confirm Redeem
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default RedeemModal;
