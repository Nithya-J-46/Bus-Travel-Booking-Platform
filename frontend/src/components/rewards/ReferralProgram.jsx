import React, { useState } from 'react';
import { Copy, Share2, Check } from 'lucide-react';
import { useRewards } from '../../context/RewardsContext';
import Button from '../Button';

const ReferralProgram = () => {
  const { stats } = useRewards();
  const [copied, setCopied] = useState(false);
  const referralCode = 'BUSGO-NITHYA99';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-black mb-2">Refer & Earn</h3>
        <p className="text-indigo-100 text-sm font-medium mb-6 max-w-sm">
          Invite your friends to BusGo! They get a 10% discount on their first ride, and you earn 50 reward points when they complete it.
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider mb-1">Your Code</p>
            <p className="text-lg font-black tracking-wider">{referralCode}</p>
          </div>
          <button 
            onClick={handleCopy}
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/10 rounded-xl p-3">
            <p className="text-xs font-bold text-indigo-200">Friends Joined</p>
            <p className="text-xl font-black">{stats.totalReferrals}</p>
          </div>
          <div className="bg-black/10 rounded-xl p-3">
            <p className="text-xs font-bold text-indigo-200">Points Earned</p>
            <p className="text-xl font-black">{stats.referralPoints}</p>
          </div>
        </div>

        <Button 
          variant="secondary" 
          className="w-full justify-center bg-white text-indigo-600 hover:bg-indigo-50 border-0 shadow-lg shadow-black/10"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Invite Link
        </Button>
      </div>
    </div>
  );
};

export default ReferralProgram;
