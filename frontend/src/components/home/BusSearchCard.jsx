import React, { useState } from 'react';
import { MapPin, Calendar, Users, ArrowRightLeft, Search, ShieldCheck } from 'lucide-react';
import Button from '../Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LocationAutocomplete from '../search/LocationAutocomplete';

const BusSearchCard = ({ onSubmitCallback, buttonText }) => {
  const { t } = useTranslation('home');
  const [fromCity, setFromCity] = useState('Bangalore');
  const [toCity, setToCity] = useState('Goa');
  const [travelDate, setTravelDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // default to tomorrow
    return today.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(1);
  const [busType, setBusType] = useState('AC Sleeper');
  const [isSwapping, setIsSwapping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

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
      const searchData = { fromCity, toCity, travelDate, passengers, busType };
      
      if (onSubmitCallback) {
        onSubmitCallback(searchData);
      } else {
        navigate('/search-results', { state: searchData });
      }
    }, 600);
  };

  return (
    <div id="bus-search" className="relative max-w-6xl mx-auto px-4 -mt-8 sm:-mt-24 z-30 mb-20 select-none">
      
      {/* Outer gradient border card wrapper */}
      <div className="p-[1.5px] rounded-[30px] bg-gradient-to-r from-indigo-500/35 via-cyan-400/25 to-emerald-500/35 shadow-[0_20px_50px_rgba(15,23,42,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.4)] animate-border-glow">
        
        {/* Inner glassmorphic container */}
        <div className="bg-[rgba(255,255,255,0.95)] dark:bg-[#0c111e]/75 backdrop-blur-[16px] dark:backdrop-blur-2xl rounded-[28.5px] p-6 sm:p-8 border border-[#E2E8F0] dark:border-white/5 transition-colors duration-300">
          
          <form onSubmit={handleSearch} className="space-y-6">
            
            {/* Input Row */}
            <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-5 items-center w-full">
              
              {/* From City */}
              <div className="w-full md:w-[calc(50%-1.25rem)] lg:flex-[3] text-left">
                <label className="block text-xs font-extrabold text-indigo-950 dark:text-indigo-300 uppercase tracking-wider mb-2 pl-1.5">
                  {t('search.leaving_from')}
                </label>
                <div className="relative rounded-xl p-[1px] bg-[#CBD5E1] dark:bg-slate-800/80 hover:bg-[#CBD5E1] dark:hover:bg-slate-700 focus-within:bg-[#4F46E5] dark:focus-within:bg-slate-700 transition-all">
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
                <div className="relative rounded-xl p-[1px] bg-[#CBD5E1] dark:bg-slate-800/80 hover:bg-[#CBD5E1] dark:hover:bg-slate-700 focus-within:bg-[#4F46E5] dark:focus-within:bg-slate-700 transition-all">
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
                <div className="relative rounded-xl p-[1px] bg-[#CBD5E1] dark:bg-slate-800/80 hover:bg-[#CBD5E1] dark:hover:bg-slate-700 focus-within:bg-[#4F46E5] dark:focus-within:bg-slate-700 transition-all">
                  <div className="flex items-center bg-[#FFFFFF] dark:bg-slate-950 rounded-[11.5px] px-3.5 py-3 gap-2">
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

              {/* Passengers */}
              <div className="w-full md:w-[calc(33%-1.25rem)] lg:flex-[2] text-left">
                <label className="block text-xs font-extrabold text-indigo-950 dark:text-indigo-300 uppercase tracking-wider mb-2 pl-1.5">
                  {t('search.seats')}
                </label>
                <div className="relative rounded-xl p-[1px] bg-[#CBD5E1] dark:bg-slate-800/80 hover:bg-[#CBD5E1] dark:hover:bg-slate-700 focus-within:bg-[#4F46E5] dark:focus-within:bg-slate-700 transition-all">
                  <div className="flex items-center bg-[#FFFFFF] dark:bg-slate-950 rounded-[11.5px] px-3.5 py-3 gap-2">
                    <Users className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value))}
                      className="flex-1 min-w-0 border-0 bg-transparent text-sm text-slate-900 dark:text-white font-extrabold focus:ring-0 focus:outline-none cursor-pointer pl-1 pr-6 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-right"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num} className="dark:bg-slate-950 text-slate-900 dark:text-white font-bold">
                          {num} {num === 1 ? t('search.seat', 'Seat') : t('search.seats', 'Seats')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Bus Type */}
              <div className="w-full md:w-[calc(33%-1.25rem)] lg:flex-[2.5] text-left">
                <label className="block text-xs font-extrabold text-indigo-950 dark:text-indigo-300 uppercase tracking-wider mb-2 pl-1.5">
                  {t('search.class_type')}
                </label>
                <div className="relative rounded-xl p-[1px] bg-[#CBD5E1] dark:bg-slate-800/80 hover:bg-[#CBD5E1] dark:hover:bg-slate-700 focus-within:bg-[#4F46E5] dark:focus-within:bg-slate-700 transition-all">
                  <div className="flex items-center bg-[#FFFFFF] dark:bg-slate-950 rounded-[11.5px] px-3.5 py-3 gap-1">
                    <select
                      value={busType}
                      onChange={(e) => setBusType(e.target.value)}
                      className="flex-1 min-w-0 border-0 bg-transparent text-sm text-slate-900 dark:text-white font-extrabold focus:ring-0 focus:outline-none cursor-pointer pl-2 pr-6 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-right"
                    >
                      {['AC Sleeper', 'AC Seater', 'Luxury Multi-Axle', 'Non-AC Sleeper', 'Non-AC Seater'].map((type) => (
                        <option key={type} value={type} className="dark:bg-slate-950 text-slate-800 dark:text-white font-semibold">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-900/60 mt-4">
              
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-semibold">{t('search.safe_guarantee')}</span>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                isLoading={isSearching}
                className="w-full sm:w-auto px-10 py-3.5 shadow-[0_8px_30px_rgba(79,70,229,0.4)] dark:shadow-indigo-500/20"
              >
                {buttonText || t('search.search_buses')}
              </Button>
            </div>

          </form>
          
        </div>
      </div>
      
    </div>
  );
};

export default BusSearchCard;
