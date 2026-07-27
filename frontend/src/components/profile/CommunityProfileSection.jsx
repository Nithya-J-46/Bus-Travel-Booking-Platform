import React from 'react';
import { MessageSquare, Users, Award, Image as ImageIcon, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunityProfileSection = () => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <MessageSquare className="w-6 h-6 text-indigo-500" />
            Community Profile
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your contributions and interactions in the BusGo travel community.
          </p>
        </div>
        
        <Link 
          to="/community"
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors w-fit"
        >
          View Community <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
          <MessageSquare className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <div className="text-2xl font-black text-slate-900 dark:text-white">12</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Posts</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
          <ImageIcon className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <div className="text-2xl font-black text-slate-900 dark:text-white">45</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Photos</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
          <Heart className="w-6 h-6 text-rose-500 mx-auto mb-2" />
          <div className="text-2xl font-black text-slate-900 dark:text-white">284</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Likes Received</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
          <Users className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
          <div className="text-2xl font-black text-slate-900 dark:text-white">56</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Followers</div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Badges & Achievements</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 px-4 py-3 rounded-2xl">
            <Award className="w-6 h-6 text-amber-500" />
            <div>
              <div className="text-sm font-bold text-amber-900 dark:text-amber-400">Top Contributor</div>
              <div className="text-xs text-amber-700/70 dark:text-amber-500/70">August 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-4 py-3 rounded-2xl">
            <Award className="w-6 h-6 text-emerald-500" />
            <div>
              <div className="text-sm font-bold text-emerald-900 dark:text-emerald-400">Helpful Traveller</div>
              <div className="text-xs text-emerald-700/70 dark:text-emerald-500/70">Over 100 helpful votes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityProfileSection;
