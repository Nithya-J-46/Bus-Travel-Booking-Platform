import React from 'react';
import { RefreshCcw, Home, AlertTriangle } from 'lucide-react';
import Button from '../../components/Button';
import { motion } from 'framer-motion';

const ServerErrorPage = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="relative z-10 max-w-lg w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 mx-auto mb-8 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            System Error
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            We've encountered an unexpected internal error. Our technical team has been notified. Please try refreshing the page or returning home.
          </p>

          {error && (
            <div className="mb-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-left text-xs font-mono text-slate-500 dark:text-slate-400 overflow-auto max-h-32">
              {error.toString()}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              icon={<RefreshCcw className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Reload Page
            </Button>
            <Button 
              variant="primary" 
              onClick={() => window.location.href = '/'}
              icon={<Home className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Return Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServerErrorPage;
