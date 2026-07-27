import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, MapPin } from 'lucide-react';
import Button from '../../components/Button';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob-1"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob-2"></div>
      </div>

      <div className="relative z-10 max-w-lg w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 mx-auto mb-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-indigo-500 animate-bounce" />
          </div>
          
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Looks like you're off route!
          </h2>
          
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            The destination you are looking for does not exist, has been moved, or is temporarily unavailable. Let's get you back on track.
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

export default NotFoundPage;
