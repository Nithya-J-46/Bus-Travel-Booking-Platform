import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { api } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [simulatedLink, setSimulatedLink] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await api.post('/forgot-password/', { email });
      setIsSubmitted(true);
      toast.success('Reset link sent!');
      if (response.data.reset_link) {
        setSimulatedLink(response.data.reset_link);
      }
    } catch (err) {
      const serverErrors = err.response?.data;
      if (serverErrors && typeof serverErrors === 'object') {
        setErrors(serverErrors);
        if (serverErrors.email) {
          toast.error(serverErrors.email[0]);
        } else if (serverErrors.detail) {
          toast.error(serverErrors.detail);
        } else {
          toast.error('Unable to send link. Please double check the email.');
        }
      } else {
        toast.error('Server error or connection failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const footer = (
    <Link
      to="/login"
      className="inline-flex items-center justify-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-bold transition-all"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Login
    </Link>
  );

  return (
    <AuthLayout>
      <AuthCard
        title="Forgot Password"
        subtitle="No worries, we'll send you instruction details to reset your password"
        footer={footer}
      >
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Email Address"
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              error={errors.email}
              icon={<Mail className="w-5 h-5" />}
              required
              disabled={isLoading}
            />

            <Button type="submit" variant="primary" size="full" isLoading={isLoading}>
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 rounded-2xl text-xs font-semibold border border-emerald-100 dark:border-emerald-900/30">
              An email containing password reset instructions has been sent to **{email}** (simulated).
            </div>
            
            {simulatedLink && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-2xl text-left">
                <p className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">
                  Developer Mode (Simulated Link):
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                  Click the button below to carry out the password reset:
                </p>
                <a
                  href={simulatedLink}
                  className="inline-block bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 shadow-sm transition-all"
                >
                  Reset Password Now
                </a>
              </div>
            )}
            
            <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed">
              Didn't receive the email? Check your spam folder or click "Back to Login" to try another email address.
            </p>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPassword;
