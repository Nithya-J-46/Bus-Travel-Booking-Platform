import React, { useState } from 'react';
import { Tag, CheckCircle2 } from 'lucide-react';
import Button from '../Button';

const OffersCard = () => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    if (promoCode.trim().length > 3) {
      setIsApplied(true);
    }
  };

  const handleRemove = () => {
    setIsApplied(false);
    setPromoCode('');
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
        <Tag className="w-6 h-6 text-indigo-500" />
        Offers & Promos
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
        <div className="relative w-full sm:flex-1">
          <input
            type="text"
            placeholder="Enter Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            disabled={isApplied}
            className="w-full pl-4 pr-10 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white disabled:opacity-60 transition-all"
          />
          {isApplied && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
          )}
        </div>
        {isApplied ? (
          <Button
            variant="danger"
            onClick={handleRemove}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm"
          >
            Remove
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleApply}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm"
          >
            Apply
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {/* Offer 1 */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 group hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors w-full">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0">
            <span className="text-indigo-600 dark:text-indigo-400 font-black text-lg">%</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 truncate">FIRST500</h4>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-2 break-words">
              Get ₹200 OFF on your first booking with BusGo. Valid for new users only.
            </p>
            <button 
              onClick={() => { setPromoCode('FIRST500'); setIsApplied(true); }}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Apply Offer
            </button>
          </div>
        </div>

        {/* Offer 2 */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-500/5 border border-cyan-100 dark:border-cyan-500/20 group hover:border-cyan-300 dark:hover:border-cyan-500/40 transition-colors w-full">
          <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center shrink-0">
            <span className="text-cyan-600 dark:text-cyan-400 font-black text-lg">₹</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 truncate">CASH10</h4>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-2 break-words">
              10% Cashback into your BusGo Wallet on successful completion of journey.
            </p>
            <button 
              onClick={() => { setPromoCode('CASH10'); setIsApplied(true); }}
              className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Apply Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersCard;
