import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, Calendar, Check, ChevronDown } from 'lucide-react';

const CustomSelect = ({ value, onChange, options, icon: Icon, theme = 'indigo' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Theme variants
  const themes = {
    indigo: {
      bg: 'bg-indigo-50/50 dark:bg-indigo-500/5',
      border: 'border-indigo-100 dark:border-indigo-500/20',
      hoverBorder: 'hover:border-indigo-200 dark:hover:border-indigo-500/40',
      text: 'text-indigo-900 dark:text-indigo-300',
      icon: 'text-indigo-500',
      menuBg: 'bg-white dark:bg-[#151C2E]',
      menuBorder: 'border-indigo-100 dark:border-indigo-500/20',
      itemHover: 'hover:bg-indigo-50 dark:hover:bg-indigo-500/10',
      itemSelected: 'text-indigo-600 dark:text-indigo-400 font-bold',
      itemText: 'text-gray-700 dark:text-slate-300',
    },
    cyan: {
      bg: 'bg-cyan-50/50 dark:bg-cyan-500/5',
      border: 'border-cyan-100 dark:border-cyan-500/20',
      hoverBorder: 'hover:border-cyan-200 dark:hover:border-cyan-500/40',
      text: 'text-cyan-900 dark:text-cyan-300',
      icon: 'text-cyan-500',
      menuBg: 'bg-white dark:bg-[#151C2E]',
      menuBorder: 'border-cyan-100 dark:border-cyan-500/20',
      itemHover: 'hover:bg-cyan-50 dark:hover:bg-cyan-500/10',
      itemSelected: 'text-cyan-600 dark:text-cyan-400 font-bold',
      itemText: 'text-gray-700 dark:text-slate-300',
    }
  };

  const currentTheme = themes[theme];
  const selectedOption = options.find(opt => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-auto min-w-[160px]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between pl-10 pr-4 py-3.5 ${currentTheme.bg} ${currentTheme.border} border ${currentTheme.hoverBorder} rounded-xl text-sm font-bold ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-${theme}-500/50 transition-all cursor-pointer`}
      >
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Icon className={`w-4 h-4 ${currentTheme.icon}`} />
        </div>
        <span className="truncate mr-2">{selectedOption.label}</span>
        <ChevronDown className={`w-4 h-4 ${currentTheme.icon} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-2 rounded-[16px] overflow-hidden ${currentTheme.menuBg} border ${currentTheme.menuBorder} shadow-lg shadow-black/5 dark:shadow-black/20 animate-[fadeIn_0.15s_ease-out]`}>
          <div className="py-1.5 flex flex-col">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 flex items-center justify-between ${
                  value === option.value ? currentTheme.itemSelected : currentTheme.itemText
                } ${currentTheme.itemHover}`}
              >
                <span className="truncate">{option.label}</span>
                {value === option.value && <Check className={`w-4 h-4 shrink-0 ${currentTheme.icon}`} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const FiltersAndSearch = ({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter, 
  sortBy, 
  setSortBy 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Sort by: Newest' },
    { value: 'oldest', label: 'Sort by: Oldest' },
    { value: 'upcoming', label: 'Sort by: Upcoming' }
  ];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 animate-[fadeInUp_0.5s_ease-out_0.1s_both]">
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        
        {/* Search Input */}
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500"
            placeholder="Search by Booking ID, PNR, Bus or City..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0">
          <CustomSelect 
            value={statusFilter}
            onChange={setStatusFilter}
            options={statusOptions}
            icon={Filter}
            theme="indigo"
          />

          <CustomSelect 
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
            icon={Calendar}
            theme="cyan"
          />
        </div>

      </div>
    </div>
  );
};

export default FiltersAndSearch;
