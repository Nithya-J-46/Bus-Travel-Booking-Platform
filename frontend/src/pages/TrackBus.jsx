import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import MapSection from '../components/trackBus/MapSection';
import LiveStatusCard from '../components/trackBus/LiveStatusCard';
import JourneyTimeline from '../components/trackBus/JourneyTimeline';
import DriverCard from '../components/trackBus/DriverCard';
import BusDetailsCard from '../components/trackBus/BusDetailsCard';
import PassengerActions from '../components/trackBus/PassengerActions';
import LoadingSpinner from '../components/LoadingSpinner';

// Bangalore to Hyderabad simplified route coordinates
const ROUTE = [
  [12.9716, 77.5946], // Bangalore
  [13.1986, 77.6253], // Yelahanka
  [13.6212, 77.5255], // Gauribidanur
  [14.6819, 77.6006], // Anantapur
  [15.8281, 78.0373], // Kurnool
  [16.7381, 78.0068], // Mahbubnagar
  [17.3850, 78.4867]  // Hyderabad
];

// Helper to calculate distance between two coordinates
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
}

const TrackBus = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [distanceRemaining, setDistanceRemaining] = useState(570); // approx distance
  const [eta, setEta] = useState('06:30 AM');
  const [currentStepId, setCurrentStepId] = useState(2);
  const [lastUpdated, setLastUpdated] = useState('Just now');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading tracking data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate movement
  useEffect(() => {
    if (isLoading) return;

    const interval = setInterval(() => {
      setCurrentPositionIndex(prev => {
        // Stop moving if reached destination
        if (prev >= ROUTE.length - 1) return prev;
        
        const nextIndex = prev + 1;
        
        // Update states based on progress
        setSpeed(Math.floor(Math.random() * (85 - 65 + 1) + 65)); // random speed between 65 and 85
        
        const remaining = getDistanceFromLatLonInKm(
          ROUTE[nextIndex][0], ROUTE[nextIndex][1], 
          ROUTE[ROUTE.length - 1][0], ROUTE[ROUTE.length - 1][1]
        );
        setDistanceRemaining(Math.round(remaining));
        
        const time = new Date();
        setLastUpdated(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

        // Map progress to timeline steps
        if (nextIndex === 1) setCurrentStepId(2);
        else if (nextIndex === 3) setCurrentStepId(3);
        else if (nextIndex === 5) setCurrentStepId(4);
        else if (nextIndex === ROUTE.length - 1) {
          setCurrentStepId(5);
          setSpeed(0);
        }

        return nextIndex;
      });
    }, 5000); // move every 5 seconds for simulation purposes

    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F7FB] dark:bg-slate-950 flex justify-center items-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] dark:bg-slate-950 transition-colors duration-300 pb-20">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-slate-800 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-black text-slate-900 dark:text-white">Live Tracking</h1>
              <p className="text-[11px] font-bold text-gray-500 tracking-wider">Booking ID: {bookingId}</p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
            </span>
            <span className="text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-widest">
              Live Connection
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Map and Status */}
          <div className="lg:col-span-8 space-y-8">
            <MapSection 
              routeLine={ROUTE} 
              currentPosition={ROUTE[currentPositionIndex]} 
            />
            
            <LiveStatusCard 
              speed={speed} 
              eta={eta} 
              distanceRemaining={distanceRemaining} 
              lastUpdated={lastUpdated} 
            />
          </div>

          {/* Right Column: Timeline & Info */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            <JourneyTimeline currentStepId={currentStepId} />
            <DriverCard />
            <BusDetailsCard />
            <PassengerActions bookingId={bookingId} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default TrackBus;
