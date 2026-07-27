import React from 'react';
import { Info, AlertCircle } from 'lucide-react';

const ImportantInfo = () => {
  const guidelines = [
    "Reach the boarding point at least 30 minutes before departure.",
    "Carry a valid government-issued ID proof (Aadhar, PAN, Driving License).",
    "Keep this QR code ready for scanning while boarding.",
    "Follow all operator guidelines regarding luggage and seating."
  ];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 animate-[fadeInUp_0.5s_ease-out_0.5s_both]">
      <h3 className="text-base font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-indigo-500" />
        Important Information
      </h3>
      
      <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/20 rounded-2xl p-4">
        <ul className="space-y-3">
          {guidelines.map((text, i) => (
            <li key={i} className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span className="text-xs font-bold text-gray-700 dark:text-slate-300 leading-relaxed">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImportantInfo;
