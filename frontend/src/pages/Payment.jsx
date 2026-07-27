import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProgressStepper from '../components/seatSelection/ProgressStepper';
import JourneySummaryCard from '../components/passengerDetails/JourneySummaryCard';
import PaymentMethods from '../components/payment/PaymentMethods';
import PaymentForms from '../components/payment/PaymentForms';
import OffersCard from '../components/payment/OffersCard';
import PaymentSummary from '../components/payment/PaymentSummary';
import axiosInstance from '../api/axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if accessed directly without state
  if (!state || !state.busInfo || !state.selectedSeats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-20">
        <p>Redirecting to home...</p>
      </div>
    );
  }

  const {
    selectedSeats = [],
    busInfo,
    searchData,
    fareDetails,
    passengers = [],
    contactDetails = {}
  } = state;

  const handlePay = async () => {
    setIsProcessing(true);
    
    // Format passengers object into array expected by backend
    const passengersArray = Object.entries(passengers).map(([seat_number, details]) => ({
      name: details.name,
      age: details.age,
      gender: details.gender,
      seat_number
    }));

    try {
      const payload = {
        bus_id: busInfo.id,
        journey_date: searchData.travelDate,
        total_amount: fareDetails.totalAmount,
        payment_status: 'paid', // Simulate success for now
        status: 'upcoming',
        passengers: passengersArray
      };

      const response = await axiosInstance.post('/bookings/bookings/', payload);
      
      toast.success('Payment successful!');
      navigate('/booking-confirmation', {
        state: {
          selectedSeats,
          busInfo,
          searchData,
          fareDetails,
          passengers,
          contactDetails,
          paymentMethod: selectedMethod,
          booking: response.data
        },
        replace: true
      });
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-32 transition-colors duration-300 flex flex-col w-full">
      <div className="w-full max-w-[1400px] mx-auto px-6 flex flex-col gap-8">
        
        <ProgressStepper currentStep={4} />

        <JourneySummaryCard 
          busInfo={busInfo} 
          searchData={searchData} 
          selectedSeats={selectedSeats}
          passengerCount={passengers.length}
        />

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* LEFT COLUMN */}
          <div className="flex-[2] w-full flex flex-col gap-8">
            {/* Payment Methods */}
            <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 w-full">
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">
                Select Payment Method
              </h3>
              <PaymentMethods 
                selectedMethod={selectedMethod} 
                onMethodSelect={setSelectedMethod} 
              />
            </div>

            {/* Dynamic Form */}
            <PaymentForms selectedMethod={selectedMethod} />

            {/* Offers */}
            <OffersCard />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-[1] w-full min-w-[360px] max-w-full lg:max-w-[420px]">
            <PaymentSummary 
              fareDetails={fareDetails}
              passengerCount={passengers.length}
              selectedSeats={selectedSeats}
              onPay={handlePay}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-slate-800 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)] lg:hidden z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-500 dark:text-slate-400">Grand Total</span>
            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
              ₹{fareDetails?.totalAmount?.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="flex-1 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:brightness-110 text-white font-black rounded-xl shadow-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Processing...' : `Pay Securely`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
