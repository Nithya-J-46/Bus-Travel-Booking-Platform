import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, Trash2, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import NotificationCard from '../components/notifications/NotificationCard';
import NotificationFilters from '../components/notifications/NotificationFilters';
import EmptyState from '../components/notifications/EmptyState';

const NotificationsPage = () => {
  const { notifications, unreadCount, markAllAsRead, clearAll } = useNotifications();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Grouping utility
  const groupNotifications = (notifs) => {
    const groups = {
      Today: [],
      Yesterday: [],
      Older: []
    };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    notifs.forEach(n => {
      const d = new Date(n.timestamp);
      if (d >= today) groups.Today.push(n);
      else if (d >= yesterday) groups.Yesterday.push(n);
      else groups.Older.push(n);
    });

    return groups;
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      const matchesCategory = activeFilter === 'all' || n.type === activeFilter;
      const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            n.message.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [notifications, activeFilter, searchQuery]);

  const grouped = groupNotifications(filteredNotifications);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F5F7FB] dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Notifications Center</h1>
              <p className="text-sm font-bold text-gray-500 dark:text-slate-400 mt-1">
                You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          {notifications.length > 0 && (
            <div className="flex gap-3">
              <button 
                onClick={markAllAsRead}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-all shadow-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Mark all read
              </button>
              <button 
                onClick={clearAll}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2 transition-all shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800 mb-8 animate-[fadeIn_0.3s_ease-out]">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors text-gray-900 dark:text-white font-medium"
            />
          </div>
          
          <NotificationFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </div>

        {/* Content */}
        <div className="space-y-8">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800 h-[400px]">
              <EmptyState message={searchQuery ? "No notifications match your search." : "You have no notifications in this category."} />
            </div>
          ) : (
            <AnimatePresence>
              {Object.entries(grouped).map(([dateLabel, notifs]) => (
                notifs.length > 0 && (
                  <motion.div 
                    key={dateLabel}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                  >
                    <div className="sticky top-20 z-10 bg-[#F5F7FB]/90 dark:bg-slate-950/90 backdrop-blur-md py-2 mb-4">
                      <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
                        {dateLabel}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {notifs.map(notification => (
                        <NotificationCard 
                          key={notification.id} 
                          notification={notification}
                          onActionClick={() => {
                            if (notification.actionUrl) {
                              navigate(notification.actionUrl);
                            }
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          )}
        </div>

      </div>
    </div>
  );
};

export default NotificationsPage;
