import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CHECKLIST = [
  "Carry Government ID",
  "Reach 30 minutes early",
  "Keep Ticket Ready (Digital or Print)",
  "Mobile Fully Charged",
  "Carry Water Bottle"
];

const TravelChecklist = () => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 h-full">
      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Travel Checklist</h3>
      
      <div className="space-y-4">
        {CHECKLIST.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 group">
            <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelChecklist;
