import React from 'react';
import { Settings2, Mail, MessageSquare, ShieldCheck, FileText, Building2, Hash } from 'lucide-react';

const PreferencesForm = ({ preferences, onChange, errors }) => {
  const togglePreference = (key) => {
    onChange(key, !preferences[key]);
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-md border border-gray-200 dark:border-slate-800/80 relative flex flex-col gap-5 w-full mt-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center border border-orange-100 dark:border-orange-500/20">
          <Settings2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Optional Preferences</h3>
          <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">Customize your booking experience</span>
        </div>
      </div>

      {/* Checkboxes Group */}
      <div className="flex flex-col gap-4 mt-2">
        
        {/* Email Updates */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input 
              type="checkbox" 
              checked={preferences.emailUpdates || false}
              onChange={() => togglePreference('emailUpdates')}
              className="peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded-md checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors"
            />
            <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            <span className="text-sm font-semibold text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Receive booking confirmation by Email</span>
          </div>
        </label>

        {/* SMS Updates */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input 
              type="checkbox" 
              checked={preferences.smsUpdates || false}
              onChange={() => togglePreference('smsUpdates')}
              className="peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded-md checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors"
            />
            <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
            <span className="text-sm font-semibold text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Receive booking updates by SMS</span>
          </div>
        </label>

        {/* Travel Insurance */}
        <label className="flex items-start gap-3 cursor-pointer group mt-2 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors hover:border-indigo-200 dark:hover:border-indigo-500/30">
          <div className="relative flex items-center justify-center mt-0.5">
            <input 
              type="checkbox" 
              checked={preferences.insurance || false}
              onChange={() => togglePreference('insurance')}
              className="peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded-md checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors"
            />
            <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">Travel Insurance (₹15/passenger)</span>
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-slate-400 mt-1">Covers accidental injury, baggage loss, and trip cancellation.</span>
          </div>
        </label>

        {/* GST Invoice */}
        <div className="flex flex-col mt-2">
          <label className="flex items-center gap-3 cursor-pointer group mb-4">
            <div className="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                checked={preferences.gstInvoice || false}
                onChange={() => togglePreference('gstInvoice')}
                className="peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded-md checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors"
              />
              <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              <span className="text-sm font-semibold text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">GST Invoice Required (For business travel)</span>
            </div>
          </label>

          {/* GST Expanded Form */}
          {preferences.gstInvoice && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-8 mt-2 animate-in slide-in-from-top-2 fade-in duration-300">
              {/* GST Number */}
              <div className="relative">
                <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                  GST Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Hash className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={preferences.gstNumber || ''}
                    onChange={(e) => onChange('gstNumber', e.target.value.toUpperCase())}
                    placeholder="15-digit GSTIN"
                    maxLength="15"
                    className={`w-full bg-gray-50 dark:bg-slate-900/50 border ${errors?.gstNumber ? 'border-rose-300 dark:border-rose-500/50 focus:ring-rose-500' : 'border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl pl-10 pr-4 py-2.5 text-gray-900 dark:text-white text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
                  />
                </div>
                {errors?.gstNumber && (
                  <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-rose-500">{errors.gstNumber}</p>
                )}
              </div>

              {/* Company Name */}
              <div className="relative">
                <label className="block text-[11px] font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Building2 className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={preferences.companyName || ''}
                    onChange={(e) => onChange('companyName', e.target.value)}
                    placeholder="Registered business name"
                    className={`w-full bg-gray-50 dark:bg-slate-900/50 border ${errors?.companyName ? 'border-rose-300 dark:border-rose-500/50 focus:ring-rose-500' : 'border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl pl-10 pr-4 py-2.5 text-gray-900 dark:text-white text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
                  />
                </div>
                {errors?.companyName && (
                  <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-rose-500">{errors.companyName}</p>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PreferencesForm;
