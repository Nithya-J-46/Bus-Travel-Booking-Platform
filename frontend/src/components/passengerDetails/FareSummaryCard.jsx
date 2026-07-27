import React from 'react';
import { Tag, ArrowRight, ShieldCheck } from 'lucide-react';

const FareSummaryCard = ({ selectedSeats, fareDetails, preferences, onSubmit, isValidating }) => {
  const seatCount = selectedSeats.length;
  const baseFare = fareDetails?.baseFare || 0;
  const convenienceFee = fareDetails?.convenienceFee || 0;
  
  // Calculate dynamic additions based on preferences
  const insuranceFee = preferences?.insurance ? seatCount * 15 : 0;
  
  const discount = fareDetails?.discount || 0;
  // Calculate new GST if needed or just use passed GST
  const baseGst = fareDetails?.gst || 0;
  const totalGst = baseGst + (insuranceFee * 0.18); // Example: 18% GST on insurance
  
  const grandTotal = baseFare + convenienceFee + insuranceFee + totalGst - discount;

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden xl:sticky xl:top-24">
      
      {/* Title */}
      <div className="p-6 border-b border-gray-100 dark:border-slate-800/80">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Fare Summary</h3>
        <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 mt-1">Review your booking details</p>
      </div>

      {/* Breakdown */}
      <div className="p-6 flex flex-col gap-4">
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600 dark:text-slate-400">Seat Fare ({seatCount} {seatCount === 1 ? 'Seat' : 'Seats'})</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">₹{baseFare.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600 dark:text-slate-400">Convenience Fee</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">₹{convenienceFee.toFixed(2)}</span>
        </div>

        {preferences?.insurance && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-300">
            <span className="text-sm font-semibold flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Travel Insurance</span>
            <span className="text-sm font-bold">₹{insuranceFee.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600 dark:text-slate-400">Taxes (GST)</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">₹{totalGst.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-sm font-bold">Discount Applied</span>
            <span className="text-sm font-bold">-₹{discount.toFixed(2)}</span>
          </div>
        )}
        
        {/* Divider */}
        <div className="h-[1px] w-full bg-gray-200 dark:bg-slate-700 my-1 border-dashed border-b border-gray-300 dark:border-slate-600"></div>
        
        <div className="flex items-center justify-between">
          <span className="text-base font-black text-gray-900 dark:text-white uppercase tracking-wide">Grand Total</span>
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="px-6 pb-6">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Tag className="w-4 h-4 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Enter promo code" 
            className="w-full bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl pl-10 pr-20 py-3 text-sm font-bold text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all uppercase"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 px-3 py-1.5 rounded-lg transition-colors">
            APPLY
          </button>
        </div>
      </div>

      {/* Continue Button (Desktop) */}
      <div className="p-6 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800 hidden xl:block">
        <button 
          onClick={() => onSubmit({ grandTotal, insuranceFee, totalGst })}
          disabled={isValidating}
          className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        >
          {isValidating ? 'Processing...' : 'Continue to Payment'}
          {!isValidating && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </button>
        <p className="text-center text-[10px] font-semibold text-gray-400 mt-3">By continuing, you agree to our Terms of Service</p>
      </div>

    </div>
  );
};

export default FareSummaryCard;
