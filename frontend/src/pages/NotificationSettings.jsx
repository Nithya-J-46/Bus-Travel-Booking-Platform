import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Smartphone, Mail, MessageSquare, Monitor, CheckCircle, XCircle, RefreshCw, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const NOTIFICATION_CATEGORIES = [
  {
    title: 'Booking Notifications',
    items: ['Booking Confirmation', 'Booking Cancellation', 'Booking Modification', 'Refund Updates']
  },
  {
    title: 'Journey Notifications',
    items: ['Journey Reminder (24 hours before)', 'Boarding Reminder (30 minutes before)', 'Bus Arrived', 'Route Changes', 'Delay Alerts', 'Platform Changes']
  },
  {
    title: 'Payment Notifications',
    items: ['Payment Success', 'Payment Failed', 'Refund Status', 'Invoice Generated']
  },
  {
    title: 'Community Notifications',
    items: ['Likes', 'Comments', 'Replies', 'Mentions', 'New Followers']
  },
  {
    title: 'Rewards Notifications',
    items: ['Reward Points Earned', 'Achievement Unlocked', 'Tier Upgrade', 'Redemption Status']
  },
  {
    title: 'Promotional Notifications',
    items: ['Discounts', 'Coupons', 'Festival Offers', 'Referral Offers', 'New Features']
  },
  {
    title: 'System Notifications',
    items: ['Maintenance', 'Security Alerts', 'Account Updates']
  }
];

const CHANNELS = [
  { id: 'push', label: 'Push Notifications', icon: Smartphone },
  { id: 'email', label: 'Email Notifications', icon: Mail },
  { id: 'sms', label: 'SMS Notifications', icon: MessageSquare },
  { id: 'inapp', label: 'In-App Notifications', icon: Monitor }
];

const DEFAULT_PREFERENCES = {
  channels: { push: true, email: true, sms: false, inapp: true },
  events: NOTIFICATION_CATEGORIES.reduce((acc, cat) => {
    cat.items.forEach(item => {
      acc[item] = true;
    });
    return acc;
  }, {})
};

const NotificationSettings = () => {
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('busgo_notification_prefs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({
          channels: { ...DEFAULT_PREFERENCES.channels, ...(parsed.channels || {}) },
          events: { ...DEFAULT_PREFERENCES.events, ...(parsed.events || {}) }
        });
      } catch (e) {
        console.error("Failed to load preferences");
      }
    }
  }, []);

  const handleToggleChannel = (channelId) => {
    setPreferences(prev => ({
      ...prev,
      channels: { ...prev.channels, [channelId]: !prev.channels[channelId] }
    }));
  };

  const handleToggleEvent = (eventName) => {
    setPreferences(prev => ({
      ...prev,
      events: { ...prev.events, [eventName]: !prev.events[eventName] }
    }));
  };

  const handleEnableAll = () => {
    setPreferences({
      channels: { push: true, email: true, sms: true, inapp: true },
      events: NOTIFICATION_CATEGORIES.reduce((acc, cat) => {
        cat.items.forEach(item => { acc[item] = true; });
        return acc;
      }, {})
    });
    toast.success('All notifications enabled');
  };

  const handleDisableAll = () => {
    setPreferences({
      channels: { push: false, email: false, sms: false, inapp: false },
      events: NOTIFICATION_CATEGORIES.reduce((acc, cat) => {
        cat.items.forEach(item => { acc[item] = false; });
        return acc;
      }, {})
    });
    toast.success('All notifications disabled');
  };

  const handleReset = () => {
    setPreferences(DEFAULT_PREFERENCES);
    toast.success('Preferences reset to default');
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('busgo_notification_prefs', JSON.stringify(preferences));
      setIsSaving(false);
      toast.success('Preferences saved successfully!');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <Bell className="w-8 h-8 text-indigo-500" />
              Notification Settings
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Manage how and when you receive updates from BusGo.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button onClick={handleReset} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Reset
            </button>
            <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow-indigo-500/20 transition-all flex items-center gap-2 disabled:opacity-50">
              <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </div>

        {/* Global Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-4 items-center justify-between">
          <div className="text-sm font-medium text-slate-600 dark:text-slate-300">Quick Actions:</div>
          <div className="flex gap-3">
            <button onClick={handleEnableAll} className="px-4 py-2 text-sm font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Enable All
            </button>
            <button onClick={handleDisableAll} className="px-4 py-2 text-sm font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Disable All
            </button>
          </div>
        </div>

        {/* Channels */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            Notification Channels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHANNELS.map(channel => (
              <div key={channel.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <channel.icon className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{channel.label}</span>
                </div>
                <Toggle isChecked={preferences.channels[channel.id]} onToggle={() => handleToggleChannel(channel.id)} />
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NOTIFICATION_CATEGORIES.map((category, idx) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{category.title}</h3>
              <div className="space-y-4">
                {category.items.map(item => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item}</span>
                    <Toggle isChecked={preferences.events[item]} onToggle={() => handleToggleEvent(item)} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

// Simple reusable Toggle switch component
const Toggle = ({ isChecked, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isChecked ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`}
    >
      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isChecked ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  );
};

export default NotificationSettings;
