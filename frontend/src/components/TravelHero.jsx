import React, { useState } from 'react';
import { Briefcase, Ticket, Map, Compass, Globe } from 'lucide-react';

const TravelHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseAbsolutePos, setMouseAbsolutePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left - rect.width / 2) / (rect.width / 2); // -1 to 1 range
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

  // Parallax translation helpers
  const bgStyle = {
    transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
    transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const midStyle = {
    transform: `translate(${mousePos.x * 16}px, ${mousePos.y * 16}px)`,
    transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const fgStyle = {
    transform: `translate(${mousePos.x * 26}px, ${mousePos.y * 26}px)`,
    transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-theme-bg p-12 text-theme-text transition-colors duration-500"
    >
      {/* Cursor-following Glow */}
      <div 
        className="absolute pointer-events-none rounded-full bg-white/40 dark:bg-indigo-400/8 blur-[85px] w-72 h-72 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 z-0"
        style={{
          left: `${mouseAbsolutePos.x}px`,
          top: `${mouseAbsolutePos.y}px`,
          opacity: mouseAbsolutePos.x === -1000 ? 0 : 1,
        }}
      />

      {/* Background stars (SaaS Aurora feel) */}
      <div className="absolute inset-0 opacity-0 dark:opacity-40 pointer-events-none select-none transition-opacity duration-500" style={bgStyle}>
        <div className="absolute top-[10%] left-[10%] w-1.5 h-1.5 bg-white/80 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[25%] left-[80%] w-2 h-2 bg-white/70 rounded-full animate-ping" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[60%] left-[15%] w-1.5 h-1.5 bg-cyan-300/80 rounded-full animate-ping" style={{ animationDuration: '5s' }} />
        <div className="absolute top-[75%] left-[85%] w-2 h-2 bg-indigo-300/80 rounded-full animate-ping" style={{ animationDuration: '3.5s' }} />
        <div className="absolute top-[35%] left-[30%] w-1.5 h-1.5 bg-white/90 rounded-full animate-pulse" style={{ animationDuration: '2.5s' }} />
        <div className="absolute top-[50%] left-[70%] w-1.5 h-1.5 bg-cyan-400/90 rounded-full animate-pulse" style={{ animationDuration: '3.5s' }} />
        <div className="absolute top-[80%] left-[45%] w-1 h-1 bg-white/60 rounded-full" />
      </div>

      {/* Clouds Gliding in the Background */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-40 dark:opacity-[0.04] transition-opacity duration-500" style={bgStyle}>
        <svg viewBox="0 0 900 500" className="w-full h-full">
          <g className="glide-cloud-1">
            <path d="M 50,80 Q 70,60 100,75 T 160,75 T 220,75 L 220,110 L 50,110 Z" fill="white" />
          </g>
          <g className="glide-cloud-2">
            <path d="M 200,160 Q 230,135 260,155 T 320,155 T 380,155 L 380,195 L 200,195 Z" fill="white" />
          </g>
        </svg>
      </div>

      {/* Ambient background glowing circles */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-white/50 dark:bg-indigo-500/12 blur-3xl animate-blob-1 transition-colors duration-500" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-300/30 dark:bg-cyan-500/12 blur-3xl animate-blob-2 transition-colors duration-500" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-sky-300/30 dark:bg-emerald-500/5 blur-3xl animate-blob-3 transition-colors duration-500" />

      {/* Floating particles rising */}
      <div className="absolute w-2 h-2 rounded-full bg-cyan-400/20 animate-particle-1" style={{ left: '20%', bottom: '5%' }} />
      <div className="absolute w-3 h-3 rounded-full bg-indigo-400/30 animate-particle-2" style={{ left: '60%', bottom: '10%' }} />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/20 animate-particle-3" style={{ left: '80%', bottom: '15%' }} />
      <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400/25 animate-particle-4" style={{ left: '40%', bottom: '8%' }} />

      {/* Floating Travel Widgets with slow floating and gentle rotations */}
      <div
        className="absolute top-[12%] left-[15%] p-3.5 bg-theme-card border border-theme-border rounded-2xl backdrop-blur-md shadow-lg transition-all"
        style={fgStyle}
      >
        <div className="animate-float-rotate-1">
          <Briefcase className="w-8 h-8 text-indigo-400" />
        </div>
      </div>
      
      <div
        className="absolute bottom-[15%] left-[12%] p-3.5 bg-theme-card border border-theme-border rounded-2xl backdrop-blur-md shadow-lg transition-all"
        style={fgStyle}
      >
        <div className="animate-float-rotate-2">
          <Ticket className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      <div
        className="absolute top-[18%] right-[15%] p-3.5 bg-theme-card border border-theme-border rounded-2xl backdrop-blur-md shadow-lg transition-all"
        style={fgStyle}
      >
        <div className="animate-float-rotate-3">
          <Map className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      <div
        className="absolute bottom-[20%] right-[15%] p-3.5 bg-theme-card border border-theme-border rounded-2xl backdrop-blur-md shadow-lg transition-all"
        style={fgStyle}
      >
        <div className="animate-float-rotate-1">
          <Compass className="w-8 h-8 text-indigo-400" />
        </div>
      </div>

      <div
        className="absolute top-[8%] left-[48%] -translate-x-1/2 p-3 bg-theme-card border border-theme-border rounded-2xl backdrop-blur-md shadow-lg transition-all"
        style={fgStyle}
      >
        <div className="animate-float-rotate-2">
          <Globe className="w-7 h-7 text-cyan-400" />
        </div>
      </div>

      {/* Interactive Main Travel Illustration Container */}
      <div
        className="relative z-10 w-full max-w-2xl aspect-[4/3] flex flex-col justify-center items-center animate-[float-slow_12s_ease-in-out_infinite]"
        style={midStyle}
      >
        
        {/* SVG Curved Route & Moving Bus */}
        <svg viewBox="0 0 900 500" className="w-full h-full drop-shadow-[0_10px_35px_rgba(99,102,241,0.25)]">
          <defs>
            {/* Gradients */}
            <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--route-glow-1)" stopOpacity="0.95" />
              <stop offset="50%" stopColor="var(--route-glow-2)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--route-glow-3)" stopOpacity="0.85" />
            </linearGradient>
            
            <linearGradient id="busBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--bus-body-1)" />
              <stop offset="100%" stopColor="var(--bus-body-2)" />
            </linearGradient>

            <linearGradient id="busAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>

            {/* Glowing headlight beam */}
            <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#FDE047" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
            </linearGradient>

            {/* Subtle radial glow behind the bus */}
            <radialGradient id="busGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--bus-glow-1)" stopOpacity="0.8" />
              <stop offset="40%" stopColor="var(--route-glow-2)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--bus-glow-1)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Road Path Route Underlay for flowing neon glow effect */}
          <path
            d="M 120,380 Q 250,150 450,280 T 780,220"
            fill="none"
            stroke="url(#routeGlow)"
            strokeWidth="20"
            strokeLinecap="round"
            className="opacity-25 blur-[5px] pointer-events-none"
          />

          {/* Road Path Route (The curve itself) */}
          <path
            id="roadPath"
            d="M 120,380 Q 250,150 450,280 T 780,220"
            fill="none"
            stroke="url(#routeGlow)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Dotted Overlay path representing moving lane coordinates */}
          <path
            d="M 120,380 Q 250,150 450,280 T 780,220"
            fill="none"
            stroke="var(--theme-text)"
            strokeOpacity="0.5"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-route-line"
          />

          {/* Location Pins */}
          
          {/* Pin 1 (Start) */}
          <g transform="translate(120, 380)">
            <circle r="15" fill="#6366F1" fillOpacity="0.15" />
            <circle r="7" fill="#6366F1" />
            <path
              d="M -12,-38 C -12,-50 12,-50 12,-38 C 12,-26 0,-14 0,-14 C 0,-14 -12,-26 -12,-38 Z"
              fill="#6366F1"
              className="origin-bottom bounce-pin"
              style={{ animation: 'float-slow 2s ease-in-out infinite' }}
            />
            <circle
              cx="0"
              cy="-38"
              r="4.5"
              fill="white"
              style={{ animation: 'float-slow 2s ease-in-out infinite' }}
            />
          </g>

          {/* Pin 2 (Middle Vertex) */}
          <g transform="translate(450, 280)">
            <circle r="15" fill="#10B981" fillOpacity="0.15" />
            <circle r="7" fill="#10B981" />
            <path
              d="M -12,-38 C -12,-50 12,-50 12,-38 C 12,-26 0,-14 0,-14 C 0,-14 -12,-26 -12,-38 Z"
              fill="#10B981"
              className="origin-bottom bounce-pin"
              style={{ animation: 'float-slow 2.4s ease-in-out infinite 0.4s' }}
            />
            <circle
              cx="0"
              cy="-38"
              r="4.5"
              fill="white"
              style={{ animation: 'float-slow 2.4s ease-in-out infinite 0.4s' }}
            />
          </g>

          {/* Pin 3 (Destination End) */}
          <g transform="translate(780, 220)">
            <circle r="18" fill="#06B6D4" fillOpacity="0.2" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle r="15" fill="#06B6D4" fillOpacity="0.15" />
            <circle r="7" fill="#06B6D4" />
            <path
              d="M -12,-38 C -12,-50 12,-50 12,-38 C 12,-26 0,-14 0,-14 C 0,-14 -12,-26 -12,-38 Z"
              fill="#06B6D4"
              className="origin-bottom bounce-pin"
              style={{ animation: 'float-slow 2.2s ease-in-out infinite 0.8s' }}
            />
            <circle
              cx="0"
              cy="-38"
              r="4.5"
              fill="white"
              style={{ animation: 'float-slow 2.2s ease-in-out infinite 0.8s' }}
            />
          </g>

          {/* Dynamic Animated Bus Group following the roadPath */}
          <g>
            {/* Moving radial glow behind the bus */}
            <circle cx="0" cy="0" r="60" fill="url(#busGlow)" className="blur-[12px] pointer-events-none" />

            {/* Styled Modern Bus Graphic */}
            <g transform="translate(0, -18)"> {/* offset to center on path */}
              {/* Headlight soft glowing beam projection */}
              <polygon
                points="34,2 140,-15 140,25"
                fill="url(#headlightBeam)"
                className="headlight-pulse pointer-events-none"
              />
              
              {/* Bus main body */}
              <rect x="-35" y="-12" width="70" height="26" rx="6" fill="url(#busBody)" />
              {/* Bus secondary trim */}
              <rect x="-35" y="8" width="70" height="6" rx="1" fill="url(#busAccent)" />
              {/* Glass windshield front */}
              <path d="M 22,-8 L 32,-8 C 34,-8 35,-6 34,-3 L 31,6 C 30.5,7.2 29.3,8 28,8 L 22,8 Z" fill="#E2E8F0" opacity="0.9" />
              {/* Passenger windows */}
              <rect x="-28" y="-7" width="12" height="10" rx="2" fill="#334155" />
              <rect x="-12" y="-7" width="12" height="10" rx="2" fill="#334155" />
              <rect x="4" y="-7" width="12" height="10" rx="2" fill="#334155" />
              
              {/* Rear Wheel translating group (spins naturally centered at 0,0) */}
              <g transform="translate(-18, 15)">
                <g className="rotate-wheel">
                  <circle cx="0" cy="0" r="7.5" fill="#0F172A" stroke="#475569" strokeWidth="2.5" />
                  <line x1="-7" y1="0" x2="7" y2="0" stroke="#64748B" strokeWidth="1.8" />
                  <line x1="0" y1="-7" x2="0" y2="7" stroke="#64748B" strokeWidth="1.8" />
                  <circle cx="0" cy="0" r="2.5" fill="#E2E8F0" />
                </g>
              </g>

              {/* Front Wheel translating group (spins naturally centered at 0,0) */}
              <g transform="translate(18, 15)">
                <g className="rotate-wheel">
                  <circle cx="0" cy="0" r="7.5" fill="#0F172A" stroke="#475569" strokeWidth="2.5" />
                  <line x1="-7" y1="0" x2="7" y2="0" stroke="#64748B" strokeWidth="1.8" />
                  <line x1="0" y1="-7" x2="0" y2="7" stroke="#64748B" strokeWidth="1.8" />
                  <circle cx="0" cy="0" r="2.5" fill="#E2E8F0" />
                </g>
              </g>
              
              {/* Headlights and taillight dots */}
              <circle cx="34" cy="3" r="2" fill="#FFFBEB" />
              <rect x="-35" y="-3" width="1.5" height="6" rx="0.5" fill="#EF4444" />
            </g>
            
            {/* The animation constraint binding it to path with 14 second duration */}
            <animateMotion
              dur="14s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#roadPath" />
            </animateMotion>
          </g>
        </svg>

        {/* Text descriptions overlay */}
        <div className="text-center mt-6 max-w-md select-none">
          <h2 className="text-2xl font-bold tracking-tight text-theme-text">
            Journey Beyond Boundaries
          </h2>
          <p className="text-sm text-theme-text-sec mt-2 font-medium leading-relaxed">
            Explore routes, book instant tickets, and manage your travel journey through our premium SaaS interface.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TravelHero;
