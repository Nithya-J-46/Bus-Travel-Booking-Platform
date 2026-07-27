import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, MapPin, Navigation, Bus, Clock, IndianRupee, ShieldCheck, Activity, Maximize, ZoomIn, ZoomOut, RotateCcw, AlertTriangle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

// Fix Leaflet's default icon path issues with Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for Source (Green) and Destination (Red)
const sourceIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #10b981; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const destIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #ef4444; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

// City Coordinate Dictionary
const CITIES = {
  'Bangalore': [12.9716, 77.5946],
  'Mumbai': [19.0760, 72.8777],
  'Delhi': [28.7041, 77.1025],
  'Chennai': [13.0827, 80.2707],
  'Hyderabad': [17.3850, 78.4867],
  'Goa': [15.2993, 74.1240],
  'Pune': [18.5204, 73.8567],
  'Kolkata': [22.5726, 88.3639],
  'Ahmedabad': [23.0225, 72.5714],
  'Jaipur': [26.9124, 75.7873],
  'Surat': [21.1702, 72.8311],
  'Lucknow': [26.8467, 80.9462],
  'Kanpur': [26.4499, 80.3319],
  'Nagpur': [21.1458, 79.0882],
  'Indore': [22.7196, 75.8577],
  'Coimbatore': [11.0168, 76.9558],
  'Vijayawada': [16.5062, 80.6480],
  'Madurai': [9.9252, 78.1198],
  'Manali': [32.2396, 77.1887],
  'Ooty': [11.4102, 76.6950],
  'Munnar': [10.0892, 77.0597]
};

const getCityCoords = (cityName) => {
  if (!cityName) return null;
  const match = Object.keys(CITIES).find(c => cityName.toLowerCase().includes(c.toLowerCase()));
  return match ? CITIES[match] : null;
};

// Map View Auto-fitter
const MapAutoFitter = ({ routeLines, source, dest }) => {
  const map = useMap();
  useEffect(() => {
    if (routeLines && routeLines.length > 0) {
      // Fit to polyline bounds
      const bounds = L.latLngBounds(routeLines[0]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10, animate: true, duration: 1.5 });
    } else if (source && dest) {
      // Fallback to straight line bounds
      const bounds = L.latLngBounds([source, dest]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8, animate: true, duration: 1.5 });
    } else if (source) {
      map.setView(source, 10);
    } else if (dest) {
      map.setView(dest, 10);
    } else {
      map.setView([20.5937, 78.9629], 5); // India center
    }
  }, [routeLines, source, dest, map]);
  return null;
};

