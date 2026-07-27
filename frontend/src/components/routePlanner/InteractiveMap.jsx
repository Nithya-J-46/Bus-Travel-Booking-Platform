import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const createIcon = (color) => {
  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const sourceIcon = createIcon('#10b981'); // Emerald
const destIcon = createIcon('#f43f5e'); // Rose
const waypointIcon = createIcon('#6366f1'); // Indigo

// Component to handle map centering and bounds
const MapBounds = ({ routePoints }) => {
  const map = useMap();
  useEffect(() => {
    if (routePoints && routePoints.length > 0) {
      const bounds = L.latLngBounds(routePoints);
      map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1 });
    }
  }, [map, routePoints]);
  return null;
};

const InteractiveMap = ({ source, destination, waypoints, trafficLevel, activeRoute }) => {
  // Mock coordinates for demonstration
  // In a real app, you would use a geocoding API to convert city names to coordinates
  
  // Base coordinates (Bangalore to Goa)
  const baseStart = [12.9716, 77.5946];
  const baseEnd = [15.2993, 74.1240];
  
  // Generate mock route points based on active route
  const getRoutePoints = () => {
    // Generate a curved path
    const points = [];
    points.push(baseStart);
    
    // Add intermediate points to form a line
    const midPoint1 = [13.5, 76.5];
    const midPoint2 = [14.5, 75.0];
    
    // If it's a scenic route, curve it more towards the coast
    if (activeRoute.type === 'scenic') {
      midPoint1[1] = 75.5; // shift west
      midPoint2[1] = 74.5;
    }
    
    points.push(midPoint1);
    
    // Insert waypoints if any exist (mock placement)
    waypoints.forEach((wp, idx) => {
      points.push([13.8 + (idx * 0.1), 75.8 - (idx * 0.1)]);
    });
    
    points.push(midPoint2);
    points.push(baseEnd);
    
    return points;
  };
  
  const routePoints = getRoutePoints();

  // Determine line color based on traffic level
  const getTrafficColor = () => {
    switch (trafficLevel) {
      case 'Moderate': return '#eab308'; // Yellow
      case 'Heavy': return '#f97316'; // Orange
      case 'Severe': return '#ef4444'; // Red
      default: return '#6366f1'; // Indigo (Low)
    }
  };

  return (
    <div className="w-full h-full min-h-[500px]">
      <MapContainer 
        center={baseStart} 
        zoom={7} 
        scrollWheelZoom={true} 
        className="w-full h-full rounded-b-2xl z-0 relative"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Source Marker */}
        <Marker position={routePoints[0]} icon={sourceIcon}>
          <Popup>Start: {source}</Popup>
        </Marker>
        
        {/* Destination Marker */}
        <Marker position={routePoints[routePoints.length - 1]} icon={destIcon}>
          <Popup>End: {destination}</Popup>
        </Marker>

        {/* Waypoint Markers */}
        {waypoints.map((wp, idx) => (
          <Marker key={wp.id} position={routePoints[idx + 2] || routePoints[1]} icon={waypointIcon}>
            <Popup>Stop: {wp.name}</Popup>
          </Marker>
        ))}

        {/* The Route Polyline */}
        <Polyline 
          positions={routePoints} 
          color={getTrafficColor()} 
          weight={6} 
          opacity={0.8}
          dashArray={trafficLevel === 'Severe' ? "10, 15" : ""}
        />

        <MapBounds routePoints={routePoints} />
      </MapContainer>
      
      {/* Traffic Level Indicator Overlay */}
      <div className="absolute top-4 right-4 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Live Traffic</div>
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              trafficLevel === 'Low' ? 'bg-indigo-400' :
              trafficLevel === 'Moderate' ? 'bg-yellow-400' :
              trafficLevel === 'Heavy' ? 'bg-orange-400' : 'bg-red-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${
              trafficLevel === 'Low' ? 'bg-indigo-500' :
              trafficLevel === 'Moderate' ? 'bg-yellow-500' :
              trafficLevel === 'Heavy' ? 'bg-orange-500' : 'bg-red-500'
            }`}></span>
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">{trafficLevel}</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
