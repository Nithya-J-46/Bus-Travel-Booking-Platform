import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { useHelp } from '../../context/HelpContext';

const FAQAccordion = () => {
  const { faqs, searchQuery } = useHelp();
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircleQuestion className="w-6 h-6 text-indigo-500" />
        <h3 className="text-xl font-black text-gray-900 dark:text-white">
          {searchQuery ? 'Search Results' : 'Popular FAQs'}
        </h3>
      </div>

      {faqs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm font-medium text-gray-500">No FAQs found matching "{searchQuery}". Try a different term or contact support.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div 
              key={faq.id}
              className="border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors hover:border-indigo-100 dark:hover:border-indigo-900/50"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <span className="font-bold text-gray-900 dark:text-white text-left text-sm">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openId === faq.id ? 'rotate-180 text-indigo-500' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-white dark:bg-[#111827]"
                  >
                    <div className="p-5 border-t border-gray-100 dark:border-slate-800">
                      <p className="text-sm font-medium text-gray-600 dark:text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;
