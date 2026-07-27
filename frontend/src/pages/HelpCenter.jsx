import React from 'react';
import HelpHero from '../components/help/HelpHero';
import QuickCategories from '../components/help/QuickCategories';
import FAQAccordion from '../components/help/FAQAccordion';
import SupportTicket from '../components/help/SupportTicket';
import EmergencyContacts from '../components/help/EmergencyContacts';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FB] dark:bg-[#0b0f19] py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Search */}
        <HelpHero />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2">
            <QuickCategories />
            <FAQAccordion />
            <SupportTicket />
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            <EmergencyContacts />
            
            {/* Promo / Banner Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-3xl p-6 shadow-xl text-white text-center">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-black mb-2">Try our AI Assistant!</h3>
              <p className="text-sm font-medium text-indigo-100 mb-6">
                Get instant answers to your travel questions, 24/7. No waiting in line!
              </p>
              <p className="text-xs font-bold text-white/70 uppercase tracking-wider">
                Click the chat bubble below ↓
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
