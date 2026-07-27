import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Clock, MapPin, Users, Wallet, Ticket, XCircle, ArrowLeftRight, CheckCircle2, QrCode, Download, Printer, Star, RotateCcw, Navigation, Map } from 'lucide-react';
import Button from '../Button';

const BookingCard = ({ booking, onCancel, onRate }) => {
  const navigate = useNavigate();
  const isUpcoming = booking.status === 'upcoming';
  const isCompleted = booking.status === 'completed';
  const isCancelled = booking.status === 'cancelled';
  const hasRefund = Boolean(booking.refundStatus);
  const hasReview = Boolean(booking.review);

  // Status badge config
  const statusConfig = {
    upcoming: { color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/30', icon: Clock, label: 'Upcoming Journey' },
    completed: { color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/30', icon: CheckCircle2, label: 'Completed' },
    cancelled: { color: 'text-rose-700 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10', border: 'border-rose-200 dark:border-rose-500/30', icon: XCircle, label: 'Cancelled' }
  };

  const StatusIcon = statusConfig[booking.status].icon;

  return (
    <div className={`bg-white dark:bg-[#111827] rounded-[24px] p-6 shadow-xl border border-gray-200 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
      
      {/* Header: ID, PNR and Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Booking ID:</span>
            <span className="text-sm font-black text-gray-900 dark:text-white">{booking.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">PNR:</span>
            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{booking.pnr}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${statusConfig[booking.status].bg} ${statusConfig[booking.status].border}`}>
            <StatusIcon className={`w-4 h-4 ${statusConfig[booking.status].color}`} />
            <span className={`text-xs font-bold uppercase tracking-wide ${statusConfig[booking.status].color}`}>
              {statusConfig[booking.status].label}
            </span>
          </div>
          
          {hasRefund && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${booking.refundStatus === 'completed' ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30' : 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30'}`}>
              <RotateCcw className={`w-4 h-4 ${booking.refundStatus === 'completed' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400 animate-[spin_3s_linear_infinite]'}`} />
              <span className={`text-xs font-bold uppercase tracking-wide ${booking.refundStatus === 'completed' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                {booking.refundStatus === 'completed' ? 'Refund Completed' : 'Refund Initiated'}
              </span>
            </div>
          )}

          {hasReview && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30">
              <Star className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-400">
                {booking.review.overallRating}/5 Rated
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-col lg:flex-row gap-6 ${isCancelled ? 'mb-6 opacity-60 grayscale-[0.2]' : 'mb-8'}`}>
        
        {/* Left: Journey Info */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                {booking.operator.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-black text-gray-900 dark:text-white">{booking.operator}</h4>
              <p className="text-xs font-bold text-gray-500 dark:text-slate-400">{booking.busType}</p>
            </div>
          </div>

          <div className="flex items-center justify-between relative">
            <div className="flex-1">
              <p className="text-xl font-black text-gray-900 dark:text-white mb-1">{booking.departureTime}</p>
              <p className="text-sm font-bold text-gray-500 dark:text-slate-400">{booking.source}</p>
              <p className="text-xs font-bold text-indigo-500 mt-1">{booking.date}</p>
            </div>

            <div className="flex-[1.5] flex flex-col items-center px-4 relative z-10">
              <div className="w-full h-[2px] bg-indigo-100 dark:bg-slate-800 absolute top-1/2 -translate-y-1/2 -z-10"></div>
              <div className="bg-white dark:bg-[#111827] px-3 py-1 rounded-full border border-gray-200 dark:border-slate-700">
                <span className="text-xs font-bold text-gray-500 dark:text-slate-400">
                  {booking.duration}
                </span>
              </div>
            </div>

            <div className="flex-1 text-right">
              <p className="text-xl font-black text-gray-900 dark:text-white mb-1">{booking.arrivalTime}</p>
              <p className="text-sm font-bold text-gray-500 dark:text-slate-400">{booking.destination}</p>
              <p className="text-xs font-bold text-indigo-500 mt-1">{booking.arrivalDate || booking.date}</p>
            </div>
          </div>
        </div>

        {/* Right: Passenger & Fare Info */}
        <div className="flex-1 lg:max-w-xs flex flex-col justify-center gap-4 p-4 lg:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Passengers</span>
            </div>
            <span className="text-sm font-black text-gray-900 dark:text-white">{booking.passengers.length}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
              <Ticket className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Seats</span>
            </div>
            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 break-all text-right ml-4">
              {booking.seats.join(', ')}
            </span>
          </div>

          <div className="w-full h-px bg-gray-200 dark:bg-slate-800 my-1"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
              <Wallet className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Total Fare</span>
            </div>
            <span className="text-lg font-black text-gray-900 dark:text-white">₹{booking.fare.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Review Summary (Only for rated trips) */}
      {hasReview && (
        <div className="mb-8 mt-2 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-2xl p-5 border border-indigo-500/20 animate-[fadeInUp_0.5s_ease-out]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h5 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2 mb-1">
                Thank you for your feedback!
              </h5>
              <p className="text-xs font-bold text-gray-500 dark:text-slate-400">
                Your rating helps improve future journeys.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col text-right">
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Earned</span>
                <span className="text-sm font-black text-gray-900 dark:text-white">50 Reward Points</span>
              </div>
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center border border-indigo-200 dark:border-indigo-800 shrink-0">
                <Star className="w-5 h-5 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refund Information Card (Only for cancelled with refund) */}
      {hasRefund && (
        <div className="mb-8 mt-2 bg-indigo-50/30 dark:bg-slate-900/40 rounded-2xl p-5 border border-indigo-100/50 dark:border-slate-800 animate-[fadeIn_0.5s_ease-out]">
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-[1.5]">
              <h5 className="text-sm font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-indigo-500" />
                Refund Information
              </h5>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Amount</span>
                  <span className="text-sm font-black text-gray-900 dark:text-white">₹{booking.refundAmount?.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Method</span>
                  <span className="text-sm font-bold text-gray-700 dark:text-slate-300 truncate" title={booking.paymentMethod}>{booking.paymentMethod}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Expected</span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Within 24 Hours</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Reference</span>
                  <span className="text-sm font-bold text-gray-700 dark:text-slate-300">{booking.refundReference}</span>
                </div>
              </div>

              {booking.refundStatus === 'completed' && (
                <div className="mt-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-3 flex gap-3 animate-[scaleIn_0.3s_ease-out]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200 mt-0.5">
                    Refund Completed Successfully. Your refund has been credited to your original payment method.
                  </p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="flex-1 lg:pl-6 lg:border-l border-gray-200 dark:border-slate-800 flex items-center">
              <div className="w-full max-w-xs relative pl-4 border-l-2 border-indigo-100 dark:border-slate-700 py-2">
                <div className="mb-4 relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50 dark:ring-emerald-900/30"></div>
                  <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400">Step 1</p>
                  <p className="text-xs font-black text-gray-900 dark:text-white line-through opacity-50">Booking Confirmed</p>
                </div>
                <div className="mb-4 relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50 dark:ring-emerald-900/30"></div>
                  <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400">Step 2</p>
                  <p className="text-xs font-black text-gray-900 dark:text-white line-through opacity-50">Payment Successful</p>
                </div>
                <div className="mb-4 relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-rose-50 dark:ring-rose-900/30"></div>
                  <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400">Step 3</p>
                  <p className="text-xs font-black text-rose-600 dark:text-rose-400">Booking Cancelled</p>
                </div>
                <div className="relative">
                  <div className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${booking.refundStatus === 'completed' ? 'bg-emerald-500 ring-emerald-50 dark:ring-emerald-900/30' : 'bg-amber-500 ring-amber-50 dark:ring-amber-900/30'} ring-4`}></div>
                  <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400">Final Step</p>
                  <p className={`text-xs font-black ${booking.refundStatus === 'completed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {booking.refundStatus === 'completed' ? 'Refund Completed' : 'Refund Initiated'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100 dark:border-slate-800">
        <Button 
          variant="primary" 
          className="py-2.5 px-6 rounded-xl text-sm shadow-md flex-1 sm:flex-none"
          onClick={() => navigate(`/ticket/${booking.id}`, { state: { booking } })}
        >
          <QrCode className="w-4 h-4 mr-2" />
          View Ticket
        </Button>

        {isUpcoming && (
          <Button 
            variant="primary" 
            className="py-2.5 px-6 rounded-xl text-sm shadow-md flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
            onClick={() => navigate(`/track-bus/${booking.id}`)}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Track Bus
          </Button>
        )}

        {isUpcoming && (
          <Button 
            variant="outline" 
            className="py-2.5 px-6 rounded-xl text-sm border-indigo-200 dark:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex-1 sm:flex-none shadow-sm"
            onClick={() => navigate(`/route-planner/${booking.id}`)}
          >
            <Map className="w-4 h-4 mr-2" />
            Plan Route
          </Button>
        )}
        
        {isUpcoming && (
          <Button 
            variant="outline" 
            className="py-2.5 px-6 rounded-xl text-sm border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 flex-1 sm:flex-none"
            onClick={onCancel}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Cancel Booking
          </Button>
        )}

        {isCompleted && !hasReview && (
          <Button 
            variant="outline" 
            className="py-2.5 px-6 rounded-xl text-sm border-gray-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 flex-1 sm:flex-none"
            onClick={onRate}
          >
            <Star className="w-4 h-4 mr-2" />
            Rate Trip
          </Button>
        )}
        
        {isCompleted && hasReview && (
          <Button 
            variant="outline" 
            className="py-2.5 px-6 rounded-xl text-sm border-gray-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 flex-1 sm:flex-none"
            onClick={onRate} // Allow editing review
          >
            <Star className="w-4 h-4 mr-2" />
            Edit Review
          </Button>
        )}

        <div className="flex items-center gap-2 ml-auto w-full sm:w-auto">
          {!isCancelled && (
            <>
              <button className="flex-1 sm:flex-none flex items-center justify-center p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 transition-colors" title="Download">
                <Download className="w-4 h-4" />
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 transition-colors" title="Print">
                <Printer className="w-4 h-4" />
              </button>
            </>
          )}
          {isCancelled && (
            <Button variant="outline" className="py-2.5 px-6 rounded-xl text-sm w-full">
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              Book Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
