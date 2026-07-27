import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User as UserIcon, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import SuccessRedirect from '../components/SuccessRedirect';

const Register = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }
    
    if (!email) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required.';
    } else if (!/^\+?[0-9]{7,15}$/.test(mobileNumber)) {
      newErrors.mobileNumber = 'Enter a valid mobile number (7 to 15 digits).';
    }

    // Password validations
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else {
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasDigit = /[0-9]/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (!hasLower || !hasUpper || !hasDigit || !hasSpecial) {
        newErrors.password = 'Password must meet all complexity requirements.';
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please correct the validation errors before submitting.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await register(
        email,
        fullName,
        mobileNumber,
        password,
        confirmPassword,
        acceptTerms
      );
      toast.success(data.message || 'Registration successful!');
      setIsRedirecting(true);
      setTimeout(() => {
        navigate('/login');
      }, 2200);
    } catch (err) {
      const serverErrors = err.response?.data;
      if (serverErrors && typeof serverErrors === 'object') {
        const mappedErrors = {};
        if (serverErrors.email) mappedErrors.email = serverErrors.email[0];
        if (serverErrors.full_name) mappedErrors.fullName = serverErrors.full_name[0];
        if (serverErrors.mobile_number) mappedErrors.mobileNumber = serverErrors.mobile_number[0];
        if (serverErrors.password) mappedErrors.password = serverErrors.password[0];
        if (serverErrors.confirm_password) mappedErrors.confirmPassword = serverErrors.confirm_password[0];
        if (serverErrors.accept_terms) mappedErrors.acceptTerms = serverErrors.accept_terms[0];
        
        setErrors(mappedErrors);
        
        if (serverErrors.non_field_errors) {
          toast.error(serverErrors.non_field_errors[0]);
        } else {
          toast.error('Registration failed. Please resolve the highlighted fields.');
        }
      } else {
        toast.error('Server error or connection failed. Please try again.');
      }
      setIsLoading(false);
    }
  };

  const footer = (
    <p className="dark:text-slate-400">
      Already have an account?{' '}
      <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-bold transition-all ml-1">
        Sign in here
      </Link>
    </p>
  );

  return (
    <AuthLayout>
      <AuthCard
        title={isRedirecting ? "" : "Create Account"}
        subtitle={isRedirecting ? "" : "Sign up for seamless bus bookings and special offers"}
        footer={isRedirecting ? null : footer}
      >
        {isRedirecting ? (
          <SuccessRedirect
            title="Registration Successful!"
            subtitle="Your account has been created successfully. Preparing your login..."
            message="Redirecting to Login..."
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Full Name"
            id="fullName"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors({ ...errors, fullName: null });
            }}
            error={errors.fullName}
            icon={<UserIcon className="w-5 h-5" />}
            required
            disabled={isLoading}
          />

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

          <InputField
            label="Mobile Number"
            id="mobileNumber"
            type="tel"
            placeholder="e.g. +1234567890"
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

          <PasswordInput
            label="Password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: null });
            }}
            error={errors.password}
            showStrength
            required
            disabled={isLoading}
          />

          <PasswordInput
            label="Confirm Password"
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

          <div className="mb-4 text-left">
            <label className="flex items-start text-xs text-slate-600 dark:text-slate-300 font-semibold select-none cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked);
                  if (errors.acceptTerms) setErrors({ ...errors, acceptTerms: null });
                }}
                disabled={isLoading}
                className="w-4 h-4 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 mr-2 accent-indigo-500 flex-shrink-0"
              />
              <span>
                I accept the{' '}
                <a href="#terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-[11px] text-red-500 font-bold">{errors.acceptTerms}</p>
            )}
          </div>

          <Button type="submit" variant="primary" size="full" isLoading={isLoading}>
            Sign Up
          </Button>

          {/* Social login divider */}
          <div className="relative my-2 select-none">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800/80"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[#0f172a] text-slate-500 font-semibold tracking-wide">Or register with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-1">
            <button
              type="button"
              disabled
              className="inline-flex justify-between items-center gap-2 border border-slate-200/50 dark:border-slate-700/50 px-3.5 py-2.5 rounded-xl text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50/30 dark:bg-slate-900/40 opacity-70 cursor-not-allowed select-none transition-all w-full grayscale-[0.5]"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114c-3.262 0-5.918-2.656-5.918-5.917c0-3.262 2.656-5.918 5.918-5.918c1.4 0 2.684.488 3.7 1.298l3.1-3.1C18.89 1.912 15.73 1 12.24 1C6.01 1 1 6.01 1 12.24s5.01 11.24 11.24 11.24c5.89 0 10.9-4.22 10.9-11.24c0-.768-.078-1.5-.23-2.185H12.24z"
                  />
                </svg>
                <span>Google</span>
              </div>
              <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-bold tracking-wide">Coming Soon</span>
            </button>
            <button
              type="button"
              disabled
              className="inline-flex justify-between items-center gap-2 border border-slate-200/50 dark:border-slate-700/50 px-3.5 py-2.5 rounded-xl text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50/30 dark:bg-slate-900/40 opacity-70 cursor-not-allowed select-none transition-all w-full grayscale-[0.5]"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </div>
              <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-bold tracking-wide">Coming Soon</span>
            </button>
          </div>
        </form>
      )}
    </AuthCard>
  </AuthLayout>
  );
};

export default Register;
