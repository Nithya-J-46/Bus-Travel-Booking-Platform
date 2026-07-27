import React from 'react';
import { Shield, Eye, Bell, Activity, Download, Lock, Trash2, ShieldAlert } from 'lucide-react';
import Button from '../Button';
import toast from 'react-hot-toast';

const PrivacySection = () => {
  const handleDownload = () => {
    toast.success('Your data archive is being generated. You will receive an email shortly.');
  };

  const handleDelete = () => {
    toast.error('Account deletion is disabled in demo mode.');
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Lock className="w-6 h-6 text-indigo-500" />
        Privacy & Data
      </h2>

      <div className="space-y-6">
        
        {/* Data Download */}
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-indigo-500" /> Download Personal Data
            </h4>
            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-1 max-w-sm">
              Get a copy of your personal data, booking history, and saved preferences.
            </p>
          </div>
          <Button variant="outline" className="shrink-0 text-sm py-2 px-4 rounded-xl" onClick={handleDownload}>
            Request Archive
          </Button>
        </div>

        {/* Data Processing */}
        <div className="p-5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          <h4 className="text-sm font-black text-gray-900 dark:text-white mb-4">Privacy Preferences</h4>
          
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-1 rounded text-indigo-600 focus:ring-indigo-500/50 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600" />
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Analytics & Telemetry</p>
                <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400">Help us improve the app by sharing anonymous usage data.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-1 rounded text-indigo-600 focus:ring-indigo-500/50 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600" />
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Personalized Offers</p>
                <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400">Allow us to use your booking history to show relevant discounts.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-6 border-t border-rose-100 dark:border-rose-900/30">
          <h3 className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Danger Zone
          </h3>
          <div className="p-5 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-black text-gray-900 dark:text-white">Delete Account</h4>
              <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-1 max-w-sm">
                Permanently delete your account, bookings, and saved data. This action cannot be undone.
              </p>
            </div>
            <button 
              onClick={handleDelete}
              className="shrink-0 text-sm font-bold bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-xl transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>

      </div>

      <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Export Your Data</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Download a copy of all your personal data, booking history, and preferences stored on BusGo.
        </p>
        <button 
          onClick={() => toast.success('Your data archive is being generated. We will email you when it is ready. (Demo)')}
          className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Request Data Export
        </button>
      </div>

    </div>
  );
};

export default PrivacySection;
