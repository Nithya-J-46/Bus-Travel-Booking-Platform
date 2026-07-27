import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

import axiosInstance from '../api/axios';

const DEFAULT_PREFERENCES = {
  bookingUpdates: true,
  paymentNotifications: true,
  journeyReminders: true,
  trafficAlerts: true,
  offers: true,
  promotions: false,
  rewards: true,
  communityActivity: true,
  systemMessages: true,
  email: true,
  push: false,
  sms: false
};

const INITIAL_MOCK_DATA = [];
const SIMULATOR_POOL = [
  { category: 'offer', priority: 'low', title: 'Flash Sale! ⚡', message: 'Use code FLASH50 to get 50% off on your next ride.', actionText: 'Book Now', actionUrl: '/' },
  { category: 'system', priority: 'medium', title: 'Reward Points Added 🎁', message: 'You just earned 100 reward points for your last journey.' },
  { category: 'journey', priority: 'high', title: 'Traffic Alert 🚦', message: 'Heavy traffic reported on your route to Bangalore. Expect a 20 min delay.' },
  { category: 'community', priority: 'low', title: 'New Comment 💬', message: 'Someone replied to your post in the "Weekend Trips" forum.' },
  { category: 'booking', priority: 'high', title: 'Departure Reminder ⏰', message: 'Your journey starts in 2 hours. Have a safe trip!' }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [lastDeleted, setLastDeleted] = useState(null);
  
  // Ref for the simulator timeout to prevent multiple running
  const simulatorRef = useRef(null);

  // Simulated initial load
  useEffect(() => {
    fetchNotifications();
    const savedPrefs = localStorage.getItem('busgo_notification_prefs');
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get('auth/notifications/');
      const mapped = response.data.map(n => ({
        id: n.id,
        category: n.type,
        priority: 'medium',
        title: n.title,
        message: n.message,
        timestamp: n.created_at,
        read: n.is_read,
        deliveryStatus: 'delivered'
      }));
      setNotifications(mapped);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem('busgo_notification_prefs', JSON.stringify(preferences));
  }, [preferences]);

  // The Simulation Engine
  useEffect(() => {
    const runSimulator = () => {
      // Pick a random notification
      const randomNotifTemplate = SIMULATOR_POOL[Math.floor(Math.random() * SIMULATOR_POOL.length)];
      
      // Check preferences
      let shouldDispatch = true;
      if (randomNotifTemplate.category === 'offer' && !preferences.offers) shouldDispatch = false;
      if (randomNotifTemplate.category === 'community' && !preferences.communityActivity) shouldDispatch = false;
      if (randomNotifTemplate.category === 'journey' && !preferences.trafficAlerts) shouldDispatch = false;

      if (shouldDispatch) {
        const newNotif = {
          ...randomNotifTemplate,
          id: `sim_${Date.now()}`,
          timestamp: new Date().toISOString(),
          read: false,
          deliveryStatus: 'pending' // starts pending
        };

        // Add to state
        setNotifications(prev => [newNotif, ...prev]);
        
        // Show a quick toast for real-time feel
        toast(newNotif.title, { icon: '🔔', position: 'bottom-right' });

        // Simulate delivery delay
        setTimeout(() => {
          setNotifications(prev => prev.map(n => {
            if (n.id === newNotif.id) {
              // 10% chance to simulate a failure
              const isFailure = Math.random() < 0.1;
              return { ...n, deliveryStatus: isFailure ? 'failed' : 'delivered' };
            }
            return n;
          }));
        }, 3000);
      }

      // Schedule next notification (between 20s and 40s)
      const nextDelay = Math.random() * 20000 + 20000;
      simulatorRef.current = setTimeout(runSimulator, nextDelay);
    };

    // Start engine after an initial 10s delay
    simulatorRef.current = setTimeout(runSimulator, 10000);

    return () => {
      if (simulatorRef.current) clearTimeout(simulatorRef.current);
    };
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast.success('Preferences updated');
  };

  const unreadCount = notifications.filter(n => !n.read && !n.archived).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAsUnread = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: false } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const retryNotification = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, deliveryStatus: 'retrying' } : n));
    toast('Retrying delivery...', { icon: '🔄' });
    
    // Simulate network retry
    setTimeout(() => {
      setNotifications(prev => prev.map(n => {
        if (n.id === id) {
          toast.success('Delivery successful');
          return { ...n, deliveryStatus: 'delivered' };
        }
        return n;
      }));
    }, 2500);
  };

  const deleteNotification = (id) => {
    const notif = notifications.find(n => n.id === id);
    setLastDeleted(notif);
    setNotifications(prev => prev.filter(n => n.id !== id));
    
    toast.success('Notification deleted', {
      icon: '🗑️',
      action: {
        label: 'Undo',
        onClick: undoDelete,
      },
    });
  };

  const undoDelete = () => {
    if (lastDeleted) {
      setNotifications(prev => {
        const newArr = [...prev, lastDeleted];
        return newArr.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      });
      setLastDeleted(null);
      toast.success('Notification restored');
    }
  };

  const archiveNotification = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, archived: true } : n));
    toast.success('Notification archived');
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to delete all notifications?")) {
      setNotifications([]);
      localStorage.removeItem('busgo_notifications');
      toast.success('All notifications cleared');
    }
  };

  return (
    <NotificationContext.Provider value={{
      notifications: notifications.filter(n => !n.archived),
      archivedNotifications: notifications.filter(n => n.archived),
      preferences,
      unreadCount,
      updatePreference,
      markAsRead,
      markAsUnread,
      markAllAsRead,
      deleteNotification,
      retryNotification,
      undoDelete,
      archiveNotification,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
