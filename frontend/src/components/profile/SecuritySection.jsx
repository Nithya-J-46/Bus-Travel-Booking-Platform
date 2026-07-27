import React, { useState } from 'react';
import { Shield, Key, Smartphone, Laptop, LogOut, Trash2, Download } from 'lucide-react';
import PasswordInput from '../PasswordInput';
import Button from '../Button';
import toast from 'react-hot-toast';

const SecuritySection = ({ changePassword }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('All password fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'New passwords do not match.' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await changePassword(oldPassword, newPassword, confirmPassword);
      toast.success('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const serverErrors = err.response?.data;
      if (serverErrors && typeof serverErrors === 'object') {
        setErrors(serverErrors);
        if (serverErrors.old_password) {
          toast.error(serverErrors.old_password[0]);
        } else if (serverErrors.new_password) {
          toast.error(serverErrors.new_password[0]);
        } else {
          toast.error('Failed to change password. Please check input requirements.');
        }
      } else {
        toast.error('Server error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Shield className="w-6 h-6 text-indigo-500" />
        Security Settings
      </h2>

      <div className="space-y-8">
        {/* Password Change */}
        <div>
          <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-slate-800 pb-2">Change Password</h3>
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
            <PasswordInput
              label="Current Password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                if (errors.old_password) setErrors({ ...errors, old_password: null });
              }}
              error={errors.old_password}
              required
              disabled={isLoading}
            />

            <PasswordInput
              label="New Password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.new_password) setErrors({ ...errors, new_password: null });
              }}
              error={errors.new_password}
              showStrength
              required
              disabled={isLoading}
            />

            <PasswordInput
              label="Confirm New Password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
              }}
              error={errors.confirmPassword}
              required
              disabled={isLoading}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                icon={<Key className="w-4 h-4" />}
                className="w-full sm:w-auto py-3 px-6 rounded-xl font-bold"
              >
                Update Password
              </Button>
            </div>
          </form>
        </div>

        {/* 2FA Demo */}
        <div>
          <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-slate-800 pb-2">Two-Factor Authentication</h3>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <div>
              <h4 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-500" /> Authenticator App
              </h4>
              <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mt-1">
                Add an extra layer of security to your account.
              </p>
            </div>
            <Button variant="outline" className="shrink-0 text-sm py-2 px-4 rounded-xl" onClick={() => toast('2FA setup requires backend integration.', { icon: 'ℹ️' })}>
              Enable 2FA
            </Button>
          </div>
        </div>

        {/* Active Sessions Demo */}
        <div>
          <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-slate-800 pb-2">Active Sessions</h3>
          <div className="space-y-3">
            
            <div className="flex items-center justify-between p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-900/20">
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Windows PC - Chrome</p>
                  <p className="text-[11px] font-bold text-gray-500">Bangalore, India • Current Session</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 px-2 py-1 rounded">Active</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">iPhone 13 - Safari</p>
                  <p className="text-[11px] font-bold text-gray-500">Mumbai, India • Last active 2h ago</p>
                </div>
              </div>
              <button className="text-[10px] font-black uppercase tracking-wider text-rose-500 hover:text-rose-600 bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded transition-colors">
                Revoke
              </button>
            </div>

          </div>
        </div>

      </div>
      {/* Active Sessions & Logout (Demo) */}
      <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Active Sessions</h3>
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl mb-4">
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Windows PC - Chrome</p>
            <p className="text-xs text-slate-500">Current Session • Bangalore, India</p>
          </div>
          <div className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full text-xs font-bold">Active</div>
        </div>
        
        <button 
          onClick={() => toast.success('Logged out of all other devices (Demo)')}
          className="flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-500/10 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout from other devices
        </button>
      </div>

      {/* Account Actions */}
      <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 text-rose-600">Danger Zone</h3>
        <div className="p-6 border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl">
          <h4 className="font-bold text-slate-900 dark:text-white mb-1">Delete Account</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button 
            onClick={() => {
              if(window.confirm('Are you sure you want to delete your account? This action cannot be undone. (Demo)')) {
                toast.success('Account deletion requested. (Demo)');
              }
            }}
            className="flex items-center gap-2 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-sm shadow-rose-500/20"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
