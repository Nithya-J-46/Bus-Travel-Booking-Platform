import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Custom icons
const createCustomIcon = (iconElement) => {
  return L.divIcon({
    html: renderToStaticMarkup(iconElement),
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const busIconHtml = (
  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-indigo-500 relative transition-transform">
    <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping"></div>
    <Navigation className="w-5 h-5 text-indigo-500 relative z-10 -rotate-45" />
  </div>
);

const busIcon = L.divIcon({
  html: renderToStaticMarkup(busIconHtml),
  className: 'bus-marker',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const startIcon = createCustomIcon(
  <div className="w-8 h-8 text-emerald-500 relative flex justify-center drop-shadow-md">
    <MapPin className="w-8 h-8 absolute bottom-0" fill="white" />
    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute bottom-4 border-2 border-white z-10" />
  </div>
);

const endIcon = createCustomIcon(
  <div className="w-8 h-8 text-rose-500 relative flex justify-center drop-shadow-md">
    <MapPin className="w-8 h-8 absolute bottom-0" fill="white" />
    <div className="w-2.5 h-2.5 bg-rose-500 rounded-full absolute bottom-4 border-2 border-white z-10" />
  </div>
);

// MapUpdater component to handle zooming to fit bounds and panning to bus
const MapUpdater = ({ start, end, currentPos }) => {
  const map = useMap();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const bounds = L.latLngBounds([start, end]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
      initialized.current = true;
    }
  }, [map, start, end]);

  useEffect(() => {
    if (initialized.current) {
      map.panTo(currentPos, { animate: true, duration: 1.5 });
    }
  }, [currentPos, map]);

  return null;
};

const MapSection = ({ routeLine, currentPosition }) => {
  if (!routeLine || routeLine.length < 2) return null;

  const startPoint = routeLine[0];
  const endPoint = routeLine[routeLine.length - 1];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 relative h-[400px] sm:h-[500px]">
      
      {/* Global CSS for Leaflet adjustments inside module */}
      <style>{`
        .leaflet-container { width: 100%; height: 100%; z-index: 10; border-radius: 1.5rem; background: #e2e8f0; }
        .dark .leaflet-container { background: #0f172a; filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%); }
        .bus-marker { transition: all 1.5s linear; }
        /* Prevent custom markers from inverting in dark mode */
        .dark .custom-leaflet-icon, .dark .bus-marker { filter: invert(100%) hue-rotate(180deg) brightness(105%) contrast(110%); }
      `}</style>

      <MapContainer
        center={currentPosition}
        zoom={10}
        scrollWheelZoom={true}
        zoomControl={false} // Disable default zoom to add custom positioned one if needed
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <MapUpdater start={startPoint} end={endPoint} currentPos={currentPosition} />

        <Polyline 
          positions={routeLine} 
          color="#6366f1" 
          weight={5} 
          opacity={0.6}
          dashArray="10, 10" 
        />

        {/* Start Point Marker */}
        <Marker position={startPoint} icon={startIcon} />

        {/* End Point Marker */}
        <Marker position={endPoint} icon={endIcon} />

        {/* Current Bus Marker */}
        <Marker position={currentPosition} icon={busIcon} zIndexOffset={1000} />
      </MapContainer>
    </div>
  );
};

export default MapSection;
