import React, { useState } from 'react';
import { MapPin, Navigation, Plus, X } from 'lucide-react';
import Button from '../Button';

const JourneySearchForm = ({ source, setSource, destination, setDestination, waypoints, setWaypoints }) => {
  const [newWaypoint, setNewWaypoint] = useState('');

  const addWaypoint = (e) => {
    e.preventDefault();
    if (newWaypoint.trim() !== '') {
      setWaypoints([...waypoints, { id: Date.now(), name: newWaypoint }]);
      setNewWaypoint('');
    }
  };

  const removeWaypoint = (id) => {
    setWaypoints(waypoints.filter(wp => wp.id !== id));
  };

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Journey Search</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Start Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
            <input 
              type="text" 
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Waypoints List */}
        {waypoints.map((wp, index) => (
          <div key={wp.id} className="relative pl-6">
            <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700"></div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500 absolute -left-0.5 top-1/2 -translate-y-1/2 ring-4 ring-white dark:ring-[#1e293b]" />
              <input 
                type="text" 
                value={wp.name}
                readOnly
                className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-2 px-4 text-sm text-gray-600 dark:text-gray-400"
              />
              <button onClick={() => removeWaypoint(wp.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <form onSubmit={addWaypoint} className="relative">
          <input 
            type="text" 
            placeholder="Add a waypoint..."
            value={newWaypoint}
            onChange={(e) => setNewWaypoint(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-indigo-500 hover:bg-indigo-50 rounded-lg">
            <Plus className="w-5 h-5" />
          </button>
        </form>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Destination</label>
          <div className="relative">
            <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
            <input 
              type="text" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <Button variant="primary" className="w-full mt-2">Plan Route</Button>
      </div>
    </div>
  );
};

export default JourneySearchForm;
