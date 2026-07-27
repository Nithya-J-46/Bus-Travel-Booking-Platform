import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bus, User as UserIcon, LogOut, Menu, X, Sun, Moon, Bell, Trophy, HelpCircle, Users, Map as MapIcon, Ticket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useTranslation } from 'react-i18next';
import NotificationDrawer from './notifications/NotificationDrawer';
import LanguageSwitcher from './LanguageSwitcher';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { t } = useTranslation('common');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  
  const { unreadCount } = useNotifications();

  // Initialize Dark Mode state from DOM or localStorage
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Scroll Listener to toggle navbar prominence on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 12) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (e) {
      toast.error('Logout failed');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 backdrop-blur-2xl
        ${isScrolled 
          ? 'bg-white/95 dark:bg-theme-surface/80 border-b border-[#E2E8F0] dark:border-theme-border/40 shadow-sm dark:shadow-[0_0_20px_rgba(99,102,241,0.2)] py-0.5' 
          : 'bg-white/95 dark:bg-theme-surface/30 border-b border-[#E2E8F0] dark:border-transparent shadow-sm dark:shadow-none py-2'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/" className="flex items-center gap-2 select-none group">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Bus className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="tracking-tight text-theme-text font-extrabold text-xl">
                Bus<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Go</span>
              </span>
            </Link>
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Desktop Navigation Links - CENTERED */}
          <div className="hidden lg:flex flex-1 items-center justify-center px-4 overflow-hidden">
            {user ? (
              <div className="flex items-center gap-2">
                  <Link
                    to="/my-bookings"
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all relative group ${
                      isActive('/my-bookings')
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-900/20'
                        : 'text-theme-text-sec hover:text-indigo-500 hover:bg-theme-bg'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Bus className="w-4 h-4" />
                      {t('navbar.my_bookings')}
                    </span>
                    
                    {!isActive('/my-bookings') && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    )}
                  </Link>

                  <Link
                    to="/profile"
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all relative group ${
                      isActive('/profile')
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 dark:border-indigo-900/20'
                        : 'text-theme-text-sec hover:text-indigo-500 hover:bg-theme-bg'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <UserIcon className="w-4 h-4" />
                      {t('navbar.profile')}
                    </span>
                    
                    {/* Subtle hover underline animation */}
                    {!isActive('/profile') && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    )}
                  </Link>

                  <Link
                    to="/community"
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all relative group flex items-center gap-1.5 ${
                      isActive('/community')
                        ? 'bg-purple-50/80 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-100/30 dark:border-purple-900/20'
                        : 'text-theme-text-sec hover:text-purple-500 hover:bg-theme-bg'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    {t('navbar.community')}
                    {!isActive('/community') && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    )}
                  </Link>

                  <Link
                    to="/rewards"
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all relative group flex items-center gap-1.5 ${
                      isActive('/rewards')
                        ? 'bg-amber-50/80 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100/30 dark:border-amber-900/20'
                        : 'text-theme-text-sec hover:text-amber-500 hover:bg-theme-bg'
                    }`}
                  >
                    <Trophy className="w-4 h-4" />
                    {t('navbar.rewards')}
                    {!isActive('/rewards') && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    )}
                  </Link>

                  <Link
                    to="/help-center"
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all relative group flex items-center gap-1.5 ${
                      isActive('/help-center')
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100/30 dark:border-emerald-900/20'
                        : 'text-theme-text-sec hover:text-emerald-500 hover:bg-theme-bg'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    {t('navbar.help')}
                    {!isActive('/help-center') && (
                      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    )}
                  </Link>
                </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/routes"
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:text-indigo-500 dark:hover:text-indigo-400 relative group ${
                    isActive('/routes') ? 'text-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20' : 'text-theme-text-sec hover:bg-theme-bg'
                  }`}
                >
                  {t('footer.routes')}
                </Link>
                
                <Link
                  to="/route-planner"
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:text-indigo-500 dark:hover:text-indigo-400 relative group flex items-center gap-2 ${
                    isActive('/route-planner') ? 'text-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20' : 'text-theme-text-sec hover:bg-theme-bg'
                  }`}
                >
                  <MapIcon className="w-4 h-4" />
                  Route Planner
                </Link>
                
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:text-indigo-500 dark:hover:text-indigo-400 relative group ${
                    isActive('/login') ? 'text-indigo-500' : 'text-theme-text-sec'
                  }`}
                >
                  {t('navbar.login')}
                  <span className="absolute bottom-1.5 left-4 right-4 h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
                
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 shadow-sm transition-all shimmer-container shimmer-delayed-effect"
                >
                  {t('navbar.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Right Side Actions (Profile, Notifications, Dark Mode) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 text-theme-text-sec hover:text-indigo-500 rounded-xl hover:bg-theme-border/50 transition-all cursor-pointer overflow-hidden flex items-center justify-center relative w-10 h-10"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <Sun className={`absolute w-5 h-5 transition-all duration-500 transform ${isDark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`} />
              <Moon className={`absolute w-5 h-5 transition-all duration-500 transform ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`} />
            </button>
            
            {user && (
              <>
                <button
                  onClick={() => setIsNotificationDrawerOpen(true)}
                  className="relative p-2.5 text-theme-text-sec hover:text-indigo-500 rounded-xl hover:bg-theme-bg transition-all cursor-pointer overflow-hidden flex items-center justify-center w-10 h-10"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#0f172a] animate-pulse" />
                  )}
                </button>
                
                <div className="flex items-center gap-3 pl-4 border-l border-theme-border">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-theme-text line-clamp-1">{user.full_name}</p>
                    <p className="text-[10px] text-theme-text-sec line-clamp-1 uppercase tracking-wider">Passenger</p>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-600 border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer">
                    <span className="text-white font-bold text-base">
                      {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="p-2 ml-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all cursor-pointer flex items-center justify-center w-10 h-10"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-theme-text-sec hover:text-indigo-500 rounded-xl hover:bg-theme-bg transition-all cursor-pointer overflow-hidden flex items-center justify-center relative w-9 h-9"
            >
              <Sun className={`absolute w-5 h-5 transition-all duration-500 transform ${isDark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`} />
              <Moon className={`absolute w-5 h-5 transition-all duration-500 transform ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`} />
            </button>
            {user && (
              <button
                onClick={() => setIsNotificationDrawerOpen(true)}
                className="relative p-2 text-theme-text-sec hover:text-indigo-500 rounded-xl hover:bg-theme-bg transition-all cursor-pointer overflow-hidden flex items-center justify-center w-9 h-9"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#0f172a] animate-pulse" />
                )}
              </button>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-theme-text-sec hover:text-indigo-500 hover:bg-theme-bg focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      <div 
        className={`fixed inset-0 z-40 flex justify-end transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Drawer */}
        <div 
          className={`relative w-64 max-w-full h-full bg-white dark:bg-theme-surface shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-theme-border">
            <span className="font-bold text-lg text-theme-text">Menu</span>
            <button onClick={() => setIsOpen(false)} className="p-2 text-theme-text-sec hover:text-indigo-500 rounded-full hover:bg-theme-bg">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="overflow-y-auto flex-1 p-4 space-y-4">
            <LanguageSwitcher mobile={true} onClose={() => setIsOpen(false)} />
            
            <div className="space-y-1 mt-2">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-semibold ${
                  isActive('/') ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' : 'text-theme-text-sec hover:text-indigo-500'
                }`}
              >
                <Bus className="w-5 h-5" />
                Home
              </Link>
              
              {user ? (
                <>
                  <Link
                    to="/my-bookings"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-semibold ${
                      isActive('/my-bookings') ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' : 'text-theme-text-sec hover:text-indigo-500'
                    }`}
                  >
                    <Ticket className="w-5 h-5" />
                    {t('navbar.my_bookings')}
                  </Link>

                  <Link
                    to="/community"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-semibold ${
                      isActive('/community') ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600' : 'text-theme-text-sec hover:text-purple-500'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                    {t('navbar.community')}
                  </Link>

                  <Link
                    to="/rewards"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-semibold ${
                      isActive('/rewards') ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600' : 'text-theme-text-sec hover:text-amber-500'
                    }`}
                  >
                    <Trophy className="w-5 h-5" />
                    {t('navbar.rewards')}
                  </Link>

                  <Link
                    to="/help-center"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-semibold ${
                      isActive('/help-center') ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600' : 'text-theme-text-sec hover:text-emerald-500'
                    }`}
                  >
                    <HelpCircle className="w-5 h-5" />
                    {t('navbar.help')}
                  </Link>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsNotificationDrawerOpen(true);
                    }}
                    className="flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-base font-semibold text-theme-text-sec hover:text-indigo-500 text-left cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      {t('navbar.notifications')}
                    </span>
                    {unreadCount > 0 && (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {unreadCount} New
                      </span>
                    )}
                  </button>

                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-semibold ${
                      isActive('/profile') ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' : 'text-theme-text-sec hover:text-indigo-500'
                    }`}
                  >
                    <UserIcon className="w-5 h-5" />
                    {t('navbar.profile')}
                  </Link>
                  
                  <button
                    onClick={toggleDarkMode}
                    className="flex w-full items-center gap-2 px-3 py-2.5 rounded-xl text-base font-semibold text-theme-text-sec hover:text-indigo-500 text-left cursor-pointer"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 rounded-xl text-base font-semibold text-red-650 hover:bg-red-50 dark:hover:bg-red-950/10 text-left cursor-pointer mt-4"
                  >
                    <LogOut className="w-5 h-5" />
                    {t('navbar.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/routes"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-semibold ${
                      isActive('/routes') ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' : 'text-theme-text-sec hover:text-indigo-500'
                    }`}
                  >
                    <MapIcon className="w-5 h-5" />
                    {t('footer.routes')}
                  </Link>
                  <button
                    onClick={toggleDarkMode}
                    className="flex w-full items-center gap-2 px-3 py-2.5 rounded-xl text-base font-semibold text-theme-text-sec hover:text-indigo-500 text-left cursor-pointer"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  <div className="pt-4 mt-4 border-t border-theme-border space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className={`block w-full text-center px-3 py-2.5 rounded-xl text-base font-semibold ${
                        isActive('/login') ? 'text-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20' : 'bg-theme-bg text-theme-text'
                      }`}
                    >
                      {t('navbar.login')}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center px-3 py-2.5 rounded-xl text-base font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 text-white"
                    >
                      {t('navbar.register')}
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-in Drawer */}
      <NotificationDrawer 
        isOpen={isNotificationDrawerOpen} 
        onClose={() => setIsNotificationDrawerOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
