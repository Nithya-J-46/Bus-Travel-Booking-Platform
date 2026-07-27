import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Ticket, Map, Compass, Globe, Bus, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../Button';
import SectionHeading from '../ui/SectionHeading';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseAbsolutePos, setMouseAbsolutePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
    setMouseAbsolutePos({
      x: clientX - rect.left,
      y: clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setMouseAbsolutePos({ x: -1000, y: -1000 });
  };

  const bgStyle = {
    transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
    transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const midStyle = {
    transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
    transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const fgStyle = {
    transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
    transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center bg-gradient-to-br from-[#F8FAFF] via-[#EEF6FF] to-[#E6F7FF] dark:from-indigo-950 dark:via-slate-950 dark:to-cyan-950 overflow-hidden px-4 sm:px-6 lg:px-8 py-20 lg:py-0 select-none transition-colors duration-300"
    >
      {/* Interactive Cursor Glow */}
      <div 
        className="absolute pointer-events-none rounded-full bg-indigo-500/10 dark:bg-indigo-400/8 blur-[100px] w-96 h-96 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 z-0"
        style={{
          left: `${mouseAbsolutePos.x}px`,
          top: `${mouseAbsolutePos.y}px`,
          opacity: mouseAbsolutePos.x === -1000 ? 0 : 1,
        }}
      />

      {/* Floating particles rising */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20 dark:opacity-20" style={bgStyle}>
        <div className="absolute w-1 h-1 bg-indigo-500 dark:bg-white rounded-full animate-ping" style={{ top: '15%', left: '12%', animationDuration: '3.5s' }} />
        <div className="absolute w-1.5 h-1.5 bg-cyan-500 dark:bg-white rounded-full animate-ping" style={{ top: '25%', left: '85%', animationDuration: '4.5s' }} />
        <div className="absolute w-1 h-1 bg-indigo-400 dark:bg-white rounded-full animate-ping" style={{ top: '65%', left: '18%', animationDuration: '5.5s' }} />
        <div className="absolute w-1.5 h-1.5 bg-indigo-500 dark:bg-white rounded-full animate-ping" style={{ top: '80%', left: '75%', animationDuration: '3s' }} />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl animate-blob-1" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] rounded-full bg-cyan-550/10 blur-3xl animate-blob-2" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Text Section (6 Cols) */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          <div className="text-center lg:text-left mb-8">
            <SectionHeading 
              badge="WELCOME TO BUSGO" 
              icon={Sparkles} 
              align="left"
              title={
                <>
                  {t('hero.title_prefix')}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-cyan-300 dark:to-indigo-300 drop-shadow-md">
                    {t('hero.title_highlight')}
                  </span>
                </>
              }
              subtitle={t('hero.subtitle')}
              className="lg:!mb-8 lg:[&>div]:hidden" // hide decorative blob in hero to not clash
            />
          </div>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('bus-search')}
              className="w-full sm:w-auto shadow-[0_4px_20px_rgba(99,102,241,0.35)]"
            >
              {t('hero.book_your_bus')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/explore-routes')}
              className="w-full sm:w-auto !border-2 !border-[#4F46E5] !text-[#4F46E5] !bg-white hover:!bg-[#4F46E5] hover:!text-white shadow-[0_8px_24px_rgba(79,70,229,0.15)] dark:!border-slate-700 dark:hover:!border-slate-500 dark:!text-white dark:!bg-slate-900/30 dark:hover:!bg-slate-900/50"
            >
              {t('hero.explore_routes')}
            </Button>
          </motion.div>
        </div>

        {/* Animation Section (6 Cols) */}
        <div className="lg:col-span-6 flex justify-center items-center relative min-h-[350px] sm:min-h-[450px]">
          
          {/* Floating Icons */}
          <div
            className="absolute top-[8%] left-[10%] p-3.5 bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/10 rounded-2xl backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-2xl transition-transform z-20"
            style={fgStyle}
          >
            <div className="animate-float-rotate-1">
              <Briefcase className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
            </div>
          </div>
          
          <div
            className="absolute bottom-[10%] left-[8%] p-3.5 bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/10 rounded-2xl backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-2xl transition-transform z-20"
            style={fgStyle}
          >
            <div className="animate-float-rotate-2">
              <Ticket className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
            </div>
          </div>

          <div
            className="absolute top-[12%] right-[10%] p-3.5 bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/10 rounded-2xl backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-2xl transition-transform z-20"
            style={fgStyle}
          >
            <div className="animate-float-rotate-3">
              <Map className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
            </div>
          </div>

          <div
            className="absolute bottom-[14%] right-[8%] p-3.5 bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/10 rounded-2xl backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:shadow-2xl transition-transform z-20"
            style={fgStyle}
          >
            <div className="animate-float-rotate-1">
              <Globe className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
            </div>
          </div>

          {/* SVG Illustration Container */}
          <div
            className="relative w-full max-w-md aspect-[4/3] flex flex-col justify-center items-center animate-[float-slow_10s_ease-in-out_infinite]"
            style={midStyle}
          >
            <svg viewBox="0 0 900 500" className="w-full h-full drop-shadow-[0_15px_40px_rgba(99,102,241,0.25)]">
              <defs>
                <linearGradient id="heroRouteGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="heroBusBody" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
                <linearGradient id="heroBusAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#0891B2" />
                </linearGradient>
                <linearGradient id="heroHeadlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FDE047" stopOpacity="0.6" />
                  <stop offset="40%" stopColor="#FDE047" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="heroBusGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.55" />
                  <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Path Underlay glow */}
              <path
                d="M 120,380 Q 250,150 450,280 T 780,220"
                fill="none"
                stroke="url(#heroRouteGlow)"
                strokeWidth="20"
                strokeLinecap="round"
                className="opacity-30 blur-[6px] pointer-events-none"
              />

              {/* Main curve path */}
              <path
                id="heroRoadPath"
                d="M 120,380 Q 250,150 450,280 T 780,220"
                fill="none"
                stroke="url(#heroRouteGlow)"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Dotted lane line */}
              <path
                d="M 120,380 Q 250,150 450,280 T 780,220"
                fill="none"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animate-route-line"
              />

              {/* Location Pins */}
              <g transform="translate(120, 380)">
                <circle r="14" fill="#6366F1" fillOpacity="0.15" />
                <circle r="6" fill="#6366F1" />
                <path
                  d="M -10,-32 C -10,-42 10,-42 10,-32 C 10,-22 0,-12 0,-12 C 0,-12 -10,-22 -10,-32 Z"
                  fill="#6366F1"
                  className="origin-bottom bounce-pin"
                  style={{ animation: 'float-slow 2.2s ease-in-out infinite' }}
                />
                <circle cx="0" cy="-32" r="4" fill="white" style={{ animation: 'float-slow 2.2s ease-in-out infinite' }} />
              </g>

              <g transform="translate(780, 220)">
                <circle r="16" fill="#06B6D4" fillOpacity="0.2" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle r="6" fill="#06B6D4" />
                <path
                  d="M -10,-32 C -10,-42 10,-42 10,-32 C 10,-22 0,-12 0,-12 C 0,-12 -10,-22 -10,-32 Z"
                  fill="#06B6D4"
                  className="origin-bottom bounce-pin"
                  style={{ animation: 'float-slow 2.5s ease-in-out infinite 0.5s' }}
                />
                <circle cx="0" cy="-32" r="4" fill="white" style={{ animation: 'float-slow 2.5s ease-in-out infinite 0.5s' }} />
              </g>

              {/* Bus Moving Group */}
              <g>
                <circle cx="0" cy="0" r="50" fill="url(#heroBusGlow)" className="blur-[7px] pointer-events-none" />
                
                <g transform="translate(0, -18)">
                  <polygon points="34,2 140,-15 140,25" fill="url(#heroHeadlightBeam)" className="headlight-pulse pointer-events-none" />
                  <rect x="-35" y="-12" width="70" height="26" rx="6" fill="url(#heroBusBody)" />
                  <rect x="-35" y="8" width="70" height="6" rx="1" fill="url(#heroBusAccent)" />
                  <path d="M 22,-8 L 32,-8 C 34,-8 35,-6 34,-3 L 31,6 C 30.5,7.2 29.3,8 28,8 L 22,8 Z" fill="#E2E8F0" opacity="0.9" />
                  <rect x="-28" y="-7" width="12" height="10" rx="2" fill="#334155" />
                  <rect x="-12" y="-7" width="12" height="10" rx="2" fill="#334155" />
                  <rect x="4" y="-7" width="12" height="10" rx="2" fill="#334155" />
                  
                  {/* Rear Wheel */}
                  <g transform="translate(-18, 15)">
                    <g className="rotate-wheel">
                      <circle cx="0" cy="0" r="7.5" fill="#0F172A" stroke="#475569" strokeWidth="2.5" />
                      <line x1="-7" y1="0" x2="7" y2="0" stroke="#64748B" strokeWidth="1.8" />
                      <line x1="0" y1="-7" x2="0" y2="7" stroke="#64748B" strokeWidth="1.8" />
                      <circle cx="0" cy="0" r="2.5" fill="#E2E8F0" />
                    </g>
                  </g>

                  {/* Front Wheel */}
                  <g transform="translate(18, 15)">
                    <g className="rotate-wheel">
                      <circle cx="0" cy="0" r="7.5" fill="#0F172A" stroke="#475569" strokeWidth="2.5" />
                      <line x1="-7" y1="0" x2="7" y2="0" stroke="#64748B" strokeWidth="1.8" />
                      <line x1="0" y1="-7" x2="0" y2="7" stroke="#64748B" strokeWidth="1.8" />
                      <circle cx="0" cy="0" r="2.5" fill="#E2E8F0" />
                    </g>
                  </g>

                  <circle cx="34" cy="3" r="2" fill="#FFFBEB" />
                  <rect x="-35" y="-3" width="1.5" height="6" rx="0.5" fill="#EF4444" />
                </g>

                <animateMotion dur="15s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#heroRoadPath" />
                </animateMotion>
              </g>
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
