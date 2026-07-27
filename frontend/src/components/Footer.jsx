import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-slate-950 dark:bg-[#050810] text-slate-400 dark:text-slate-400 pt-10 pb-6 border-t border-slate-900/60 dark:border-slate-900/50 transition-colors duration-300 relative overflow-hidden select-none">
      
      {/* Background animated soft glow accents */}
      <div className="absolute -top-32 -left-32 w-[350px] h-[350px] rounded-full bg-indigo-500/8 dark:bg-indigo-555/5 blur-3xl pointer-events-none animate-blob-1" />
      <div className="absolute bottom-0 -right-32 w-[350px] h-[350px] rounded-full bg-cyan-500/8 dark:bg-cyan-555/5 blur-3xl pointer-events-none animate-blob-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Responsive equal-width 5-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 mb-8">
          
          {/* Column 1: Logo + company description + social media icons */}
          <div className="space-y-4 flex flex-col items-start text-left">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-indigo-950/60 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-900/50 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
                <Bus className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <span className="tracking-tight text-white font-extrabold text-lg">
                Bus<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Go</span>
              </span>
            </Link>
            
            <p className="text-xs text-slate-400 dark:text-slate-400 leading-relaxed font-medium">
              {t('footer.description')}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-slate-900/80 dark:bg-slate-950/40 border border-slate-800 dark:border-slate-850 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.4)] transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5c0-.8.2-1.2 1.2-1.2H17V1h-2.8C10.7 1 9 2.7 9 5.8V8z" />
                </svg>
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-slate-900/80 dark:bg-slate-950/40 border border-slate-800 dark:border-slate-850 flex items-center justify-center text-slate-400 hover:text-white hover:bg-black hover:border-black hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.2 2.4h3.3L14.3 11l8.5 11.3h-6.7l-5.2-6.8-6 6.8H1l7.7-8.8L1.7 2.4h6.9l4.7 6.2 5-6.2zm-1.2 17.6h1.8L7.1 4.1H5.1l11.9 15.9z" />
                </svg>
              </a>
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-slate-900/80 dark:bg-slate-950/40 border border-slate-800 dark:border-slate-850 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:border-transparent hover:shadow-[0_0_15px_rgba(238,42,123,0.4)] transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#linkedin"
                className="w-9 h-9 rounded-full bg-slate-900/80 dark:bg-slate-950/40 border border-slate-800 dark:border-slate-850 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.4)] transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3.5 text-left">
            <h4 className="text-white font-extrabold text-xs tracking-wider uppercase pl-0.5">{t('footer.quick_links')}</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="#home" className="hover:text-white hover:text-indigo-400 transition-colors">{t('footer.home')}</a>
              </li>
              <li>
                <a href="#bus-search" className="hover:text-white hover:text-indigo-400 transition-colors">{t('footer.search')}</a>
              </li>
              <li>
                <a href="#routes" className="hover:text-white hover:text-indigo-400 transition-colors">{t('footer.routes')}</a>
              </li>
              <li>
                <a href="#offers" className="hover:text-white hover:text-indigo-400 transition-colors">{t('footer.offers')}</a>
              </li>
              <li>
                <a href="#community" className="hover:text-white hover:text-indigo-400 transition-colors">{t('footer.community')}</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white hover:text-indigo-400 transition-colors">{t('footer.contact')}</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3.5 text-left">
            <h4 className="text-white font-extrabold text-xs tracking-wider uppercase pl-0.5">{t('footer.company')}</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="#about" className="hover:text-white hover:text-cyan-400 transition-colors">{t('footer.about_us')}</a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white hover:text-cyan-400 transition-colors">{t('footer.careers')}</a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white hover:text-cyan-400 transition-colors">{t('footer.blog')}</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white hover:text-cyan-400 transition-colors">{t('footer.privacy_policy')}</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white hover:text-cyan-400 transition-colors">{t('footer.terms')}</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-3.5 text-left">
            <h4 className="text-white font-extrabold text-xs tracking-wider uppercase pl-0.5">Support</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="#help" className="hover:text-white hover:text-emerald-400 transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white hover:text-emerald-400 transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#cancellation" className="hover:text-white hover:text-emerald-400 transition-colors">Cancellation Policy</a>
              </li>
              <li>
                <a href="#refund" className="hover:text-white hover:text-emerald-400 transition-colors">Refund Policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-slate-900 dark:bg-slate-900/60" />

        {/* Bottom copyright & legal links bar */}
        <div className="pt-5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-500 dark:text-slate-550">
          <p>© 2026 BusGo. All Rights Reserved.</p>
          
          <div className="flex items-center gap-2">
            <a href="#privacy" className="hover:text-slate-350 dark:hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-slate-350 dark:hover:text-slate-400 transition-colors">Terms</a>
            <span>|</span>
            <a href="#cookies" className="hover:text-slate-350 dark:hover:text-slate-400 transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
