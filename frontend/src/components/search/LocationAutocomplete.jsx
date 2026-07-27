import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Map, Navigation, X, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const POPULAR_DESTINATIONS = [
  'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Goa', 'Hyderabad', 'Kolkata'
];

const LocationAutocomplete = ({ value, onChange, icon: Icon, placeholder }) => {
  const { t } = useTranslation('home');
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const wrapperRef = useRef(null);

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem('busgo_recent_locations');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Sync prop value
  useEffect(() => {
    if (value !== query) {
      setQuery(value);
    }
  }, [value]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        // Reset query to value if user didn't select anything
        if (query !== value) setQuery(value);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [query, value]);

  // Search API (OpenStreetMap Nominatim)
  const searchLocations = async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=in&addressdetails=1&limit=8`
      );
      if (!response.ok) throw new Error('Network error');
      
      const data = await response.json();
      const formattedResults = data.map(item => ({
        id: item.place_id,
        name: item.name || item.display_name.split(',')[0],
        displayName: item.display_name,
        type: item.type,
        state: item.address?.state || ''
      }));
      
      // Filter out duplicate names
      const uniqueNames = new Set();
      const filtered = formattedResults.filter(item => {
        if (uniqueNames.has(item.name)) return false;
        uniqueNames.add(item.name);
        return true;
      });

      setResults(filtered);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== value && isOpen) {
        searchLocations(query);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query, isOpen, value]);

  const handleSelect = (locationName) => {
    setQuery(locationName);
    onChange(locationName);
    setIsOpen(false);
    
    // Add to recent searches
    const updatedRecents = [locationName, ...recentSearches.filter(l => l !== locationName)].slice(0, 5);
    setRecentSearches(updatedRecents);
    localStorage.setItem('busgo_recent_locations', JSON.stringify(updatedRecents));
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'city':
      case 'administrative': return <MapPin className="w-4 h-4 text-indigo-500" />;
      case 'town':
      case 'village': return <Map className="w-4 h-4 text-cyan-500" />;
      default: return <Navigation className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="flex items-center bg-[#FFFFFF] dark:bg-slate-950 rounded-[11.5px] px-3.5 py-3 gap-2 group border border-transparent focus-within:border-indigo-500/50 transition-colors">
        {Icon ? <Icon className="w-5 h-5 flex-shrink-0" /> : <Search className="w-5 h-5 flex-shrink-0" />}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            // Select text on focus for easy typing
            setTimeout(() => document.execCommand('selectAll', false, null), 10);
          }}
          placeholder={placeholder || "Search location..."}
          className="w-full border-0 bg-transparent text-sm text-slate-800 dark:text-white font-semibold focus:ring-0 focus:outline-none placeholder:text-[#64748B] dark:placeholder:text-slate-500 placeholder:font-normal"
        />
        {query && isOpen && (
          <button 
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
              onChange('');
            }}
            className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 overflow-hidden z-[100] transform opacity-100 scale-100 transition-all duration-200 origin-top">
          
          <div className="max-h-[320px] overflow-y-auto overscroll-contain custom-scrollbar">
            
            {/* Searching State */}
            {isSearching && (
              <div className="flex flex-col items-center justify-center p-6 text-slate-500 dark:text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mb-2" />
                <span className="text-xs font-medium">Searching India...</span>
              </div>
            )}

            {/* Results */}
            {!isSearching && query.length >= 2 && results.length > 0 && (
              <div className="p-2">
                <div className="px-3 pb-2 pt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Search Results
                </div>
                {results.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => handleSelect(result.name)}
                    className="w-full flex items-start text-left gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors group cursor-pointer"
                  >
                    <div className="mt-0.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-900 transition-colors">
                      {getIconForType(result.type)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">
                        {result.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {result.displayName}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isSearching && query.length >= 2 && results.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-slate-500 dark:text-slate-400 text-center">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                  <AlertCircle className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No locations found</p>
                <p className="text-xs mt-1">Try checking the spelling or search for a nearby major city.</p>
              </div>
            )}

            {/* Default State: Recent & Popular */}
            {!isSearching && (query.length < 2 || results.length === 0 && query.length === 0) && (
              <div className="p-2">
                
                {recentSearches.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 pb-2 pt-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                      <span>Recent Searches</span>
                      <button 
                        onClick={() => {
                          setRecentSearches([]);
                          localStorage.removeItem('busgo_recent_locations');
                        }}
                        className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                    {recentSearches.map((city, idx) => (
                      <button
                        key={`recent-${idx}`}
                        type="button"
                        onClick={() => handleSelect(city)}
                        className="w-full flex items-center text-left gap-3 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer"
                      >
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{city}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div>
                  <div className="px-3 pb-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Popular Destinations
                  </div>
                  <div className="grid grid-cols-2 gap-1 px-1 pb-1">
                    {POPULAR_DESTINATIONS.map((city) => (
                      <button
                        key={`pop-${city}`}
                        type="button"
                        onClick={() => handleSelect(city)}
                        className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors text-left cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-1">{city}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
