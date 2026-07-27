import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShieldAlert, ArrowLeft } from 'lucide-react';
import Button from '../../components/Button';
import { motion } from 'framer-motion';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob-1"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob-2"></div>
      </div>

      <div className="relative z-10 max-w-lg w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 mx-auto mb-8 bg-rose-50 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-12 h-12 text-rose-500 animate-pulse" />
          </div>
          
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Access Denied
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            You do not have the required permissions to view this page. If you believe this is a mistake, please contact support or switch accounts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              icon={<ArrowLeft className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>
            <Button 
              variant="primary" 
              onClick={() => navigate('/')}
              icon={<Home className="w-4 h-4" />}
              className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 border-none"
            >
              Return Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
