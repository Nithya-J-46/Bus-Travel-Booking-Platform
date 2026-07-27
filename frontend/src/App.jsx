import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { RewardsProvider } from './context/RewardsContext';
import { HelpProvider } from './context/HelpContext';
import { ReviewProvider } from './context/ReviewContext';

// Components
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import FloatingAIAssistant from './components/help/FloatingAIAssistant';

// Pages (Lazy Loaded)
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const EmailVerificationSuccess = lazy(() => import('./pages/EmailVerificationSuccess'));

const RouteDetails = lazy(() => import('./pages/RouteDetails'));
const Profile = lazy(() => import('./pages/Profile'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const SeatSelection = lazy(() => import('./pages/SeatSelection'));
const PassengerDetails = lazy(() => import('./pages/PassengerDetails'));
const Payment = lazy(() => import('./pages/Payment'));
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'));
const MyBookings = lazy(() => import('./pages/MyBookings'));
const ViewTicket = lazy(() => import('./pages/ViewTicket'));
const TrackBus = lazy(() => import('./pages/TrackBus'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const RewardsDashboard = lazy(() => import('./pages/RewardsDashboard'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const RoutePlanner = lazy(() => import('./pages/RoutePlanner'));
const ExploreRoutes = lazy(() => import('./pages/ExploreRoutes'));
const NotificationSettings = lazy(() => import('./pages/NotificationSettings'));
const Community = lazy(() => import('./pages/Community'));
const NotFoundPage = lazy(() => import('./pages/errors/NotFoundPage'));
const ServerErrorPage = lazy(() => import('./pages/errors/ServerErrorPage'));
const UnauthorizedPage = lazy(() => import('./pages/errors/UnauthorizedPage'));

// Protected Route Guard Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5F7FB] dark:bg-slate-950 transition-colors duration-300">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB] dark:bg-[#0b0f19] text-gray-900 dark:text-white transition-colors duration-350">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-indigo-600 focus:text-white font-bold rounded-br-lg shadow-lg">Skip to main content</a>
      <Navbar />
      <main id="main-content" className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Landing Page (Home) */}
          <Route path="/" element={<Home />} />
          <Route path="/route-details/:id" element={<RouteDetails />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/explore-routes" element={<ExploreRoutes />} />
          <Route path="/seat-selection/:busId" element={<SeatSelection />} />
          <Route path="/passenger-details" element={<PassengerDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/ticket/:bookingId" element={<ViewTicket />} />
          <Route path="/track-bus/:bookingId" element={<TrackBus />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/route-planner/:bookingId?" element={<RoutePlanner />} />

          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<EmailVerificationSuccess />} />
          
          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rewards"
            element={
              <ProtectedRoute>
                <RewardsDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/notifications"
            element={
              <ProtectedRoute>
                <NotificationSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help-center"
            element={
              <ProtectedRoute>
                <HelpCenter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
          
          {/* Catch all 404 Route */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </main>

      <Footer />
      <FloatingAIAssistant />
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <ServerErrorPage error={this.state.error} />
        </Suspense>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <RewardsProvider>
            <HelpProvider>
              <ReviewProvider>
                <Router>
                  <AppContent />
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: '#0F172A',
                        borderRadius: '1rem',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '13px',
                        fontWeight: '500',
                      },
                      success: {
                        iconTheme: {
                          primary: '#6366F1',
                          secondary: '#FFFFFF',
                        },
                      },
                      error: {
                        iconTheme: {
                          primary: '#EF4444',
                          secondary: '#FFFFFF',
                        },
                      },
                    }}
                  />
                </Router>
              </ReviewProvider>
            </HelpProvider>
          </RewardsProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
