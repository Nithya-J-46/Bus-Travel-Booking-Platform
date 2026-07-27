import React from 'react';
import { QrCode } from 'lucide-react';

const QRCodeCard = () => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 flex flex-col items-center justify-center animate-[fadeInUp_0.5s_ease-out_0.3s_both]">
      <div className="w-48 h-48 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center justify-center">
        {/* Dummy QR Code Pattern */}
        <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-1">
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={i} 
              className={`bg-slate-900 rounded-sm ${Math.random() > 0.4 ? 'opacity-100' : 'opacity-10'}`}
              style={{
                borderRadius: i === 0 || i === 4 || i === 20 || i === 24 ? '8px' : '2px'
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <h4 className="text-base font-black text-gray-900 dark:text-white flex items-center justify-center gap-2 mb-2">
          <QrCode className="w-5 h-5 text-indigo-500" />
          Boarding Pass
        </h4>
        <p className="text-xs font-bold text-gray-500 dark:text-slate-400">
          Show this QR code while boarding the bus.
        </p>
      </div>
    </div>
  );
};

export default QRCodeCard;
