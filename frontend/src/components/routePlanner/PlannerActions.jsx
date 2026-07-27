import React from 'react';
import { Navigation, Share2, Phone, Bus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const PlannerActions = ({ bookingId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800">
      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" className="justify-center shadow-sm" onClick={() => window.open('https://maps.google.com', '_blank')}>
          <Navigation className="w-4 h-4 mr-2 text-indigo-500" />
          Navigate
        </Button>
        <Button variant="secondary" className="justify-center shadow-sm">
          <Share2 className="w-4 h-4 mr-2 text-emerald-500" />
          Share
        </Button>
        <Button variant="secondary" className="justify-center shadow-sm" onClick={() => navigate('/help-center')}>
          <Phone className="w-4 h-4 mr-2 text-amber-500" />
          Call Support
        </Button>
        <Button 
          variant="secondary" 
          className="justify-center shadow-sm"
          onClick={() => navigate(bookingId ? `/track-bus/${bookingId}` : '/my-bookings')}
        >
          <Bus className="w-4 h-4 mr-2 text-cyan-500" />
          Track Bus
        </Button>
      </div>
    </div>
  );
};

export default PlannerActions;
