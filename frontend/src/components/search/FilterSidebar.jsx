import React from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../Button';

const FilterSidebar = ({ isOpen, onClose, filters, setFilters, onApply }) => {
  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const current = prev[category] || [];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      busTypes: [],
      amenities: [],
      departureTime: [],
      arrivalTime: [],
      priceRange: [0, 5000],
    });
  };

  const CheckboxGroup = ({ title, category, options }) => (
    <div className="mb-8">
      <h4 className="text-sm font-bold text-gray-900 dark:text-slate-200 mb-4">{title}</h4>
      <div className="space-y-3">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={(filters[category] || []).includes(opt)}
                onChange={() => handleCheckboxChange(category, opt)}
              />
              <div className="w-4 h-4 rounded-[4px] border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all flex items-center justify-center group-hover:border-indigo-400">
                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed lg:sticky top-0 lg:top-24 h-full lg:h-[calc(100vh-8rem)] w-72 bg-white dark:bg-[#111827] 
        shadow-2xl lg:shadow-md border-r lg:border border-gray-200 dark:border-slate-800/80 
        lg:rounded-[24px] z-50 lg:z-10 transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Header */}
        <div className="p-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Filters</h3>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Filters */}
        <div className="flex-1 overflow-y-auto p-6 pt-2 no-scrollbar">
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-gray-900 dark:text-slate-200">Price Range</h4>
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Up to ₹{filters.priceRange?.[1] || 5000}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="100"
              value={filters.priceRange?.[1] || 5000}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
              className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <CheckboxGroup 
            title="Departure Time" 
            category="departureTime" 
            options={['Morning (6 AM - 12 PM)', 'Afternoon (12 PM - 6 PM)', 'Evening (6 PM - 12 AM)', 'Night (12 AM - 6 AM)']} 
          />

          <CheckboxGroup 
            title="Bus Type" 
            category="busTypes" 
            options={['AC Sleeper', 'AC Seater', 'Non-AC Sleeper', 'Non-AC Seater', 'Luxury Multi-Axle']} 
          />

          <CheckboxGroup 
            title="Features" 
            category="features" 
            options={['Live GPS', 'Free Cancellation', 'Female Friendly', 'Window Seats']} 
          />

          <CheckboxGroup 
            title="Rating" 
            category="rating" 
            options={['4.5★+', '4.0★+', '3.0★+']} 
          />

          <CheckboxGroup 
            title="Bus Operators" 
            category="operators" 
            options={['VRL Travels', 'SRS Travels', 'IntrCity SmartBus', 'Kallada Travels', 'Orange Tours', 'National Travels', 'KSRTC Airavat', 'Zingbus']} 
          />

          <CheckboxGroup 
            title="Amenities" 
            category="amenities" 
            options={['WiFi', 'Charging Point', 'Blanket', 'Water Bottle', 'TV']} 
          />

        </div>

        {/* Footer actions */}
        <div className="p-6 bg-white dark:bg-[#111827] lg:rounded-b-[24px] flex items-center gap-4">
          <Button variant="secondary" onClick={clearFilters} className="w-1/2 py-2.5 text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Clear</Button>
          <Button variant="primary" onClick={() => { onApply(); onClose(); }} className="w-1/2 py-2.5 text-sm font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 hover:brightness-110">Apply</Button>
        </div>

      </div>
    </>
  );
};

export default FilterSidebar;
