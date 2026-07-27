import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How do I cancel my bus ticket and get a refund?',
    answer: 'You can cancel your ticket directly through the "Bookings" tab in your profile dashboard. Refunds are processed immediately based on the operator\'s cancellation policy, typically returning to your bank account within 3 to 5 business days.'
  },
  {
    question: 'Can I reschedule my journey date?',
    answer: 'Yes! RESCHEDULING is available for most operators up to 12 hours before the scheduled departure. You can check the availability and modify dates from your bookings details page. Difference in ticket fares (if any) will apply.'
  },
  {
    question: 'What is the maximum luggage allowance per seat?',
    answer: 'Generally, each passenger is allowed to carry up to 20kg of luggage, including one handbag and one medium-sized suitcase. For excess or heavy baggage, operators may apply a small extra fee at the time of boarding.'
  },
  {
    question: 'Is it necessary to carry a printed ticket copy?',
    answer: 'No printout is required! You can easily board the bus by showing the digital M-Ticket PDF or booking SMS confirmation sent to your registered email and mobile number along with a valid ID proof.'
  }
];

const FAQAccordion = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const toggle = (idx) => {
    setActiveIdx((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-slate-50 dark:bg-[#080c14] transition-colors duration-300 relative select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <SectionHeading 
          badge="FAQ HELP" 
          icon={HelpCircle} 
          title="Frequently Asked Questions" 
          subtitle="Find quick answers to common queries about booking, luggage, cancellations, and BusGo rewards."
        />

        {/* FAQ Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIdx === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-[#0c111e]/60 backdrop-blur-md overflow-hidden transition-all duration-300"
              >
                {/* Trigger head */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-extrabold text-slate-850 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer focus:outline-none"
                >
                  <span className="flex items-center gap-3 text-sm sm:text-base">
                    <HelpCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-450 dark:text-slate-500 transform transition-transform duration-350 ${
                      isOpen ? 'rotate-180 text-indigo-500' : ''
                    }`}
                  />
                </button>

                {/* Animated collapse content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1.5 border-t border-slate-100 dark:border-slate-800/50 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-left font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQAccordion;
