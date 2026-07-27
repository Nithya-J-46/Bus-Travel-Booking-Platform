import React, { useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import ProgressStepper from '../components/seatSelection/ProgressStepper';
import SuccessBanner from '../components/bookingConfirmation/SuccessBanner';
import BookingStatus from '../components/bookingConfirmation/BookingStatus';
import TicketInfo from '../components/bookingConfirmation/TicketInfo';
import QRCodeCard from '../components/bookingConfirmation/QRCodeCard';
import ActionButtons from '../components/bookingConfirmation/ActionButtons';
import ImportantInfo from '../components/bookingConfirmation/ImportantInfo';
import SuggestedActions from '../components/bookingConfirmation/SuggestedActions';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Protect route if no state exists
  if (!state || !state.busInfo || !state.selectedSeats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 pt-20 px-6">
        <div className="bg-white dark:bg-[#111827] p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-800 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-3">Booking Details Unavailable</h2>
          <p className="text-sm font-bold text-gray-500 dark:text-slate-400 mb-8 leading-relaxed">
            We couldn't retrieve your booking information. Please return to your bookings to view the ticket.
          </p>
          <button 
            onClick={() => navigate('/my-bookings')}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:brightness-110 text-white font-black rounded-xl shadow-[0_8px_20px_rgba(99,102,241,0.3)] transition-all duration-300"
          >
            Go to My Bookings
          </button>
        </div>
      </div>
    );
  }

  const {
    selectedSeats = [],
    busInfo,
    searchData,
    fareDetails,
    passengers = [],
    contactDetails = {},
    paymentMethod = 'upi'
  } = state;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-32 transition-colors duration-300 flex flex-col w-full">
      <div className="w-full max-w-[1400px] mx-auto px-6 flex flex-col gap-8">
        
        <ProgressStepper currentStep={5} />

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full mt-4">
          
          {/* LEFT COLUMN - MAIN TICKET (65%) */}
          <div className="flex-[2] w-full flex flex-col gap-8">
            <SuccessBanner />
            <BookingStatus />
            <TicketInfo 
              busInfo={busInfo}
              searchData={searchData}
              passengers={passengers}
              fareDetails={fareDetails}
              selectedSeats={selectedSeats}
            />
          </div>

          {/* RIGHT COLUMN - SIDEBAR (35%) */}
          <div className="flex-[1] w-full min-w-[360px] max-w-full lg:max-w-[420px] flex flex-col gap-8 lg:sticky lg:top-32">
            <QRCodeCard />
            <ActionButtons />
            <ImportantInfo />
            <SuggestedActions />
          </div>

        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-slate-800 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)] lg:hidden z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <button
            onClick={() => navigate('/my-bookings')}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:brightness-110 text-white font-black rounded-xl shadow-lg transition-all duration-300"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
