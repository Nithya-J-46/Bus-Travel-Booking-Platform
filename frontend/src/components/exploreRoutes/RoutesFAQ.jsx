import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I track my bus after booking?',
    a: 'You can use the Live Tracking feature in the BusGo app or website. Just go to "My Bookings", select your trip, and click on "Track Bus".'
  },
  {
    q: 'Are there any hidden charges?',
    a: 'No! BusGo believes in 100% transparency. What you see on the final checkout page is exactly what you pay.'
  },
  {
    q: 'Can I cancel or reschedule my ticket?',
    a: 'Yes, you can easily cancel or reschedule from the "My Bookings" section. Cancellation policies depend on the bus operator.'
  },
  {
    q: 'How do I avail offers and discounts?',
    a: 'Check our "Rewards" dashboard for ongoing promo codes and loyalty points which can be applied during checkout.'
  }
];

const RoutesFAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-slate-800">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-500 dark:text-gray-400">Everything you need to know about booking with BusGo.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, idx) => (
          <div 
            key={idx} 
            className="border border-gray-100 dark:border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 bg-slate-50 dark:bg-slate-900/50"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
            >
              <span className="font-bold text-gray-900 dark:text-white">{faq.q}</span>
              <ChevronDown 
                className={`w-5 h-5 text-indigo-500 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <motion.div
              initial={false}
              animate={{ height: openIdx === idx ? 'auto' : 0, opacity: openIdx === idx ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {faq.a}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoutesFAQ;