const CustomControls = () => {
  const map = useMap();
  return (
    <div className="absolute right-4 bottom-4 z-[400] flex flex-col gap-2">
      <button onClick={() => map.zoomIn()} className="p-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
        <ZoomIn className="w-5 h-5" />
      </button>
      <button onClick={() => map.zoomOut()} className="p-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
        <ZoomOut className="w-5 h-5" />
      </button>
      <button onClick={() => map.setView([20.5937, 78.9629], 5)} className="p-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
};

const InteractiveRouteMap = ({ searchedRoute }) => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  
  const [routePaths, setRoutePaths] = useState([]); // array of coordinate arrays [ [lat,lng], ... ]
  const [routeStats, setRouteStats] = useState(null); // { distance: km, duration: "Hh Mm" }
  const [isFetchingRoute, setIsFetchingRoute] = useState(false);
  const [routeError, setRouteError] = useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  const sourceCoords = searchedRoute ? getCityCoords(searchedRoute.fromCity) || [12.9716, 77.5946] : null;
  const destCoords = searchedRoute ? getCityCoords(searchedRoute.toCity) || [15.2993, 74.1240] : null;

  // Fetch actual road route from OSRM
  useEffect(() => {
    if (!sourceCoords || !destCoords) return;

    const fetchRoute = async () => {
      setIsFetchingRoute(true);
      setRouteError(false);
      setRoutePaths([]);
      
      try {
        // OSRM requires Longitude,Latitude order
        const srcLng = sourceCoords[1];
        const srcLat = sourceCoords[0];
        const destLng = destCoords[1];
        const destLat = destCoords[0];

        const url = `https://router.project-osrm.org/route/v1/driving/${srcLng},${srcLat};${destLng},${destLat}?overview=full&geometries=geojson&alternatives=true`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch route");
        
        const data = await response.json();
        
        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          // Parse all returned alternative routes
          const paths = data.routes.map(route => {
            // GeoJSON returns [lng, lat], Leaflet needs [lat, lng]
            return route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
          });
          setRoutePaths(paths);
          
          // Use the primary route for stats
          const primaryRoute = data.routes[0];
          const distKm = (primaryRoute.distance / 1000).toFixed(0);
          const durationMins = Math.floor(primaryRoute.duration / 60);
          const hours = Math.floor(durationMins / 60);
          const mins = durationMins % 60;
          
          setRouteStats({
            distance: distKm,
            duration: `${hours}h ${mins}m`
          });
          setSelectedRouteIndex(0);
        } else {
          setRouteError(true);
        }
      } catch (err) {
        console.error("OSRM Routing Error:", err);
        setRouteError(true);
      } finally {
        setIsFetchingRoute(false);
      }
    };

    fetchRoute();
  }, [sourceCoords, destCoords]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Fullscreen Error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <section ref={containerRef} className={`bg-white dark:bg-[#0c111e] rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100 dark:border-slate-800/80 relative overflow-hidden transition-all duration-300 ${isFullscreen ? 'h-screen w-screen rounded-none fixed inset-0 z-50 p-4 md:p-6' : ''}`}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 relative z-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Map className="w-6 h-6 text-indigo-500" />
            Live Route Explorer
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            View precise highway routes and travel times between major hubs.
          </p>
        </div>
        <button 
          onClick={toggleFullscreen}
          className="mt-4 md:mt-0 p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Toggle Fullscreen"
        >
          <Maximize className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        
        {/* Map Container */}
        <div className={`relative w-full ${searchedRoute && !isFullscreen ? 'lg:w-2/3 h-[550px]' : isFullscreen ? 'h-[calc(100vh-140px)]' : 'h-[550px]'} bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-inner transition-all duration-300`}>
          
          <MapContainer 
            center={[20.5937, 78.9629]} 
            zoom={5} 
            zoomControl={false}
            className="w-full h-full z-10"
            style={{ background: 'transparent' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
              className="map-tiles"
            />
            
            <MapAutoFitter routeLines={routePaths} source={sourceCoords} dest={destCoords} />
            <CustomControls />

            {/* Default Markers (if no search) */}
            {!searchedRoute && Object.entries(CITIES).slice(0, 10).map(([city, coords]) => (
              <Marker key={city} position={coords} icon={sourceIcon} />
            ))}

            {/* Source & Destination Markers */}
            {searchedRoute && sourceCoords && destCoords && (
              <>
                <Marker position={sourceCoords} icon={sourceIcon} />
                <Marker position={destCoords} icon={destIcon} />
                
                {/* Fallback Straight Line (if route error or fetching) */}
                {(routeError || (isFetchingRoute && routePaths.length === 0)) && (
                  <Polyline 
                    positions={[sourceCoords, destCoords]} 
                    pathOptions={{ color: '#6366f1', weight: 4, dashArray: '10, 10', className: 'animate-dash' }}
                  />
                )}

                {/* Real Road Routes */}
                {!isFetchingRoute && routePaths.map((path, idx) => (
                  <Polyline 
                    key={idx}
                    positions={path} 
                    eventHandlers={{ click: () => setSelectedRouteIndex(idx) }}
                    pathOptions={{ 
                      color: idx === selectedRouteIndex ? '#ef4444' : '#64748b', 
                      weight: idx === selectedRouteIndex ? 5 : 3, 
                      opacity: idx === selectedRouteIndex ? 1 : 0.6,
                      className: idx === selectedRouteIndex ? 'animate-route' : 'cursor-pointer hover:stroke-indigo-400'
                    }}
                  />
                ))}
              </>
            )}
          </MapContainer>
          
          {/* Status Overlay */}
          <AnimatePresence>
            {isFetchingRoute && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute top-4 left-4 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                Calculating Route...
              </motion.div>
            )}
            {routeError && !isFetchingRoute && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute top-4 left-4 z-[400] bg-red-50 dark:bg-red-900/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-red-200 dark:border-red-800 flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-200">
                <AlertTriangle className="w-4 h-4" />
                No direct road route found. Showing direct path.
              </motion.div>
            )}
          </AnimatePresence>

          <style>{`
            .dark .map-tiles {
              filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
            }
            .animate-dash {
              animation: dash 20s linear infinite;
            }
            .animate-route {
              stroke-dasharray: 1000;
              stroke-dashoffset: 1000;
              animation: drawRoute 2s ease-out forwards;
            }
            @keyframes drawRoute {
              to { stroke-dashoffset: 0; }
            }
            @keyframes dash {
              to { stroke-dashoffset: -1000; }
            }
            .leaflet-container { font-family: inherit; }
          `}</style>
        </div>

        {/* Side Panel: Route Insights */}
        <AnimatePresence>
          {searchedRoute && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`w-full lg:w-1/3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 flex flex-col overflow-y-auto ${isFullscreen ? 'max-h-[calc(100vh-140px)]' : 'max-h-[550px]'}`}
            >
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700/50">
                <div className="flex flex-col items-center justify-center gap-1 w-10 shrink-0">
                  <div className="w-4 h-4 rounded-full border-4 border-emerald-500 bg-white" />
                  <div className="w-1 h-8 bg-slate-300 dark:bg-slate-700 rounded-full" />
                  <div className="w-4 h-4 rounded-full border-4 border-red-500 bg-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-4">{searchedRoute.fromCity}</h3>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{searchedRoute.toCity}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                  <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">Total Distance</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {routeStats ? `${routeStats.distance} km` : 'Calculating...'}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                  <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">Est. Travel Time</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500" /> 
                    {routeStats ? routeStats.duration : 'Calculating...'}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                  <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">Route Type</div>
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-1">
                    <Activity className="w-4 h-4" /> Recommended
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-700/50 shadow-sm">
                  <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">Starting Fare</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-indigo-500" /> {Math.floor(Math.random() * 500 + 400)}
                  </div>
                </div>
              </div>

              {routePaths.length > 1 && (
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-3 flex gap-2 overflow-x-auto no-scrollbar mb-6">
                  {routePaths.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setSelectedRouteIndex(idx)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${idx === selectedRouteIndex ? 'bg-red-500 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`}
                    >
                      {idx === 0 ? 'Fastest Route' : `Alternative ${idx}`}
                    </button>
                  ))}
                </div>
              )}

              <div className="bg-indigo-50 dark:bg-indigo-500/5 rounded-xl p-4 flex gap-3 items-start border border-indigo-100 dark:border-indigo-500/10 mb-auto">
                <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300">Verified Operators</h4>
                  <p className="text-xs text-indigo-700/80 dark:text-indigo-300/70 mt-1 leading-relaxed">
                    IntrCity SmartBus, SRS Travels, VRL Travels, and multiple others operate {routeStats ? `this ${routeStats.distance}km` : 'this'} journey daily.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                <Button
                  variant="primary"
                  className="w-full py-4 text-sm font-bold shadow-[0_4px_20px_rgba(99,102,241,0.35)]"
                  onClick={() => navigate('/search-results', { state: searchedRoute })}
                >
                  View Available Buses
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveRouteMap;
