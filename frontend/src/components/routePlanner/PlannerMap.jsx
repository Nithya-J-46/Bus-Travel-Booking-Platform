import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const userIcon = createCustomIcon('#6366f1'); // Indigo
const boardingIcon = createCustomIcon('#f43f5e'); // Rose

// Component to handle bounds
const MapBounds = ({ userPos, boardingPos }) => {
  const map = useMap();
  
  useEffect(() => {
    if (userPos && boardingPos) {
      const bounds = L.latLngBounds([userPos, boardingPos]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, userPos, boardingPos]);
  
  return null;
};

const PlannerMap = () => {
  // Mock coordinates
  const boardingPos = [12.9226, 77.6174]; // Madiwala, Bangalore
  const userPos = [12.9352, 77.6245]; // Somewhere nearby (Koramangala)
  
  // Create a curved route between points for visual appeal
  const latDiff = boardingPos[0] - userPos[0];
  const lngDiff = boardingPos[1] - userPos[1];
  const midPoint = [userPos[0] + latDiff/2, userPos[1] + lngDiff/2];
  // Add a slight curve by offsetting the midpoint tangentially
  const curvePoint = [midPoint[0] - lngDiff*0.2, midPoint[1] + latDiff*0.2];
  
  const routePositions = [userPos, curvePoint, boardingPos];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 h-[400px] sm:h-[500px] relative z-0">
      <MapContainer 
        center={midPoint} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        
        <Marker position={userPos} icon={userIcon}>
          <Popup>
            <div className="font-bold text-gray-900">Your Location</div>
          </Popup>
        </Marker>
        
        <Marker position={boardingPos} icon={boardingIcon}>
          <Popup>
            <div className="font-bold text-gray-900">Boarding Point</div>
            <div className="text-xs text-gray-500">Madiwala</div>
          </Popup>
        </Marker>

        <Polyline 
          positions={routePositions} 
          color="#6366f1" 
          weight={4} 
          dashArray="10, 10" 
          opacity={0.8}
        />
        
        <MapBounds userPos={userPos} boardingPos={boardingPos} />
      </MapContainer>
      
      {/* Map Overlay Stats */}
      <div className="absolute top-4 left-4 right-4 z-[400] flex justify-between pointer-events-none">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 pointer-events-auto">
          <p className="text-xs font-bold text-gray-500 dark:text-slate-400">Distance</p>
          <p className="text-lg font-black text-gray-900 dark:text-white">2.4 km</p>
        </div>
        <div className="bg-indigo-600/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-indigo-500 pointer-events-auto text-right">
          <p className="text-xs font-bold text-indigo-100">Est. Time</p>
          <p className="text-lg font-black text-white">12 mins</p>
        </div>
      </div>
      
      <style jsx global>{`
        .leaflet-container {
          background-color: #f1f5f9;
        }
        .dark .map-tiles {
          filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
        }
      `}</style>
    </div>
  );
};

export default PlannerMap;
