import React from 'react';
import { ArrowLeftRight, Tag, Star, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuggestedActions = () => {
  const navigate = useNavigate();
  
  const actions = [
    {
      id: 'return',
      title: 'Book Return Trip',
      icon: ArrowLeftRight,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-500/10',
      action: () => navigate('/')
    },
    {
      id: 'offers',
      title: 'Explore Offers',
      icon: Tag,
      color: 'text-cyan-500',
      bg: 'bg-cyan-50 dark:bg-cyan-500/10',
      action: () => {}
    },
    {
      id: 'bookings',
      title: 'View My Bookings',
      icon: CalendarDays,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      action: () => navigate('/my-bookings')
    },
    {
      id: 'rate',
      title: 'Rate Experience',
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      disabled: true
    }
  ];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 animate-[fadeInUp_0.5s_ease-out_0.6s_both]">
      <h3 className="text-base font-black text-gray-900 dark:text-white mb-4">
        Suggested Actions
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              disabled={item.disabled}
              className={`flex flex-col items-center text-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${
                item.disabled 
                  ? 'border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 opacity-60 cursor-not-allowed'
                  : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:shadow-sm group'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bg}`}>
                <Icon className={`w-5 h-5 ${item.color} ${!item.disabled && 'group-hover:scale-110 transition-transform'}`} />
              </div>
              <span className="text-xs font-bold text-gray-700 dark:text-slate-300">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestedActions;
