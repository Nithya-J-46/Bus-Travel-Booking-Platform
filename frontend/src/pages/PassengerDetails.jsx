import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import ProgressStepper from '../components/seatSelection/ProgressStepper';
import JourneySummaryCard from '../components/passengerDetails/JourneySummaryCard';
import PassengerForm from '../components/passengerDetails/PassengerForm';
import ContactForm from '../components/passengerDetails/ContactForm';
import PreferencesForm from '../components/passengerDetails/PreferencesForm';
import FareSummaryCard from '../components/passengerDetails/FareSummaryCard';
import { ArrowRight } from 'lucide-react';

const PassengerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract state from location
  const state = location.state;
  const selectedSeats = state?.selectedSeats || [];
  const busInfo = state?.busInfo;
  const searchData = state?.searchData;
  const fareDetails = state?.fareDetails;

  // Initialize passengers state dynamically based on selected seats
  const [passengers, setPassengers] = useState(
    selectedSeats.reduce((acc, seat) => ({ ...acc, [seat]: { name: '', age: '', gender: '' } }), {})
  );

  const [contactDetails, setContactDetails] = useState({ email: '', phone: '', emergencyPhone: '' });
  
  const [preferences, setPreferences] = useState({
    emailUpdates: true,
    smsUpdates: true,
    insurance: false,
    gstInvoice: false,
    gstNumber: '',
    companyName: ''
  });

  const [errors, setErrors] = useState({ passengers: {}, contact: {}, preferences: {} });
  const [isValidating, setIsValidating] = useState(false);

  // If directly accessed without state, redirect to home
  if (!state || !busInfo || selectedSeats.length === 0) {
    return <Navigate to="/" replace />;
  }

  const handlePassengerChange = (seatId, field, value) => {
    setPassengers(prev => ({
      ...prev,
      [seatId]: { ...prev[seatId], [field]: value }
    }));
    // Clear error for this field
    if (errors.passengers[seatId]?.[field]) {
      setErrors(prev => ({
        ...prev,
        passengers: {
          ...prev.passengers,
          [seatId]: { ...prev.passengers[seatId], [field]: null }
        }
      }));
    }
  };

  const handleContactChange = (field, value) => {
    setContactDetails(prev => ({ ...prev, [field]: value }));
    if (errors.contact[field]) {
      setErrors(prev => ({ ...prev, contact: { ...prev.contact, [field]: null } }));
    }
  };

  const handlePreferencesChange = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
    if (errors.preferences[field]) {
      setErrors(prev => ({ ...prev, preferences: { ...prev.preferences, [field]: null } }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { passengers: {}, contact: {}, preferences: {} };

    // Validate Passengers
    Object.keys(passengers).forEach(seatId => {
      const p = passengers[seatId];
      newErrors.passengers[seatId] = {};
      
      if (!p.name || p.name.trim().length < 3) {
        newErrors.passengers[seatId].name = "Name must be at least 3 characters";
        isValid = false;
      }
      
      if (!p.age || isNaN(p.age) || parseInt(p.age) < 1 || parseInt(p.age) > 120) {
        newErrors.passengers[seatId].age = "Age must be between 1 and 120";
        isValid = false;
      }
      
      if (!p.gender) {
        newErrors.passengers[seatId].gender = "Please select gender";
        isValid = false;
      }
    });

    // Validate Contact Details
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactDetails.email || !emailRegex.test(contactDetails.email)) {
      newErrors.contact.email = "Valid email is required";
      isValid = false;
    }

    if (!contactDetails.phone || contactDetails.phone.length !== 10) {
      newErrors.contact.phone = "Valid 10-digit mobile number is required";
      isValid = false;
    }

    if (contactDetails.emergencyPhone && contactDetails.emergencyPhone.length !== 10) {
      newErrors.contact.emergencyPhone = "Emergency number must be 10 digits";
      isValid = false;
    }

    // Validate Preferences (GST)
    if (preferences.gstInvoice) {
      if (!preferences.gstNumber || preferences.gstNumber.length !== 15) {
        newErrors.preferences.gstNumber = "Valid 15-character GSTIN is required";
        isValid = false;
      }
      if (!preferences.companyName || preferences.companyName.trim().length < 2) {
        newErrors.preferences.companyName = "Company name is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    
    if (!isValid) {
      // Scroll to top or first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    return isValid;
  };

  const handleSubmit = (finalFareBreakdown) => {
    setIsValidating(true);
    
    if (validateForm()) {
      // Simulate API call delay for premium feel
      setTimeout(() => {
        navigate('/payment', {
          state: {
            ...state,
            passengers,
            contactDetails,
            preferences,
            finalFareBreakdown
          }
        });
      }, 800);
    } else {
      setIsValidating(false);
    }
  };

  // Dynamic additions to show on mobile sticky footer
  const seatCount = selectedSeats.length;
  const insuranceFee = preferences.insurance ? seatCount * 15 : 0;
  const baseGst = fareDetails?.gst || 0;
  const totalGst = baseGst + (insuranceFee * 0.18);
  const grandTotal = (fareDetails?.baseFare || 0) + (fareDetails?.convenienceFee || 0) + insuranceFee + totalGst - (fareDetails?.discount || 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-32 xl:pb-12 transition-colors duration-300 flex flex-col">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-10">
        
        <ProgressStepper currentStep={3} />
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start w-full">
          
          {/* Left Side (Forms) - 70% */}
          <div className="xl:col-span-8 flex flex-col w-full">
            <JourneySummaryCard 
              busInfo={busInfo} 
              searchData={searchData} 
              selectedSeats={selectedSeats} 
              fareDetails={fareDetails} 
            />
            
            {/* Passengers Loop */}
            {selectedSeats.map(seat => (
              <PassengerForm 
                key={seat} 
                seatId={seat} 
                passenger={passengers[seat]} 
                onChange={(field, val) => handlePassengerChange(seat, field, val)} 
                errors={errors.passengers[seat]}
              />
            ))}
            
            <ContactForm 
              contactDetails={contactDetails} 
              onChange={handleContactChange} 
              errors={errors.contact}
            />
            
            <PreferencesForm 
              preferences={preferences} 
              onChange={handlePreferencesChange} 
              errors={errors.preferences}
            />
          </div>

          {/* Right Side (Fare Summary Sidebar) - 30% */}
          <div className="xl:col-span-4 w-full h-full relative">
            <FareSummaryCard 
              selectedSeats={selectedSeats}
              fareDetails={fareDetails}
              preferences={preferences}
              onSubmit={handleSubmit}
              isValidating={isValidating}
            />
          </div>
          
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-slate-800 p-4 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] xl:hidden z-50 animate-in slide-in-from-bottom-full duration-500">
        <div className="flex items-center justify-between max-w-4xl mx-auto gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-gray-500">{selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'}</span>
              <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-600"></div>
              <span className="text-[10px] uppercase font-bold text-emerald-500 dark:text-emerald-400 cursor-pointer hover:underline">View Breakdown</span>
            </div>
            <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5 leading-none">
              ₹{grandTotal.toFixed(2)}
            </span>
          </div>
          <button 
            onClick={() => handleSubmit({ grandTotal, insuranceFee, totalGst })}
            disabled={isValidating}
            className="flex-1 max-w-[200px] bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 group"
          >
            <span className="truncate">{isValidating ? 'Validating...' : 'Continue'}</span>
            {!isValidating && <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default PassengerDetails;
