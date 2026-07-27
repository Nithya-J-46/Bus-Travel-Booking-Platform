import React from 'react';
import { 
  User, CreditCard, Bell, Shield, Key, Eye, LogOut, 
  MapPin, Heart, Gift, MessageSquare, Star, Globe, 
  Settings, Clock, LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';

const TABS = [
  {
    group: 'Account',
    items: [
      { id: 'personal', label: 'Personal Information', icon: User },
      { id: 'payment', label: 'Payment Methods', icon: CreditCard },
      { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    ]
  },
  {
    group: 'Activity',
    items: [
      { id: 'bookings', label: 'Booking History', icon: Clock },
      { id: 'routes', label: 'Saved Routes', icon: Heart },
      { id: 'community', label: 'Community Profile', icon: MessageSquare },
      { id: 'reviews', label: 'My Reviews', icon: Star },
      { id: 'rewards', label: 'Rewards & Points', icon: Gift },
    ]
  },
  {
    group: 'Settings',
    items: [
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'language', label: 'Language Settings', icon: Globe },
      { id: 'appearance', label: 'Appearance', icon: Eye },
      { id: 'security', label: 'Security & Login', icon: Shield },
      { id: 'privacy', label: 'Privacy & Data', icon: Key },
    ]
  }
];

const ProfileSidebar = ({ activeSection, setActiveSection, onLogout }) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-slate-800">
      
      {/* Overview Button */}
      <div className="mb-6">
        <button
          onClick={() => setActiveSection('overview')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer ${
            activeSection === 'overview'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-gray-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 shrink-0" />
          <span className="font-bold text-sm">Overview</span>
          {activeSection === 'overview' && (
            <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-8 bg-white rounded-r-full" />
          )}
        </button>
      </div>

      <nav className="flex flex-col gap-6">
        {TABS.map((group, idx) => (
          <div key={idx}>
            <h4 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-4">
              {group.group}
            </h4>
            <div className="flex flex-col gap-1">
              {group.items.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all relative cursor-pointer ${
                    activeSection === tab.id
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-gray-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white font-semibold text-sm'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 shrink-0 ${activeSection === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-slate-500'}`} />
                  <span className="text-sm">{tab.label}</span>
                  
                  {/* Indicator Dot */}
                  {activeSection === tab.id && (
                    <motion.div layoutId="activeTabIndicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-r-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-6 mt-2 border-t border-gray-100 dark:border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors font-bold text-sm cursor-pointer"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
