import React, { useState, useEffect } from 'react';
import { User, Save } from 'lucide-react';
import Button from '../Button';
import InputField from '../InputField';
import toast from 'react-hot-toast';

const PersonalInfoSection = ({ user, updateProfile }) => {
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Demo fields
  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState('1995-05-15');
  const [occupation, setOccupation] = useState('Software Engineer');
  const [language, setLanguage] = useState('English');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Karnataka');
  const [city, setCity] = useState('Bangalore');
  const [emergencyContact, setEmergencyContact] = useState('+91 9876543210');

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setGender(user.gender || 'other');
      setDob(user.date_of_birth || '');
      setCity(user.city || '');
      setState(user.state || '');
      setCountry(user.country || 'India');
      setEmergencyContact(user.emergency_contact || '');
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrors({ fullName: 'Full name is required.' });
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    try {
      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('gender', gender);
      if (dob) formData.append('date_of_birth', dob);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('country', country);
      formData.append('emergency_contact', emergencyContact);

      await updateProfile(formData);
      toast.success('Personal information updated successfully!');
    } catch (err) {
      const serverErrors = err.response?.data;
      if (serverErrors && typeof serverErrors === 'object') {
        const mappedErrors = {};
        if (serverErrors.full_name) mappedErrors.fullName = serverErrors.full_name[0];
        setErrors(mappedErrors);
        toast.error('Failed to update details. Please review fields.');
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
        <User className="w-6 h-6 text-indigo-500" />
        Personal Information
      </h2>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            id="fullName"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors({ ...errors, fullName: null });
            }}
            error={errors.fullName}
            icon={<User className="w-5 h-5" />}
            required
            disabled={isLoading}
          />
          
          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">Occupation</label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">Language</label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="flex flex-col gap-2 relative sm:col-span-2">
            <label className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">Emergency Contact</label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="Full Name & Phone Number"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="py-3 px-8 rounded-xl font-bold"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoSection;
