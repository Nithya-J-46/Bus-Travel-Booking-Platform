import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchSummary from '../components/search/SearchSummary';
import FilterSidebar from '../components/search/FilterSidebar';
import SortBar from '../components/search/SortBar';
import BusCard from '../components/search/BusCard';
import SkeletonCard from '../components/search/SkeletonCard';
import EmptyState from '../components/search/EmptyState';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axios';

// Helpers to map backend data to frontend shape
const mapBackendBusToFrontend = (bus) => {
  const isAc = bus.bus_type.toLowerCase().includes('ac');
  const isSleeper = bus.bus_type.toLowerCase().includes('sleeper');
  const isSeater = bus.bus_type.toLowerCase().includes('seater');
  
  let typeCategory = 'AC Seater';
  if (isAc && isSleeper) typeCategory = 'AC Sleeper';
  if (!isAc && isSleeper) typeCategory = 'Non-AC Sleeper';
  if (!isAc && isSeater) typeCategory = 'Non-AC Seater';
  
  let timeCategory = 'Morning (6 AM - 12 PM)';
  const hour = parseInt(bus.departure_time.split(':')[0]);
  if (hour >= 12 && hour < 18) timeCategory = 'Afternoon (12 PM - 6 PM)';
  else if (hour >= 18 && hour <= 23) timeCategory = 'Evening (6 PM - 12 AM)';
  else if (hour >= 0 && hour < 6) timeCategory = 'Night (12 AM - 6 AM)';

  const formatTime = (timeStr) => {
    const [h, m] = timeStr.split(':');
    return `${h}:${m}`;
  };

  return {
    id: bus.id.toString(),
    operator: bus.operator.name,
    busType: typeCategory,
    seatTypeBadges: [
      isSleeper ? '🛏 Sleeper' : '💺 Seater',
      isAc ? '❄ AC' : '🌬 Non AC'
    ],
    rating: parseFloat(bus.operator.rating),
    ratingText: parseFloat(bus.operator.rating) > 4.5 ? 'Excellent' : 'Very Good',
    reviews: Math.floor(Math.random() * 500) + 100,
    liveTracking: true,
    departureTime: formatTime(bus.departure_time),
    arrivalTime: formatTime(bus.arrival_time),
    isNextDay: parseInt(bus.arrival_time.split(':')[0]) < parseInt(bus.departure_time.split(':')[0]),
    isNightJourney: hour >= 18 || hour < 6,
    duration: bus.route.estimated_duration,
    source: bus.route.source.city,
    boardingPoint: bus.route.source.name,
    destination: bus.route.destination.city,
    droppingPoint: bus.route.destination.name,
    price: parseFloat(bus.base_fare),
    originalPrice: parseFloat(bus.base_fare) * 1.2,
    totalSeats: bus.total_seats,
    seatsAvailable: bus.total_seats - Math.floor(Math.random() * 15),
    windowSeats: 4,
    amenities: ['WiFi', 'Charging Point', 'Water Bottle'],
    offers: ['SAVE20'],
    qualityTags: ['⭐ Premium'],
    cancellationPolicy: '✔ Free Cancellation',
    timeCategory,
    typeCategory
  };
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchData = location.state || {
    fromCity: 'Bangalore',
    toCity: 'Goa',
    travelDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    passengers: 1
  };

  const [isLoading, setIsLoading] = useState(true);
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    busTypes: [],
    amenities: [],
    departureTime: [],
    arrivalTime: [],
    priceRange: [0, 5000],
  });
  
  const [currentSort, setCurrentSort] = useState('price_low');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const busesPerPage = 5;

  // Fetch live API data
  useEffect(() => {
    const fetchBuses = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/bookings/buses/search/?from_city=${searchData.fromCity}&to_city=${searchData.toCity}&date=${searchData.travelDate}`);
        const data = response.data.map(mapBackendBusToFrontend);
        setBuses(data);
        setFilteredBuses(data);
      } catch (error) {
        console.error('Error fetching buses:', error);
        toast.error('Failed to load buses.');
      } finally {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    fetchBuses();
  }, [searchData.fromCity, searchData.toCity, searchData.travelDate]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...buses];

    // Filter by Price
    result = result.filter(bus => bus.price >= filters.priceRange[0] && bus.price <= filters.priceRange[1]);

    // Filter by Bus Type
    if (filters.busTypes.length > 0) {
      result = result.filter(bus => filters.busTypes.includes(bus.typeCategory));
    }

    // Filter by Departure Time
    if (filters.departureTime.length > 0) {
      result = result.filter(bus => filters.departureTime.includes(bus.timeCategory));
    }

    // Filter by Amenities
    if (filters.amenities.length > 0) {
      result = result.filter(bus => 
        filters.amenities.every(amenity => bus.amenities.includes(amenity))
      );
    }

    // Sorting
    switch (currentSort) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'rating_high':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'fastest':
        result.sort((a, b) => {
          const parseTime = (timeStr) => {
            const [h, m] = timeStr.split('h ');
            return parseInt(h) * 60 + parseInt(m);
          };
          return parseTime(a.duration) - parseTime(b.duration);
        });
        break;
      case 'departure_early':
        result.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
      case 'departure_late':
        result.sort((a, b) => b.departureTime.localeCompare(a.departureTime));
        break;
      case 'recommended':
      default:
        // Default sort (original order)
        break;
    }

    setFilteredBuses(result);
    setCurrentPage(1); // Reset pagination on filter/sort change
  }, [filters, currentSort, buses]);

  const handleApplyFilters = () => {
    toast.success('Filters applied successfully');
  };

  const handleViewSeats = (busId) => {
    const selectedBus = buses.find(b => b.id === busId);
    navigate(`/seat-selection/${busId}`, { state: { searchData, bus: selectedBus } });
  };

  // Pagination logic
  const indexOfLastBus = currentPage * busesPerPage;
  const indexOfFirstBus = indexOfLastBus - busesPerPage;
  const currentBuses = filteredBuses.slice(indexOfFirstBus, indexOfLastBus);
  const totalPages = Math.ceil(filteredBuses.length / busesPerPage);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Summary at the top */}
        <SearchSummary searchData={searchData} />

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start relative">
          
          {/* Filter Sidebar */}
          <FilterSidebar 
            isOpen={isMobileFiltersOpen} 
            onClose={() => setIsMobileFiltersOpen(false)} 
            filters={filters}
            setFilters={setFilters}
            onApply={handleApplyFilters}
          />

          {/* Main Content Area */}
          <div className="flex-1 w-full min-w-0">
            
            <SortBar 
              currentSort={currentSort} 
              onSortChange={setCurrentSort}
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
              resultCount={filteredBuses.length}
            />

            {/* Results */}
            <div className="space-y-8">
              {isLoading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : filteredBuses.length > 0 ? (
                <>
                  {currentBuses.map(bus => (
                    <BusCard key={bus.id} bus={bus} onViewSeats={handleViewSeats} />
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-10">
                      <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Prev
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={`w-10 h-10 rounded-xl font-bold transition-colors ${
                              currentPage === idx + 1 
                                ? 'bg-indigo-500 text-white' 
                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>

                      <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <EmptyState onModifySearch={() => navigate('/')} />
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
