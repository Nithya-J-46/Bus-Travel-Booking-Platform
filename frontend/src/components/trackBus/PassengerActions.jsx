import React from 'react';
import { Share2, Ticket, LifeBuoy, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import toast from 'react-hot-toast';

const PassengerActions = ({ bookingId }) => {
  const navigate = useNavigate();

  const handleShare = () => {
    toast.success('Live tracking link copied to clipboard!');
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
        Quick Actions
      </h3>

      <div className="flex flex-col gap-3">
        <Button 
          variant="primary" 
          className="w-full py-3 rounded-xl shadow-lg shadow-indigo-500/20"
          onClick={handleShare}
        >
          <span className="flex flex-row items-center justify-center gap-[12px] w-full">
            <Share2 className="w-[22px] h-[22px] shrink-0" />
            <span className="font-medium whitespace-nowrap">Share Live Location</span>
          </span>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full py-3 rounded-xl border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
          onClick={() => navigate(`/ticket/${bookingId}`)}
        >
          <span className="flex flex-row items-center justify-center gap-[12px] w-full">
            <Ticket className="w-[22px] h-[22px] shrink-0" />
            <span className="font-medium whitespace-nowrap">View E-Ticket</span>
          </span>
        </Button>

        <Button 
          variant="outline" 
          className="w-full py-3 rounded-xl border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
        >
          <span className="flex flex-row items-center justify-center gap-[12px] w-full">
            <LifeBuoy className="w-[22px] h-[22px] shrink-0" />
            <span className="font-medium whitespace-nowrap">Help & Support</span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default PassengerActions;
