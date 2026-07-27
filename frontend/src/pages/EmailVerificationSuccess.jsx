import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { api } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [statusState, setStatusState] = useState('loading'); // loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const uidb64 = searchParams.get('uidb64');
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!uidb64 || !token) {
        setStatusState('error');
        setErrorMessage('Verification tokens are missing from the URL.');
        return;
      }

      try {
        await api.post('/verify-email/', { uidb64, token });
        setStatusState('success');
      } catch (err) {
        setStatusState('error');
        const errData = err.response?.data;
        if (errData && errData.error) {
          setErrorMessage(errData.error);
        } else {
          setErrorMessage('The email verification link is invalid or has expired.');
        }
      }
    };

    verifyUserEmail();
  }, [uidb64, token]);

  const successFooter = (
    <Button
      variant="primary"
      size="full"
      onClick={() => navigate('/login')}
    >
      Proceed to Login
    </Button>
  );

  const errorFooter = (
    <Button
      variant="outline"
      size="full"
      onClick={() => navigate('/login')}
    >
      Return to Login
    </Button>
  );

  if (statusState === 'loading') {
    return (
      <AuthLayout>
        <AuthCard title="Verifying Email" subtitle="Please wait while we confirm your email address...">
          <div className="py-8 flex justify-center">
            <LoadingSpinner size="large" />
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  if (statusState === 'success') {
    return (
      <AuthLayout>
        <AuthCard
          title="Email Verified!"
          subtitle="Your email address has been successfully verified"
          footer={successFooter}
        >
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle className="w-20 h-20 text-emerald-500 mb-4 stroke-[1.5] animate-bounce" />
            <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
              Thank you for verifying your email. Your account is now fully active, and you can access all features of the Bus Travel Booking Platform.
            </p>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Verification Failed"
        subtitle="We were unable to verify your email address"
        footer={errorFooter}
      >
        <div className="flex flex-col items-center py-6 text-center">
          <XCircle className="w-20 h-20 text-red-500 mb-4 stroke-[1.5]" />
          <p className="text-slate-700 dark:text-slate-300 font-semibold mb-2">Error Details:</p>
          <p className="text-slate-600 dark:text-slate-400 bg-red-50 dark:bg-red-950/20 px-4 py-2 border border-red-100 dark:border-red-900/30 rounded-2xl text-xs mb-4">
            {errorMessage}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
            Please make sure you clicked the correct link from the console. If the link expired, please register again to receive a new link.
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default EmailVerificationSuccess;
