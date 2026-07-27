import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';
import { 
  Printer, Download, Share2, Mail, ArrowLeft, CheckCircle2, 
  MapPin, Clock, Users, Ticket, Wallet, Bus, Info, Navigation
} from 'lucide-react';
import Button from '../components/Button';

const ViewTicket = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const ticketRef = useRef(null);
  
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Prefer data from location state, fallback is an error if not present
    if (location.state?.booking) {
      setBooking(location.state.booking);
    } else {
      // In a real app, we would fetch the booking from API using bookingId here.
      // For this demo, we'll navigate back if no state is provided.
      toast.error('Ticket not found.');
      navigate('/my-bookings');
    }
  }, [location, navigate, bookingId]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    const element = ticketRef.current;
    if (!element) return;
    
    // The html2pdf.js configuration
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `BusGo_Ticket_${booking.pnr}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    toast.promise(
      html2pdf().set(opt).from(element).save(),
      {
        loading: 'Generating PDF...',
        success: 'Ticket downloaded successfully!',
        error: 'Failed to download PDF.'
      }
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: 'My BusGo E-Ticket',
      text: `My bus ticket from ${booking.source} to ${booking.destination} on ${booking.date}. PNR: ${booking.pnr}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`BusGo Ticket PNR: ${booking.pnr}\nLink: ${window.location.href}`);
        toast.success('Ticket link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing', err);
    }
  };

  const handleEmail = () => {
    toast.success('E-Ticket sent successfully to your registered email.');
  };

  // Safe fallback if some data is missing (from mock data vs confirmation state)
  const operator = booking.operator || booking.busInfo?.operator || 'Bus Operator';
  const busType = booking.busType || booking.busInfo?.type || 'A/C Sleeper';
  const source = booking.source || booking.searchData?.source || 'Source';
  const destination = booking.destination || booking.searchData?.destination || 'Destination';
  const date = booking.date || booking.searchData?.date || 'Date';
  const departureTime = booking.departureTime || booking.busInfo?.departureTime || '00:00';
  const arrivalTime = booking.arrivalTime || booking.busInfo?.arrivalTime || '00:00';
  const duration = booking.duration || booking.busInfo?.duration || '0h';
  const pnr = booking.pnr || 'PNR' + Math.floor(Math.random() * 100000000);
  const fare = booking.fare || booking.fareDetails?.total || 0;
  
  // Passengers array format can vary slightly between mock data and confirmation state
  const passengersList = booking.passengers || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f18] pt-24 pb-20 transition-colors duration-300 print:bg-white print:pt-0 print:pb-0">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="py-2 px-4 rounded-xl text-sm hidden sm:flex border-gray-200 dark:border-slate-800" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button variant="primary" className="py-2 px-4 rounded-xl text-sm bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20" onClick={() => navigate(`/track-bus/${booking.id || bookingId}`)}>
              <Navigation className="w-4 h-4 mr-2" /> Track Bus
            </Button>
            <Button variant="primary" className="py-2 px-4 rounded-xl text-sm" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" /> Download (PDF)
            </Button>
          </div>
        </div>

        {/* E-Ticket Container */}
        <div 
          ref={ticketRef}
          className="bg-white dark:bg-[#111827] rounded-[32px] overflow-hidden shadow-2xl shadow-indigo-500/10 border border-gray-200 dark:border-slate-800 relative ticket-container print:shadow-none print:border-none print:bg-white print:rounded-none"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 p-8 sm:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">B</span>
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight">BusGo</h1>
                  <p className="text-indigo-100 font-bold text-sm tracking-wide">E-Ticket</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 items-start sm:items-end w-full sm:w-auto">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full backdrop-blur-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Booking Confirmed</span>
                </div>
                <div className="flex sm:flex-col gap-4 sm:gap-1 w-full justify-between sm:text-right">
                  <div>
                    <span className="text-indigo-200 text-xs font-bold uppercase tracking-wider block">Booking ID</span>
                    <span className="text-base font-black">{booking.id || bookingId}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-indigo-200 text-xs font-bold uppercase tracking-wider block">PNR</span>
                    <span className="text-base font-black text-cyan-200">{pnr}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            {/* Journey Info */}
            <div className="mb-10">
              <h3 className="text-sm font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6">Journey Details</h3>
              
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                <div className="flex-1 w-full relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-indigo-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-inner">
                      <Bus className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div className="text-right">
                      <h4 className="text-lg font-black text-gray-900 dark:text-white">{operator}</h4>
                      <p className="text-xs font-bold text-gray-500 dark:text-slate-400">{busType}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8 relative">
                    <div className="flex-[1] text-left">
                      <p className="text-2xl font-black text-gray-900 dark:text-white mb-1">{departureTime}</p>
                      <p className="text-sm font-bold text-gray-500 dark:text-slate-400">{source}</p>
                      <p className="text-xs font-bold text-indigo-500 mt-1">{date}</p>
                    </div>

                    <div className="flex-[1.5] flex flex-col items-center px-4 relative z-10">
                      <div className="w-full h-px border-t-2 border-dashed border-gray-300 dark:border-slate-700 absolute top-1/2 -translate-y-1/2 -z-10"></div>
                      <div className="bg-white dark:bg-[#111827] px-4 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 text-center">
                        <span className="text-xs font-bold text-gray-500 dark:text-slate-400 block">{duration}</span>
                      </div>
                    </div>

                    <div className="flex-[1] text-right">
                      <p className="text-2xl font-black text-gray-900 dark:text-white mb-1">{arrivalTime}</p>
                      <p className="text-sm font-bold text-gray-500 dark:text-slate-400">{destination}</p>
                      <p className="text-xs font-bold text-indigo-500 mt-1">{booking.arrivalDate || date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-slate-800 my-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Passenger Info */}
              <div>
                <h3 className="text-sm font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Passenger Info
                </h3>
                <div className="space-y-4">
                  {passengersList.map((p, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-black text-gray-900 dark:text-white">{p.name || `${p.firstName} ${p.lastName}`}</p>
                        <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-0.5">{p.age} yrs, {p.gender}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Seat</p>
                        <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{p.seat}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boarding/Dropping & Payment Info */}
              <div className="flex flex-col gap-6">
                
                {/* Boarding Info */}
                <div>
                  <h3 className="text-sm font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Boarding & Dropping
                  </h3>
                  <div className="relative pl-6 border-l-2 border-indigo-100 dark:border-slate-800 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-indigo-50 dark:ring-indigo-900/30"></div>
                      <p className="text-sm font-black text-gray-900 dark:text-white">Boarding at {departureTime}</p>
                      <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-1">{source} Bus Stand</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-cyan-50 dark:ring-cyan-900/30"></div>
                      <p className="text-sm font-black text-gray-900 dark:text-white">Dropping at {arrivalTime}</p>
                      <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-1">{destination} Drop Point</p>
                    </div>
                  </div>
                </div>
                
                {/* Payment Info */}
                <div className="bg-indigo-50/50 dark:bg-slate-900/50 p-5 rounded-2xl border border-indigo-100/50 dark:border-slate-800">
                  <h3 className="text-sm font-black text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-indigo-500" /> Fare Breakdown
                  </h3>
                  <div className="space-y-2 text-sm font-bold text-gray-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Seat Fare</span>
                      <span className="text-gray-900 dark:text-white">₹{(fare * 0.85).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & Fees</span>
                      <span className="text-gray-900 dark:text-white">₹{(fare * 0.15).toFixed(2)}</span>
                    </div>
                    <div className="w-full h-px bg-gray-200 dark:bg-slate-700 my-2"></div>
                    <div className="flex justify-between items-center text-base">
                      <span className="text-gray-900 dark:text-white font-black">Total Paid</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-black">₹{parseFloat(fare).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <hr className="border-gray-100 dark:border-slate-800 my-8" />

            {/* QR Code and Instructions */}
            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start justify-between">
              <div className="flex-1 bg-amber-50/50 dark:bg-amber-500/5 rounded-2xl border border-amber-100 dark:border-amber-500/20 p-5">
                <h4 className="text-sm font-black text-amber-900 dark:text-amber-300 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Important Instructions
                </h4>
                <ul className="text-xs font-bold text-amber-800/80 dark:text-amber-200/70 space-y-2 list-disc pl-4">
                  <li>Reach boarding point at least 30 minutes before departure.</li>
                  <li>Carry a valid Government ID matching the passenger name.</li>
                  <li>Keep this e-ticket ready during boarding.</li>
                  <li>Follow the operator's luggage guidelines.</li>
                  <li>Contact customer support for assistance.</li>
                </ul>
              </div>
              
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="p-3 bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <QRCodeSVG value={`https://busgo.com/verify/${pnr}`} size={120} level="M" />
                </div>
                <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400 max-w-[140px] text-center">
                  Show this QR code while boarding.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Actions (Hide on Print) */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 print:hidden">
          <Button variant="outline" className="py-3 px-6 rounded-xl flex-1 sm:flex-none border-gray-200 dark:border-slate-800" onClick={handlePrint}>
            <Printer className="w-5 h-5 mr-2" /> Print Ticket
          </Button>
          <Button variant="outline" className="py-3 px-6 rounded-xl flex-1 sm:flex-none border-gray-200 dark:border-slate-800" onClick={handleEmail}>
            <Mail className="w-5 h-5 mr-2" /> Email
          </Button>
          <Button variant="primary" className="py-3 px-6 rounded-xl w-full sm:w-auto" onClick={() => navigate('/my-bookings')}>
            Back to My Bookings
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ViewTicket;
