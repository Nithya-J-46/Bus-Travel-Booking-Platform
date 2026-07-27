import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'lucide-react';
import Button from '../Button';

const BookingSummary = ({ selectedSeats, pricePerSeat, busInfo, searchData }) => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  
  const seatCount = selectedSeats.length;
  const baseFare = seatCount * pricePerSeat;
  const convenienceFee = seatCount > 0 ? 50 : 0;
  const gst = baseFare > 0 ? Math.round(baseFare * 0.05) : 0;
  
  // Example discount logic for UI
  const discount = seatCount >= 2 ? Math.round(baseFare * 0.1) : 0;
  
  const totalAmount = baseFare + convenienceFee + gst - discount;

  const handleApplyPromo = () => {
    // Dummy promo logic
    setPromoCode('');
  };

  const handleContinue = () => {
    if (seatCount === 0) return;
    
    // Navigate to passenger details page with required state
    navigate('/passenger-details', {
      state: {
        selectedSeats,
        busInfo,
        searchData,
        fareDetails: { baseFare, convenienceFee, gst, totalAmount }
      }
    });
  };

  return (
    <>
      <div className="w-full flex flex-col bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden xl:sticky xl:top-24">
        
        {/* Title */}
        <div className="p-6 border-b border-gray-100 dark:border-slate-800/80">
          <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Booking Summary</h3>
        </div>

        <div className="flex-1 flex flex-col p-6 gap-6">
          
          {/* Selected Seats */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center w-full">
              <span className="text-sm font-bold text-gray-900 dark:text-white">Selected Seats</span>
              {seatCount > 0 && (
                <button className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors">Clear All</button>
              )}
            </div>
            {seatCount > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map(seat => (
                  <div key={seat} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 font-bold rounded-lg text-sm shadow-sm flex items-center gap-2">
                    {seat}
                    <span className="text-indigo-400 dark:text-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer text-lg leading-none">×</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-gray-400 italic text-sm">No seats selected</span>
            )}
          </div>

          {seatCount > 0 && (
            <>
              <hr className="border-gray-100 dark:border-slate-800/80" />

              {/* Price Breakdown */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">Passengers</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{seatCount}</span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">Seat Fare ({seatCount} x ₹{pricePerSeat})</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">₹{baseFare}</span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">Convenience Fee</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">₹{convenienceFee}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"><Tag className="w-3.5 h-3.5"/> Discount</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">GST (5%)</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">₹{gst}</span>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-slate-700 border-dashed" />

              {/* Grand Total */}
              <div className="flex justify-between items-center w-full">
                <span className="text-lg font-black text-gray-900 dark:text-white">Grand Total</span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₹{totalAmount}</span>
              </div>

              <hr className="border-gray-100 dark:border-slate-800/80" />

              {/* Promo Code */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Promo Code</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter Code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white uppercase transition-all"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="px-6 py-3 bg-gray-900 dark:bg-slate-100 text-white dark:text-gray-900 font-bold rounded-xl text-sm hover:bg-gray-800 dark:hover:bg-white transition-all shadow-md"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Continue Button */}
              <Button 
                variant="primary" 
                className="w-full py-4 text-base font-black rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:brightness-110 shadow-[0_8px_20px_rgba(99,102,241,0.3)] transition-all duration-300 mt-2 hidden xl:block"
                onClick={handleContinue}
              >
                Continue to Passenger Details
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 w-full bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-50 xl:hidden rounded-t-3xl px-6 py-4 flex items-center justify-between gap-4">
          
          {/* Left: Selected Seats */}
          <div className="flex flex-col items-start min-w-0 flex-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Selected Seats</span>
            <span className="text-sm font-black text-gray-900 dark:text-white truncate w-full mt-0.5">{selectedSeats.join(', ')}</span>
            <span className="text-[10px] font-bold text-indigo-500 mt-1 cursor-pointer hover:text-indigo-600 transition-colors">View Breakdown</span>
          </div>

          {/* Center: Total Amount */}
          <div className="flex flex-col items-center justify-center min-w-[30%] border-x border-gray-200 dark:border-slate-700 px-4">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Total Amount</span>
            <span className="text-xl font-black text-gray-900 dark:text-white mt-0.5">₹{totalAmount}</span>
          </div>

          {/* Right: Continue Button */}
          <div className="flex-1 flex justify-end">
            <Button 
              variant="primary" 
              className="w-full py-3.5 px-4 text-sm font-black rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:brightness-110 shadow-lg shadow-indigo-500/30 transition-all duration-300"
              onClick={handleContinue}
            >
              Continue to Passenger Details
            </Button>
          </div>

        </div>
      )}
    </>
  );
};

export default BookingSummary;
