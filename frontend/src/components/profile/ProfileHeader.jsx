import React, { useRef, useState } from 'react';
import { Camera, Mail, Phone, Calendar, ShieldCheck, MapPin, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileHeader = ({ user, updateProfile }) => {
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image must be smaller than 2MB.');
        return;
      }
      setAvatarPreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('avatar', file);
      
      try {
        await updateProfile(formData);
        toast.success('Profile picture updated successfully!');
      } catch (error) {
        toast.error('Failed to update profile picture.');
        setAvatarPreview(null);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 mb-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Avatar Area */}
        <div className="relative group cursor-pointer shrink-0" onClick={() => fileInputRef.current?.click()}>
          <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-50 dark:bg-slate-900 border-4 border-white dark:border-[#111827] shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-105 relative z-10">
            {avatarPreview ? (
              <img loading="lazy" src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : user?.avatar ? (
              <img
                src={user.avatar.startsWith('http') ? user.avatar : `https://bus-travel-booking-platform-1.onrender.com${user.avatar}`}
                alt={user.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-indigo-500 font-bold text-4xl">
                {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
              </span>
            )}
            
            {/* Blur hover overlay */}
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="absolute bottom-1 right-1 z-20 w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-full flex items-center justify-center shadow-md transition-all group-hover:scale-110 border-2 border-white dark:border-[#111827]">
            <Camera className="w-4 h-4" />
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Info Area */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {user?.full_name}
            </h1>
            {user?.is_email_verified && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 w-fit mx-auto md:mx-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Verified</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-sm text-slate-600 dark:text-slate-400 mb-6">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="font-medium">{user?.mobile_number || 'Add mobile number'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">Member since {new Date(user?.date_joined || Date.now()).getFullYear()}</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
              <Gift className="w-4 h-4" />
              <span>Gold Tier</span>
            </div>
          </div>

          {/* Quick Stats & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-slate-100 dark:border-slate-800/80 pt-6 mt-auto">
            <div className="grid grid-cols-2 md:flex gap-4 md:gap-8">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">14</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Total Trips</span>
              </div>
              <div className="w-px h-10 bg-slate-100 dark:bg-slate-800 hidden md:block"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-slate-900 dark:text-white">1,250</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Reward Points</span>
              </div>
              <div className="w-px h-10 bg-slate-100 dark:bg-slate-800 hidden md:block"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-amber-500">4.8</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Avg Rating Given</span>
              </div>
            </div>

            <button 
              onClick={() => document.getElementById('personal-info-btn')?.click()} 
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold transition-colors cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
