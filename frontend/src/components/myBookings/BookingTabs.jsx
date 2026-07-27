import React from 'react';

const BookingTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 border-b border-gray-200 dark:border-slate-800 animate-[fadeInUp_0.5s_ease-out_0.2s_both]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-4 text-sm font-black whitespace-nowrap transition-all relative ${
            activeTab === tab.id
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900/50'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-t-full shadow-[0_-2px_10px_rgba(79,70,229,0.5)]"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default BookingTabs;
