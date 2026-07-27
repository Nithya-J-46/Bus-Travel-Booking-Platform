import React from 'react';
import { Smartphone, Star, CheckCircle, Bus } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const AppPromotion = () => {
  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-white dark:bg-[#0b0f19] transition-colors duration-300 relative overflow-hidden select-none">
      
      {/* Background soft glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Info Section (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <SectionHeading 
              badge="DOWNLOAD APP" 
              icon={Smartphone} 
              align="left"
              title={
                <>
                  Manage Your Bookings On The{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-550 to-cyan-400 font-black">
                    Go
                  </span>
                </>
              }
              subtitle="Download the BusGo application to secure quick bookings, exclusive mobile coupons, real-time bus alerts, and offline access to digital ticket PDFs."
              className="lg:!mb-8 lg:mx-0 mx-auto"
            />

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              {[
                'Instant One-Tap Ticket Bookings',
                'Live GPS Tracking & Delay Alerts',
                '100% Offline Ticket Access',
                'Exclusive 15% In-App Discounts'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-350">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Badges Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* App Store */}
              <a
                href="#appstore"
                className="flex items-center gap-3 bg-slate-900 dark:bg-slate-950 border border-slate-800 dark:border-slate-850 px-5 py-2.5 rounded-2xl hover:scale-102 hover:border-indigo-500/35 transition-all shadow-md w-48 text-left group"
              >
                <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.51-.62.73-1.16 1.87-1.01 2.98 1.12.09 2.27-.62 2.94-1.43z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Download on the</span>
                  <span className="text-sm font-black text-white leading-tight">App Store</span>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#googleplay"
                className="flex items-center gap-3 bg-slate-900 dark:bg-slate-950 border border-slate-800 dark:border-slate-850 px-5 py-2.5 rounded-2xl hover:scale-102 hover:border-indigo-500/35 transition-all shadow-md w-48 text-left group"
              >
                <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M3 5.27v13.46c0 .82.68 1.43 1.47 1.26l11.64-6.38L4.46 4.02C3.68 3.86 3 4.46 3 5.27zm14.59 5.86L6.5 5.07l10.9 6.06c.26.15.26.51 0 .66l-10.9 6.06 11.09-6.06c.26-.14.26-.51 0-.66z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Get it on</span>
                  <span className="text-sm font-black text-white leading-tight">Google Play</span>
                </div>
              </a>
            </div>

            {/* Micro Rating info */}
            <div className="flex items-center justify-center lg:justify-start gap-6 text-xs font-bold text-slate-450 dark:text-slate-500 pt-2">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-slate-800 dark:text-white font-extrabold text-sm flex items-center gap-1">
                  4.8 <Star className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                </span>
                <span>iOS App Store</span>
              </div>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-850" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-slate-800 dark:text-white font-extrabold text-sm flex items-center gap-1">
                  4.9 <Star className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                </span>
                <span>Android Play Store</span>
              </div>
            </div>

          </div>

          {/* Smartphone Mockup Column (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            
            {/* Phone outer bezel */}
            <div className="w-[280px] h-[560px] rounded-[48px] bg-slate-900 dark:bg-black p-3.5 shadow-2xl relative border-4 border-slate-800 dark:border-slate-900/80 animate-[float-slow_8s_ease-in-out_infinite] group">
              
              {/* Ear speaker / sensor bar */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 dark:bg-black rounded-full z-30 flex items-center justify-center gap-1.5 px-3">
                <div className="w-12 h-1 bg-slate-800 dark:bg-slate-900 rounded-full" />
                <div className="w-2.5 h-2.5 bg-slate-800 dark:bg-slate-900 rounded-full" />
              </div>

              {/* Volume & power side triggers mock */}
              <div className="absolute -left-[6px] top-24 w-1.5 h-12 bg-slate-850 rounded-r-lg" />
              <div className="absolute -left-[6px] top-40 w-1.5 h-12 bg-slate-855 rounded-r-lg" />
              <div className="absolute -right-[6px] top-28 w-1.5 h-16 bg-slate-850 rounded-l-lg" />

              {/* Screen Glass panel */}
              <div className="w-full h-full rounded-[38px] bg-[#0c111e] overflow-hidden relative border border-slate-800/50 flex flex-col pt-8">
                
                {/* Mock App Status Bar */}
                <div className="px-5 py-1.5 flex justify-between items-center text-[10px] text-slate-400 font-extrabold select-none">
                  <span>9:41</span>
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span className="w-3.5 h-2 border border-slate-400 rounded-sm" />
                  </div>
                </div>

                {/* Mock App Header */}
                <div className="px-4 py-2 border-b border-slate-900 flex justify-between items-center bg-[#0e1525]/90 backdrop-blur-md">
                  <div className="flex items-center gap-1.5">
                    <Bus className="w-4 h-4 text-indigo-400" />
                    <span className="text-[11px] font-black text-white">BusGo App</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-900/50">
                    BLR ➜ GOA
                  </span>
                </div>

                {/* Mock Results Area */}
                <div className="p-3 space-y-3.5 flex-grow overflow-hidden select-none">
                  
                  {/* Result Card 1 */}
                  <div className="p-3 bg-[#131b2e] rounded-2xl border border-indigo-500/10 flex flex-col gap-2 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-indigo-400 uppercase">National Express</span>
                      <span className="text-xs font-black text-white">₹899</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-450 font-bold">
                      <div>
                        <p className="text-white text-xs font-black">22:00</p>
                        <p>Majestic</p>
                      </div>
                      <div className="h-px bg-slate-800 flex-grow mx-3 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      </div>
                      <div className="text-right">
                        <p className="text-white text-xs font-black">06:30</p>
                        <p>Panaji</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-900 pt-2 text-[9px] font-extrabold text-slate-400">
                      <span>Volvo AC Sleeper</span>
                      <span className="text-emerald-450">4 Seats Left</span>
                    </div>
                  </div>

                  {/* Result Card 2 */}
                  <div className="p-3 bg-[#131b2e] rounded-2xl border border-indigo-500/10 flex flex-col gap-2 text-left opacity-90">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-indigo-455 uppercase">SwiftTravel</span>
                      <span className="text-xs font-black text-white">₹999</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-450 font-bold">
                      <div>
                        <p className="text-white text-xs font-black">21:15</p>
                        <p>Madiwala</p>
                      </div>
                      <div className="h-px bg-slate-800 flex-grow mx-3" />
                      <div className="text-right">
                        <p className="text-white text-xs font-black">05:45</p>
                        <p>Mapusa</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-900 pt-2 text-[9px] font-extrabold text-slate-400">
                      <span>Multi-Axle Scania</span>
                      <span className="text-amber-500">12 Seats Left</span>
                    </div>
                  </div>

                  {/* Result Card 3 (cutoff) */}
                  <div className="p-3 bg-[#131b2e] rounded-2xl border border-indigo-500/5 flex flex-col gap-2 text-left opacity-50">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400">Royal Cruiser</span>
                      <span className="text-xs font-black text-white">₹799</span>
                    </div>
                  </div>

                </div>

                {/* Mock Home indicator bar */}
                <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto mb-2" />

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AppPromotion;
