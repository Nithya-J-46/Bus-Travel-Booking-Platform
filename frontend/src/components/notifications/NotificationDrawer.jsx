import React, { useState, useMemo } from 'react';
import { X, CheckCircle2, Trash2, Settings, Search } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import NotificationCard from './NotificationCard';
import { Link } from 'react-router-dom';

const CATEGORY_TABS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'booking', label: 'Bookings' },
  { id: 'offer', label: 'Offers' },
  { id: 'system', label: 'System' }
];

const NotificationDrawer = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, deleteNotification, archiveNotification, retryNotification, markAllAsRead, clearAll } = useNotifications();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Apply Tab Filter
    if (activeTab === 'unread') {
      filtered = filtered.filter(n => !n.read);
    } else if (activeTab !== 'all') {
      filtered = filtered.filter(n => n.category === activeTab);
    }

    // Apply Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.message.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [notifications, activeTab, searchQuery]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white dark:bg-slate-950 shadow-2xl z-[101] transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              Notifications
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {notifications.filter(n => !n.read).length} New
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <Link to="/settings/notifications" onClick={onClose} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-colors cursor-pointer" title="Settings">
                <Settings className="w-5 h-5" />
              </Link>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-colors cursor-pointer" title="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Quick Actions & Tabs */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORY_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button 
                onClick={markAllAsRead}
                disabled={notifications.filter(n => !n.read).length === 0}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50 disabled:hover:no-underline cursor-pointer flex items-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4" /> Mark all read
              </button>
              <button 
                onClick={clearAll}
                disabled={notifications.length === 0}
                className="text-xs font-semibold text-slate-500 hover:text-rose-500 disabled:opacity-50 cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Clear all
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-slate-50/50 dark:bg-slate-950/50">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <NotificationCard 
                key={notif.id} 
                notif={notif}
                onMarkRead={markAsRead}
                onDelete={deleteNotification}
                onArchive={archiveNotification}
                onRetry={retryNotification}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-indigo-300 dark:text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">You're all caught up!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[250px]">
                {searchQuery ? 'No notifications match your search.' : "We'll notify you when something new arrives."}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer;
