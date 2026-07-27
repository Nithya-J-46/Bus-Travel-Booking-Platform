import React from 'react';
import { ShieldCheck, Tag, Map, Headphones, ArrowRight, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const features = [
  {
    id: 1,
    title: 'Lowest Fares Guaranteed',
    desc: 'Get the best possible rates with direct operator discounts and exclusive promo code savings.',
    icon: <Tag className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />,
    color: 'from-indigo-500/10 to-indigo-500/0 hover:border-indigo-500/50'
  },
  {
    id: 2,
    title: 'Secure Payments',
    desc: 'Your transaction credentials are encrypted with bank-grade 256-bit SSL protocols for ultimate safety.',
    icon: <ShieldCheck className="w-7 h-7 text-cyan-500 dark:text-cyan-400" />,
    color: 'from-cyan-500/10 to-cyan-500/0 hover:border-cyan-500/50'
  },
  {
    id: 3,
    title: 'Live Bus Tracking',
    desc: 'Share live GPS route coordinates with friends and family to stay updated with real-time ETA updates.',
    icon: <Map className="w-7 h-7 text-emerald-500 dark:text-emerald-400" />,
    color: 'from-emerald-500/10 to-emerald-500/0 hover:border-emerald-500/50'
  },
  {
    id: 4,
    title: '24/7 Dedicated Help Desk',
    desc: 'Our customer support team is available round-the-clock to assist with bookings, delays, and cancellations.',
    icon: <Headphones className="w-7 h-7 text-indigo-550 dark:text-indigo-455" />,
    color: 'from-indigo-600/10 to-indigo-600/0 hover:border-indigo-650/50'
  }
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-12 sm:py-14 lg:py-16 relative bg-white dark:bg-[#0b0f19] transition-colors duration-300 overflow-hidden select-none">
      
      {/* Background blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <SectionHeading 
          badge="OUR BENEFITS" 
          icon={Sparkles} 
          title="Why Travel With BusGo" 
          subtitle="Experience the next generation of bus travel with our premium features and unwavering commitment to your safety and comfort."
        />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat) => (
            <div
              key={feat.id}
              className={`p-8 rounded-[28px] bg-slate-50/50 dark:bg-slate-900/20 border border-slate-150 dark:border-slate-800/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_15px_30px_rgba(99,102,241,0.05)] transition-all duration-350 hover:-translate-y-1 bg-gradient-to-b ${feat.color} text-left flex flex-col`}
            >
              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-950/80 shadow-md border border-slate-100 dark:border-slate-800/80 flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110 hover:rotate-3">
                {feat.icon}
              </div>
              
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-3">
                {feat.title}
              </h3>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed mb-6 flex-grow">
                {feat.desc}
              </p>

              <a
                href="#learn-more"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors mt-auto group"
              >
                Learn More
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
