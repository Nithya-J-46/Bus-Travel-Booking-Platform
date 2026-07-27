import React from 'react';

const NotificationFilters = ({ activeFilter, setActiveFilter }) => {
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'booking', label: 'Bookings' },
    { id: 'payment', label: 'Payments' },
    { id: 'refund', label: 'Refunds' },
    { id: 'offer', label: 'Offers' },
    { id: 'review', label: 'Reviews' },
    { id: 'system', label: 'System' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => setActiveFilter(category.id)}
          className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
            activeFilter === category.id
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
              : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default NotificationFilters;
