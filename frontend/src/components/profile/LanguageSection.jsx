import React, { useState } from 'react';
import { Globe, Save } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import Button from '../Button';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const LanguageSection = () => {
  const { user, updateProfile } = useAuth();
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('language_preference', i18n.language);
      await updateProfile(formData);
      toast.success('Language preference saved to your profile!');
    } catch (err) {
      toast.error('Failed to save language preference.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
        <Globe className="w-6 h-6 text-indigo-500" />
        Language Settings
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        Choose your preferred language for the BusGo platform. Your preference will be saved across devices.
      </p>

      <div className="max-w-md mb-8">
        <label className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1 mb-2 block">
          Select Language
        </label>
        <div className="bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-4">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
        <Button
          type="button"
          variant="primary"
          onClick={handleSave}
          isLoading={isLoading}
          className="py-3 px-8 rounded-xl font-bold"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Preference
        </Button>
      </div>
    </div>
  );
};

export default LanguageSection;
