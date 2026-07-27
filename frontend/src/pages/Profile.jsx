import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Profile Components
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import PersonalInfoSection from '../components/profile/PersonalInfoSection';
import ContactDetailsSection from '../components/profile/ContactDetailsSection';
import SavedPassengersSection from '../components/profile/SavedPassengersSection';
import PaymentMethodsSection from '../components/profile/PaymentMethodsSection';
import SavedAddressesSection from '../components/profile/SavedAddressesSection';
import NotificationSettingsSection from '../components/profile/NotificationSettingsSection';
import AppearanceSection from '../components/profile/AppearanceSection';
import SecuritySection from '../components/profile/SecuritySection';
import PrivacySection from '../components/profile/PrivacySection';
import StatisticsSection from '../components/profile/StatisticsSection';

// New Sections
import BookingHistorySection from '../components/profile/BookingHistorySection';
import LanguageSection from '../components/profile/LanguageSection';
import CommunityProfileSection from '../components/profile/CommunityProfileSection';
import ReviewsSection from '../components/profile/ReviewsSection';

const Profile = () => {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeSection, setActiveSection] = useState('personal'); // default section

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoSection user={user} updateProfile={updateProfile} />;
      case 'contact':
        return <ContactDetailsSection user={user} updateProfile={updateProfile} />;
      case 'passengers':
        return <SavedPassengersSection />;
      case 'payment':
        return <PaymentMethodsSection />;
      case 'addresses':
        return <SavedAddressesSection />;
      case 'notifications':
        return <NotificationSettingsSection />;
      case 'appearance':
        return <AppearanceSection />;
      case 'security':
        return <SecuritySection changePassword={changePassword} />;
      case 'privacy':
        return <PrivacySection />;
      case 'bookings':
        return <BookingHistorySection />;
      case 'routes':
        return <SavedAddressesSection />; // Reusing Saved Addresses for Routes demo
      case 'community':
        return <CommunityProfileSection />;
      case 'reviews':
        return <ReviewsSection />;
      case 'rewards':
        return <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800"><h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Rewards</h2><p>View your rewards here.</p></div>; // Mock rewards
      case 'language':
        return <LanguageSection />;
      case 'overview':
        return <StatisticsSection />;
      default:
        return <PersonalInfoSection user={user} updateProfile={updateProfile} />;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F5F7FB] dark:bg-slate-950 pt-16 transition-colors duration-300">
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12 relative">
        
        <ProfileHeader user={user} updateProfile={updateProfile} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProfileSidebar 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
                onLogout={handleLogout}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderActiveSection()}
                
                {/* Additional Stats added below main active section for all tabs except some */}
                {(activeSection === 'personal' || activeSection === 'contact' || activeSection === 'security') && (
                  <div className="mt-8">
                    <StatisticsSection />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
