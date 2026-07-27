import React from 'react';
import { Phone, Mail, AlertCircle } from 'lucide-react';

const ContactForm = ({ contactDetails, onChange, errors }) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-md border border-gray-200 dark:border-slate-800/80 relative flex flex-col gap-5 w-full mt-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
          <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Contact Details</h3>
          <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">Your ticket info will be sent here</span>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
        
        {/* Email Address */}
        <div className="md:col-span-1 relative">
          <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Mail className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="email"
              value={contactDetails.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="Email for e-ticket"
              className={`w-full bg-gray-50 dark:bg-slate-900/50 border ${errors?.email ? 'border-rose-300 dark:border-rose-500/50 focus:ring-rose-500' : 'border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white text-sm font-semibold placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
            />
          </div>
          {errors?.email && (
            <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="md:col-span-1 relative">
          <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
            Mobile Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex">
            <select className="bg-gray-100 dark:bg-slate-800 border border-r-0 border-gray-200 dark:border-slate-700 rounded-l-xl px-3 py-3 text-gray-700 dark:text-slate-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 z-10 appearance-none">
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="tel"
              value={contactDetails.phone || ''}
              onChange={(e) => onChange('phone', e.target.value.replace(/\D/g, ''))}
              placeholder="10-digit number"
              maxLength="10"
              className={`w-full bg-gray-50 dark:bg-slate-900/50 border ${errors?.phone ? 'border-rose-300 dark:border-rose-500/50 focus:ring-rose-500' : 'border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'} rounded-r-xl px-4 py-3 text-gray-900 dark:text-white text-sm font-semibold placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
            />
          </div>
          {errors?.phone && (
            <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="md:col-span-2 relative mt-2">
          <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
            Emergency Contact <span className="text-gray-400 font-semibold lowercase tracking-normal">(Optional)</span>
          </label>
          <div className="relative flex">
            <input
              type="tel"
              value={contactDetails.emergencyPhone || ''}
              onChange={(e) => onChange('emergencyPhone', e.target.value.replace(/\D/g, ''))}
              placeholder="Alternative mobile number"
              maxLength="10"
              className={`w-full bg-gray-50 dark:bg-slate-900/50 border ${errors?.emergencyPhone ? 'border-rose-300 dark:border-rose-500/50 focus:ring-rose-500' : 'border-gray-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500'} rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm font-semibold placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all`}
            />
          </div>
          {errors?.emergencyPhone && (
            <p className="absolute -bottom-5 left-0 text-[10px] font-bold text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.emergencyPhone}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactForm;
