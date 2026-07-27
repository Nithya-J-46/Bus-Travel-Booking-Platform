import React from 'react';
import { Download, Printer, Share2, Mail, LayoutDashboard, Home, QrCode, Navigation } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../Button';

const ActionButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingState = location.state || {}; // Extract full state to pass forward

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 animate-[fadeInUp_0.5s_ease-out_0.4s_both]">
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group">
          <Download className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          <span className="text-xs font-bold">Download</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group">
          <Printer className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          <span className="text-xs font-bold">Print</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group">
          <Share2 className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          <span className="text-xs font-bold">Share</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group">
          <Mail className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          <span className="text-xs font-bold">Email</span>
        </button>
      </div>

      <div className="space-y-3">
        <Button 
          variant="primary"
          className="w-full py-3.5 rounded-xl text-sm shadow-md"
          onClick={() => {
            const bookingId = 'BKG' + Math.floor(100000 + Math.random() * 900000);
            navigate(`/ticket/${bookingId}`, { state: { booking: bookingState } });
          }}
        >
          <QrCode className="w-4 h-4 mr-2" />
          View E-Ticket
        </Button>
        <Button 
          variant="primary"
          className="w-full py-3.5 rounded-xl text-sm shadow-md bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
          onClick={() => {
            const bookingId = 'BKG' + Math.floor(100000 + Math.random() * 900000);
            navigate(`/track-bus/${bookingId}`, { state: { booking: bookingState } });
          }}
        >
          <Navigation className="w-4 h-4 mr-2" />
          Track Live Location
        </Button>
        <Button 
          variant="outline"
          className="w-full py-3.5 rounded-xl text-sm"
          onClick={() => navigate('/my-bookings')}
        >
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Go to My Bookings
        </Button>
        <Button 
          variant="outline"
          className="w-full py-3.5 rounded-xl text-sm"
          onClick={() => navigate('/')}
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
