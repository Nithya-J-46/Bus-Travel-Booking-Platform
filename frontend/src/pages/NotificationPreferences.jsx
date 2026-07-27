import React, { useState } from 'react';
import { Bell, Mail, Smartphone, AlertTriangle, ShieldCheck, Bus, Tag, MessageSquare, Save, Ticket, HelpCircle, Gift } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const PreferenceToggle = ({ title, description, icon: Icon, isChecked, onChange }) => (
  <div className="flex items-start justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">{description}</p>
      </div>
    </div>
    
    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
    </label>
  </div>
);

const NotificationPreferences = () => {
  const { preferences, updatePreference } = useNotifications();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call to backend
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Notification preferences saved successfully!');
    }, 1200);
  };

  const handlePushToggle = (checked) => {
    if (checked && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          updatePreference('push', true);
          toast.success('Push notifications enabled');
        } else {
          toast.error('Permission denied. Check browser settings.');
          updatePreference('push', false);
        }
      });
    } else {
      updatePreference('push', false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <Bell className="w-8 h-8 text-indigo-500" /> 
            Notification Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl">
            Choose what you want to be notified about. Some critical system messages cannot be disabled. 
            Your preferences sync across all your devices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Preferences Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Travel Updates */}
            <section>
              <h2 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-4 ml-1">Travel Updates</h2>
              <div className="space-y-3">
                <PreferenceToggle 
                  icon={Ticket}
                  title="Booking Confirmations"
                  description="Receive instant alerts when a ticket is booked or cancelled."
                  isChecked={preferences.bookingUpdates}
                  onChange={(val) => updatePreference('bookingUpdates', val)}
                />
                <PreferenceToggle 
                  icon={AlertTriangle}
                  title="Journey & Traffic Alerts"
                  description="Real-time notifications about delays, boarding point changes, and traffic."
                  isChecked={preferences.trafficAlerts}
                  onChange={(val) => updatePreference('trafficAlerts', val)}
                />
                <PreferenceToggle 
                  icon={Bus}
                  title="Smart Reminders"
                  description="Get pinged 2 hours before departure and 15 mins before boarding."
                  isChecked={preferences.journeyReminders}
                  onChange={(val) => updatePreference('journeyReminders', val)}
                />
              </div>
            </section>

            {/* Promotions & Offers */}
            <section>
              <h2 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-4 ml-1">Offers & Community</h2>
              <div className="space-y-3">
                <PreferenceToggle 
                  icon={Tag}
                  title="Exclusive Offers & Deals"
                  description="Be the first to know about festival discounts and limited-time coupons."
                  isChecked={preferences.offers}
                  onChange={(val) => updatePreference('offers', val)}
                />
                <PreferenceToggle 
                  icon={Gift}
                  title="Reward Points"
                  description="Get notified when you earn BusGo Reward points or when they expire."
                  isChecked={preferences.rewards}
                  onChange={(val) => updatePreference('rewards', val)}
                />
                <PreferenceToggle 
                  icon={MessageSquare}
                  title="Community Activity"
                  description="Alerts for replies, likes, and mentions in the travel community."
                  isChecked={preferences.communityActivity}
                  onChange={(val) => updatePreference('communityActivity', val)}
                />
              </div>
            </section>
          </div>

          {/* Sidebar (Delivery Methods) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 sticky top-24">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6">Delivery Methods</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-indigo-500" />
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">Email</div>
                      <div className="text-xs text-slate-500">Daily digests & alerts</div>
                    </div>
                  </div>
                  <input type="checkbox" className="toggle toggle-primary" checked={preferences.email} onChange={(e) => updatePreference('email', e.target.checked)} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-indigo-500" />
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">Browser Push</div>
                      <div className="text-xs text-slate-500">Real-time web alerts</div>
                    </div>
                  </div>
                  <input type="checkbox" className="toggle toggle-primary" checked={preferences.push} onChange={(e) => handlePushToggle(e.target.checked)} />
                </div>

                <div className="flex items-center justify-between opacity-50 cursor-not-allowed" title="SMS feature available in Pro tier">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-slate-500" />
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">SMS Alerts</div>
                      <div className="text-xs text-slate-500">Text messages</div>
                    </div>
                  </div>
                  <input type="checkbox" className="toggle" disabled />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Button 
                  onClick={handleSave} 
                  isLoading={isSaving} 
                  className="w-full shadow-lg shadow-indigo-500/20"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-500/20 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed font-medium">
                We respect your privacy. You can opt out of promotional communications at any time. Security and payment alerts cannot be disabled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;
