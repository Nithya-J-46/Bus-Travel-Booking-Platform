import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const uidb64 = searchParams.get('uidb64');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!uidb64 || !token) {
      toast.error('Invalid or expired password reset link.');
      navigate('/login');
    }
  }, [uidb64, token, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = 'New password is required.';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long.';
    } else {
      const hasLower = /[a-z]/.test(newPassword);
      const hasUpper = /[A-Z]/.test(newPassword);
      const hasDigit = /[0-9]/.test(newPassword);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
      if (!hasLower || !hasUpper || !hasDigit || !hasSpecial) {
        newErrors.newPassword = 'Password must meet all complexity requirements.';
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await api.post('/reset-password/', {
        uidb64,
        token,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      toast.success('Password reset successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      const serverErrors = err.response?.data;
      if (serverErrors && typeof serverErrors === 'object') {
        setErrors(serverErrors);
        if (serverErrors.error) {
          toast.error(serverErrors.error);
        } else if (serverErrors.detail) {
          toast.error(serverErrors.detail);
        } else {
          toast.error('Failed to reset password. The link may have expired.');
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
        title="Reset Password"
        subtitle="Set a new secure password for your account"
        footer={footer}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <PasswordInput
            label="New Password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (errors.newPassword) setErrors({ ...errors, newPassword: null });
            }}
            error={errors.newPassword}
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

          <Button type="submit" variant="primary" size="full" isLoading={isLoading}>
            Update Password
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default ResetPassword;
