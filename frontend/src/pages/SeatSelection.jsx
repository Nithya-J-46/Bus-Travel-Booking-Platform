import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import BusInfoCard from '../components/seatSelection/BusInfoCard';
import SeatGrid from '../components/seatSelection/SeatGrid';
import SeatLegend from '../components/seatSelection/SeatLegend';
import BookingSummary from '../components/seatSelection/BookingSummary';
import ProgressStepper from '../components/seatSelection/ProgressStepper';

// --- DUMMY DATA GENERATORS ---

const generateSeaterLayout = () => {
  const leftRows = [];
  const rightRows = [];
  const totalRows = 10;
  
  for (let i = 1; i <= totalRows; i++) {
    leftRows.push([`A${i}`, `B${i}`]);
    rightRows.push([`C${i}`, `D${i}`]);
  }
  
  return {
    type: 'seater',
    deckData: {
      leftRows,
      rightRows,
      rearRow: ['E1', 'E2', 'E3', 'E4', 'E5']
    }
  };
};

const generateSleeperLayout = () => {
  const generateRows = (prefix) => {
    const leftRows = [];
    const rightRows = [];
    for (let i = 1; i <= 6; i++) {
      leftRows.push([`${prefix}1${i}`]);
      rightRows.push([`${prefix}2${i}`, `${prefix}3${i}`]);
    }
    return { leftRows, rightRows, rearRow: [] };
  };

  return {
    type: 'sleeper',
    lowerDeck: generateRows('L'),
    upperDeck: generateRows('U')
  };
};

// Remove mock generator


// --- MAIN COMPONENT ---

const SeatSelection = () => {
  const { busId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [bus, setBus] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [layout, setLayout] = useState(null);
  const [seatStatuses, setSeatStatuses] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const [activeDeck, setActiveDeck] = useState('lower'); // Only for sleeper

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real app, if location.state is missing, fetch bus details using busId from API.
    if (!location.state?.bus) {
      toast.error("Bus details not found. Please search again.");
      navigate('/');
      return;
    }
    
    const busInfo = location.state.bus;
    setBus(busInfo);
    setSearchData(location.state.searchData);

    const isSleeper = busInfo.busType.toLowerCase().includes('sleeper');
    const generatedLayout = isSleeper ? generateSleeperLayout() : generateSeaterLayout();
    
    setLayout(generatedLayout);
    
    const fetchSeatStatus = async () => {
      try {
        const response = await axiosInstance.get(`/bookings/buses/${busId}/seats/?date=${location.state.searchData.travelDate}`);
        const booked = response.data.booked_seats;
        
        const statuses = {};
        const allSeats = [];
        
        if (generatedLayout.type === 'seater') {
          generatedLayout.deckData.leftRows.flat().forEach(s => allSeats.push(s));
          generatedLayout.deckData.rightRows.flat().forEach(s => allSeats.push(s));
          if (generatedLayout.deckData.rearRow) allSeats.push(...generatedLayout.deckData.rearRow);
        } else {
          ['lowerDeck', 'upperDeck'].forEach(deck => {
            generatedLayout[deck].leftRows.flat().forEach(s => allSeats.push(s));
            generatedLayout[deck].rightRows.flat().forEach(s => allSeats.push(s));
          });
        }
        
        allSeats.forEach(seatId => {
          statuses[seatId] = booked.includes(seatId) ? 'booked' : 'available';
        });
        
        setSeatStatuses(statuses);
      } catch (error) {
        toast.error("Failed to load seat availability.");
      }
    };
    
    fetchSeatStatus();
    
  }, [location.state, navigate, busId]);

  const handleSeatClick = (seatId) => {
    const status = seatStatuses[seatId];
    if (status === 'booked') return;

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId); // Deselect
      } else {
        if (prev.length >= 6) {
          toast.error("You can only select up to 6 seats.");
          return prev;
        }
        return [...prev, seatId]; // Select
      }
    });
  };

  const getComputedSeatStatus = (seatId) => {
    if (selectedSeats.includes(seatId)) return 'selected';
    return seatStatuses[seatId] || 'available';
  };

  if (!bus || !layout) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center pt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-24 xl:pb-12 transition-colors duration-300 flex flex-col">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-10">
        
        <ProgressStepper />
        
        <BusInfoCard bus={bus} searchData={searchData} />

        <div className="w-full flex justify-center">
          <SeatLegend />
        </div>

        {/* Deck Toggle for Sleeper (Premium Segmented Control) */}
        {layout.type === 'sleeper' && (
          <div className="flex justify-center w-full">
            <div className="relative flex items-center bg-white dark:bg-[#111827] border border-gray-200 dark:border-slate-700 p-1.5 rounded-full shadow-sm w-[340px]">
              {/* Sliding Background Indicator */}
              <div 
                className={`absolute inset-y-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full shadow-md transition-transform duration-300 ease-out`}
                style={{
                  transform: activeDeck === 'lower' ? 'translateX(0)' : 'translateX(100%)'
                }}
              />
              
              {/* Buttons */}
              <button
                onClick={() => setActiveDeck('lower')}
                className={`relative z-10 flex-1 py-3 text-[15px] font-bold transition-colors duration-300 rounded-full ${
                  activeDeck === 'lower' ? 'text-white' : 'text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-300'
                }`}
              >
                Lower Deck
              </button>
              <button
                onClick={() => setActiveDeck('upper')}
                className={`relative z-10 flex-1 py-3 text-[15px] font-bold transition-colors duration-300 rounded-full ${
                  activeDeck === 'upper' ? 'text-white' : 'text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-300'
                }`}
              >
                Upper Deck
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start w-full pb-20">
          
          {/* Left Area: Seat Layout */}
          <div className="w-full xl:col-span-8 flex flex-col items-center justify-center">
            <div className="w-full overflow-x-auto pb-4 no-scrollbar flex justify-center">
              <SeatGrid 
                deckData={layout.type === 'seater' ? layout.deckData : (activeDeck === 'lower' ? layout.lowerDeck : layout.upperDeck)} 
                seatType={layout.type}
                onSeatClick={handleSeatClick}
                getSeatStatus={getComputedSeatStatus}
              />
            </div>
          </div>

          {/* Right Area: Booking Summary */}
          <div className="w-full xl:col-span-4 relative">
            <BookingSummary 
              selectedSeats={selectedSeats} 
              pricePerSeat={bus.price} 
              busInfo={bus} 
              searchData={searchData} 
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default SeatSelection;
