import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, CheckCircle, ArrowRight, LayoutDashboard } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from '../Button';

const ReviewSuccessModal = ({ isOpen, onClose }) => {

  useEffect(() => {
    if (isOpen) {
      // Fire confetti animation
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#6366f1', '#06b6d4', '#f59e0b']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#6366f1', '#06b6d4', '#f59e0b']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
      
      // Auto close after 5 seconds if not closed manually
      const timer = setTimeout(() => {
        if (isOpen) onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[500px] bg-white dark:bg-[#111827] rounded-[32px] shadow-2xl p-8 sm:p-10 flex flex-col items-center text-center border border-gray-100 dark:border-slate-800"
        >
          {/* Animated Checkmark */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 relative"
          >
            <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-500/20 rounded-full animate-ping opacity-75"></div>
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
              🎉 Thank You for Your Feedback!
            </h2>
            <p className="text-sm font-bold text-gray-500 dark:text-slate-400 mb-8 max-w-[360px] mx-auto">
              Your review has been submitted successfully. Your feedback helps improve future journeys and assists other travellers.
            </p>
          </motion.div>

          {/* Reward Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl p-[2px] mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="bg-white dark:bg-slate-900 rounded-[22px] p-6 relative z-10">
              <div className="flex items-center gap-2 mb-2 justify-center">
                <Gift className="w-5 h-5 text-indigo-500" />
                <h4 className="text-sm font-black text-gray-900 dark:text-white">BusGo Rewards</h4>
              </div>
              <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-3">You've earned</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">50</span>
                <span className="text-lg font-black text-gray-900 dark:text-white">Reward Points</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                <div className="inline-flex items-center justify-center px-3 py-1 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 rounded-full text-[11px] font-bold uppercase tracking-wider gap-1.5">
                  <span className="text-base">🏅</span> First Review Submitted
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="w-full space-y-3"
          >
            <Button variant="primary" className="w-full py-3.5 rounded-xl text-sm font-bold shadow-lg" onClick={onClose}>
              Continue Exploring
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="w-full py-3.5 rounded-xl text-sm font-bold border-gray-200 dark:border-slate-700" onClick={onClose}>
              <LayoutDashboard className="w-4 h-4 mr-2" /> Back to My Bookings
            </Button>
          </motion.div>
          
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReviewSuccessModal;
