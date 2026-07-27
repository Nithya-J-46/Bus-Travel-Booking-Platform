import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../components/myBookings/PageHeader';
import FiltersAndSearch from '../components/myBookings/FiltersAndSearch';
import BookingTabs from '../components/myBookings/BookingTabs';
import BookingCard from '../components/myBookings/BookingCard';
import EmptyState from '../components/myBookings/EmptyState';
import CancelBookingModal from '../components/myBookings/CancelBookingModal';
import RateTripModal from '../components/myBookings/RateTripModal';
import ReviewModal from '../components/reviews/ReviewModal';
import { useReviews } from '../context/ReviewContext';
import ReviewSuccessModal from '../components/myBookings/ReviewSuccessModal';
import axiosInstance from '../api/axios';
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('upcoming');
  
  const [filteredBookings, setFilteredBookings] = useState([]);
  
  // Cancel Modal State
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get('bookings/bookings/');
      
      // Transform backend data to match frontend component structure
      const transformedBookings = response.data.map(b => {
        const bus = b.bus;
        const route = bus.route;
        
        return {
          id: b.booking_id,
          db_id: b.id,
          pnr: `PNR${b.booking_id}`,
          operator: bus.operator.name,
          busType: bus.bus_type.replace(/_/g, ' ').toUpperCase(),
          source: route.source.name,
          destination: route.destination.name,
          date: new Date(b.journey_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          departureTime: bus.departure_time.substring(0, 5),
          arrivalTime: bus.arrival_time.substring(0, 5),
          arrivalDate: new Date(b.journey_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          duration: route.estimated_duration,
          passengers: b.passengers.map(p => ({
            name: p.name, age: p.age, gender: p.gender, seat: p.seat_number
          })),
          seats: b.passengers.map(p => p.seat_number),
          fare: parseFloat(b.total_amount),
          status: b.status,
          bus_id: bus.id
        };
      });
      
      setBookings(transformedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load your bookings.");
    } finally {
      setLoading(false);
    }
  };

  // Rate Trip Modal State
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [bookingToRate, setBookingToRate] = useState(null);

  const { getReviewByBooking } = useReviews();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 1. Filter by Tab
    let result = bookings.filter(booking => booking.status === activeTab);

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(booking => 
        booking.id.toLowerCase().includes(q) ||
        booking.pnr.toLowerCase().includes(q) ||
        booking.operator.toLowerCase().includes(q) ||
        booking.source.toLowerCase().includes(q) ||
        booking.destination.toLowerCase().includes(q)
      );
    }

    // 3. Filter by additional status if not 'all'
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.status === statusFilter);
    }

    // 4. Sort
    result.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.departureTime}`);
      const dateB = new Date(`${b.date} ${b.departureTime}`);
      
      if (sortBy === 'newest') return dateB - dateA;
      if (sortBy === 'oldest') return dateA - dateB;
      if (sortBy === 'upcoming') {
        return dateA - dateB;
      }
      return 0;
    });

    // 5. Attach dynamic review from context
    const withReviews = result.map(b => ({
      ...b,
      review: getReviewByBooking(b.id)
    }));

    setFilteredBookings(withReviews);
  }, [activeTab, searchQuery, statusFilter, sortBy, bookings, getReviewByBooking]);

  const handleOpenCancelModal = (booking) => {
    setBookingToCancel(booking);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancel = async (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    try {
      await axiosInstance.patch(`bookings/bookings/${booking.db_id}/`, { status: 'cancelled' });
      
      setBookings(prev => prev.map(b => {
        if (b.id === bookingId) {
          return {
            ...b,
            status: 'cancelled',
            refundStatus: 'initiated',
            refundAmount: b.fare,
            paymentMethod: 'Original Payment Method',
            refundReference: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
          };
        }
        return b;
      }));
      
      toast.success('Booking cancelled successfully.\nRefund will be processed within 24 hours.', {
        duration: 5000,
        style: { maxWidth: '500px' }
      });
      
      setActiveTab('cancelled');
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking.");
    }
  };

  const handleOpenRateModal = (booking) => {
    setBookingToRate(booking);
    setIsRateModalOpen(true);
  };

  const handleSubmitReview = (bookingId, reviewData) => {
    // Replaced by ReviewContext logic
    setIsRateModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16 transition-colors duration-300">
      <PageHeader />
      
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Main Content Area */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            
            <FiltersAndSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            <BookingTabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />

            {/* Bookings List */}
            <div className="flex flex-col gap-6 pb-20">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : filteredBookings.length > 0 ? (
                filteredBookings.map((booking, index) => (
                  <div 
                    key={`${booking.id}-${booking.status}`} // key updated to trigger animation on status change
                    className="opacity-0 animate-[fadeInUp_0.5s_ease-out_both]"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <BookingCard 
                      booking={booking} 
                      onCancel={() => handleOpenCancelModal(booking)}
                      onRate={() => handleOpenRateModal(booking)}
                    />
                  </div>
                ))
              ) : (
                <EmptyState activeTab={activeTab} />
              )}
            </div>

          </div>
        </div>
      </div>
      
      <CancelBookingModal 
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        booking={bookingToCancel}
      />

      <ReviewModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        booking={bookingToRate}
      />

      <ReviewSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default MyBookings;
