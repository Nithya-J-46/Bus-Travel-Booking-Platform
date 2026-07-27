import React, { useState } from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';
import Button from '../Button';

const CancelBookingModal = ({ isOpen, onClose, onConfirm, booking }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !booking) return null;

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      onConfirm(booking.id);
      setIsProcessing(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={!isProcessing ? onClose : undefined}
      />
      
      <div className="relative bg-white dark:bg-[#151C2E] w-full max-w-md rounded-[24px] shadow-2xl shadow-indigo-500/10 border border-gray-100 dark:border-slate-800 overflow-hidden animate-[scaleIn_0.3s_ease-out]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center border border-red-100 dark:border-red-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black">Cancel Booking?</h3>
          </div>
          
          <button 
            onClick={!isProcessing ? onClose : undefined}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            disabled={isProcessing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-slate-300 font-bold mb-4">
            Are you sure you want to cancel this booking?
          </p>
          
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 flex gap-3">
            <div className="w-1.5 h-auto bg-amber-500 rounded-full shrink-0"></div>
            <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
              Refunds will be processed to your original payment method within 24 hours.
            </p>
          </div>
          
          <div className="mt-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 border border-gray-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-500 dark:text-slate-400">Refund Amount</span>
            <span className="text-lg font-black text-gray-900 dark:text-white">₹{booking.fare.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 bg-gray-50/50 dark:bg-slate-900/30 border-t border-gray-100 dark:border-slate-800 flex gap-3 sm:flex-row flex-col">
          <Button 
            variant="outline"
            className="flex-1 py-3 rounded-xl sm:order-1 order-2"
            onClick={onClose}
            disabled={isProcessing}
          >
            Keep Booking
          </Button>
          <Button 
            variant="primary"
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 shadow-red-500/25 sm:order-2 order-1 border-0"
            onClick={handleConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </span>
            ) : (
              'Cancel Booking'
            )}
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default CancelBookingModal;
