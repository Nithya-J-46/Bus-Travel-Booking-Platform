import React, { useState } from 'react';
import { Bell, Smartphone, Mail, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationSettingsSection = () => {
  const [settings, setSettings] = useState({
    bookingConfirmation: true,
    tripReminder: true,
    offerNotifications: false,
    refundUpdates: true,
    reviewReminder: true,
    email: true,
    sms: false,
    push: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Preference saved automatically.');
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <button 
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${checked ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-slate-700'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-md ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Bell className="w-6 h-6 text-indigo-500" />
        Notification Preferences
      </h2>

      <div className="space-y-8">
        
        {/* Channels */}
        <div>
          <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-slate-800 pb-2">Delivery Channels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-700 dark:text-slate-300">Email</span>
              </div>
              <ToggleSwitch checked={settings.email} onChange={() => toggleSetting('email')} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-700 dark:text-slate-300">SMS</span>
              </div>
              <ToggleSwitch checked={settings.sms} onChange={() => toggleSetting('sms')} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-700 dark:text-slate-300">Push</span>
              </div>
              <ToggleSwitch checked={settings.push} onChange={() => toggleSetting('push')} />
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div>
          <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-slate-800 pb-2">Alert Types</h3>
          <div className="space-y-4">
            
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Booking Confirmations</h4>
                <p className="text-[11px] font-bold text-gray-500">Receive tickets and receipts.</p>
              </div>
              <ToggleSwitch checked={settings.bookingConfirmation} onChange={() => toggleSetting('bookingConfirmation')} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Trip Reminders</h4>
                <p className="text-[11px] font-bold text-gray-500">Get notified 2 hours before departure.</p>
              </div>
              <ToggleSwitch checked={settings.tripReminder} onChange={() => toggleSetting('tripReminder')} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Refund Updates</h4>
                <p className="text-[11px] font-bold text-gray-500">Track cancellation and refund progress.</p>
              </div>
              <ToggleSwitch checked={settings.refundUpdates} onChange={() => toggleSetting('refundUpdates')} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Promotional Offers</h4>
                <p className="text-[11px] font-bold text-gray-500">Exclusive discounts and festive offers.</p>
              </div>
              <ToggleSwitch checked={settings.offerNotifications} onChange={() => toggleSetting('offerNotifications')} />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default NotificationSettingsSection;
