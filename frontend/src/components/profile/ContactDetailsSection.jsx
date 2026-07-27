import React, { useState, useEffect } from 'react';
import { Phone, Mail, Save, AlertCircle } from 'lucide-react';
import Button from '../Button';
import InputField from '../InputField';
import toast from 'react-hot-toast';

const ContactDetailsSection = ({ user, updateProfile }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setMobileNumber(user.mobile_number || '');
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!mobileNumber) {
      setErrors({ mobileNumber: 'Mobile number is required.' });
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    try {
      const formData = new FormData();
      formData.append('mobile_number', mobileNumber);

      await updateProfile(formData);
      toast.success('Contact details updated successfully!');
    } catch (err) {
      const serverErrors = err.response?.data;
      if (serverErrors && typeof serverErrors === 'object') {
        const mappedErrors = {};
        if (serverErrors.mobile_number) mappedErrors.mobileNumber = serverErrors.mobile_number[0];
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
        <Phone className="w-6 h-6 text-indigo-500" />
        Contact Details
      </h2>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Read-only email */}
        <div className="flex flex-col gap-2 relative opacity-70">
          <label className="text-[11px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={user?.email || ''}
              disabled
              className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-gray-500 cursor-not-allowed"
            />
          </div>
          <p className="text-[10px] font-bold text-amber-500 flex items-center gap-1 ml-1 mt-1">
            <AlertCircle className="w-3 h-3" /> Email address cannot be changed.
          </p>
        </div>

        <InputField
          label="Mobile Number"
          id="mobileNumber"
          value={mobileNumber}
          onChange={(e) => {
            setMobileNumber(e.target.value);
            if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: null });
          }}
          error={errors.mobileNumber}
          icon={<Phone className="w-5 h-5" />}
          required
          disabled={isLoading}
        />

        <InputField
          label="Emergency Contact (Demo)"
          id="emergencyContact"
          value={emergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
          icon={<Phone className="w-5 h-5 text-rose-500" />}
          disabled={isLoading}
        />

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

export default ContactDetailsSection;
