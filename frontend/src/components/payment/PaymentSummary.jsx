import React from 'react';
import { Tag } from 'lucide-react';
import Button from '../Button';
import PaymentSecurity from './PaymentSecurity';

const PaymentSummary = ({ fareDetails, passengerCount, selectedSeats, onPay, isProcessing }) => {
  const { baseFare = 0, convenienceFee = 0, gst = 0, totalAmount = 0 } = fareDetails || {};

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 sticky top-32 w-full">
      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">
        Booking Summary
      </h3>

      <div className="flex flex-wrap gap-2 mb-6">
        {selectedSeats?.map(seat => (
          <span key={seat} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-lg border border-indigo-100 dark:border-indigo-500/20">
            Seat {seat}
          </span>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center text-sm font-bold text-gray-600 dark:text-slate-400">
          <span>Base Fare ({passengerCount} Passengers)</span>
          <span className="text-gray-900 dark:text-white">₹{baseFare.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm font-bold text-gray-600 dark:text-slate-400">
          <span>Convenience Fee</span>
          <span className="text-gray-900 dark:text-white">₹{convenienceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm font-bold text-gray-600 dark:text-slate-400">
          <span>GST (5%)</span>
          <span className="text-gray-900 dark:text-white">₹{gst.toFixed(2)}</span>
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-slate-800 my-6"></div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="block text-sm font-bold text-gray-500 dark:text-slate-400">Grand Total</span>
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <Button
        variant="primary"
        className="w-full py-4 text-base font-black rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:brightness-110 shadow-[0_8px_20px_rgba(99,102,241,0.3)] transition-all duration-300"
        onClick={onPay}
        isLoading={isProcessing}
      >
        {isProcessing ? 'Processing Payment...' : `Pay Securely ₹${totalAmount.toFixed(2)}`}
      </Button>

      <PaymentSecurity />
    </div>
  );
};

export default PaymentSummary;
