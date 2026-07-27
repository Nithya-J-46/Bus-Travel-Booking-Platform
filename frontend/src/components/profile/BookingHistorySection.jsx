import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import BookingCard from '../myBookings/BookingCard';

// Dummy Bookings just for profile display demonstration
const MOCK_PROFILE_BOOKINGS = [
  {
    id: "BGO-8X9Y2Z",
    date: "2026-08-15",
    departureTime: "22:30",
    arrivalTime: "06:15",
    from: "Bangalore",
    to: "Hyderabad",
    busOperator: "SRS Travels",
    busType: "Volvo Multi-Axle A/C Semi Sleeper",
    status: "upcoming",
    seats: ["L12", "L13"],
    amount: 1850,
  },
  {
    id: "BGO-3A4B5C",
    date: "2026-07-10",
    departureTime: "21:00",
    arrivalTime: "05:30",
    from: "Chennai",
    to: "Bangalore",
    busOperator: "IntrCity SmartBus",
    busType: "A/C Sleeper (2+1)",
    status: "completed",
    seats: ["U4"],
    amount: 1100,
  }
];

const BookingHistorySection = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredBookings = MOCK_PROFILE_BOOKINGS.filter(b => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-indigo-500" />
          Booking History
        </h2>
        
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
          {['all', 'upcoming', 'completed', 'cancelled'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              onCancel={() => {}} 
              onTrack={() => {}} 
              onRate={() => {}} 
            />
          ))
        ) : (
          <div className="py-12 text-center text-slate-500 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            No {activeTab !== 'all' ? activeTab : ''} bookings found.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistorySection;
