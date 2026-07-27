import React, { useState } from 'react';
import { Calendar, ArrowRightLeft, Search } from 'lucide-react';
import Button from '../Button';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import LocationAutocomplete from '../search/LocationAutocomplete';

const RouteSearchCard = ({ onSubmitCallback }) => {
  const { t } = useTranslation('home');
  const [fromCity, setFromCity] = useState('Bangalore');
  const [toCity, setToCity] = useState('Goa');
  const [travelDate, setTravelDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // default to tomorrow
    return today.toISOString().split('T')[0];
  });
  const [isSwapping, setIsSwapping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (fromCity === toCity) {
      toast.error(t('search.error_same_city'));
      return;
    }
    setIsSearching(true);
    
    setTimeout(() => {
      setIsSearching(false);
      const searchData = { fromCity, toCity, travelDate, passengers: 1, busType: 'AC Sleeper' };
      if (onSubmitCallback) {
        onSubmitCallback(searchData);
      }
    }, 600);
  };

  return (
    <div className="relative max-w-5xl mx-auto z-30 mb-12 select-none">
      
      {/* Outer gradient border card wrapper */}
      <div className="p-[1.5px] rounded-[30px] bg-gradient-to-r from-indigo-500/35 via-cyan-400/25 to-emerald-500/35 shadow-[0_25px_50px_-12px_rgba(99,102,241,0.25)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.4)] animate-border-glow">
        
        {/* Inner glassmorphic container */}
        <div className="bg-white/70 dark:bg-[#0c111e]/75 backdrop-blur-2xl rounded-[28.5px] p-6 sm:p-8 border border-white/20 dark:border-white/5 transition-colors duration-300">
          
          <form onSubmit={handleSearch} className="space-y-6">
            
            {/* Input Row */}
            <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-5 items-center w-full">
              
              {/* From City */}
              <div className="w-full md:w-[calc(50%-1.25rem)] lg:flex-[3] text-left">
                <label className="block text-xs font-extrabold text-indigo-950 dark:text-indigo-300 uppercase tracking-wider mb-2 pl-1.5">
                  {t('search.leaving_from')}
                </label>
                <div className="relative rounded-xl p-[1px] bg-slate-200 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all">
                  <LocationAutocomplete 
                    value={fromCity}
                    onChange={setFromCity}
                    placeholder="Search city, town, or stop..."
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="w-full md:w-auto flex justify-center mt-2 lg:mt-6 shrink-0">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:text-indigo-550 dark:hover:text-indigo-350 border border-indigo-150/40 dark:border-indigo-900/30 hover:scale-110 active:scale-95 shadow-md active:rotate-180 transition-all duration-300 cursor-pointer"
                  title="Swap Cities"
                >
                  <ArrowRightLeft className={`w-5 h-5 transform transition-transform duration-300 ${isSwapping ? 'rotate-180 scale-105' : ''}`} />
                </button>
              </div>

              {/* To City */}
              <div className="w-full md:w-[calc(50%-1.25rem)] lg:flex-[3] text-left">
                <label className="block text-xs font-extrabold text-indigo-950 dark:text-indigo-300 uppercase tracking-wider mb-2 pl-1.5">
                  {t('search.going_to')}
                </label>
                <div className="relative rounded-xl p-[1px] bg-slate-200 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all">
                  <LocationAutocomplete 
                    value={toCity}
                    onChange={setToCity}
                    placeholder="Search destination..."
                  />
                </div>
              </div>

              {/* Date Input */}
              <div className="w-full md:w-[calc(33%-1.25rem)] lg:flex-[2.5] text-left">
                <label className="block text-xs font-extrabold text-indigo-950 dark:text-indigo-300 uppercase tracking-wider mb-2 pl-1.5">
                  {t('search.journey_date')}
                </label>
                <div className="relative rounded-xl p-[1px] bg-slate-200 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all">
                  <div className="flex items-center bg-white dark:bg-slate-950 rounded-[11.5px] px-3.5 py-3 gap-2">
                    <Calendar className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    <input
                      type="date"
                      value={travelDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full border-0 bg-transparent text-sm text-slate-800 dark:text-white font-semibold focus:ring-0 focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full lg:w-auto mt-4 lg:mt-6 shrink-0 lg:ml-2">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSearching}
                  className="w-full sm:w-auto px-10 py-3.5 shadow-lg shadow-indigo-500/20"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Search Routes
                    </>
                  )}
                </Button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RouteSearchCard;
