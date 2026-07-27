import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  const colorClasses = {
    primary: 'border-primary border-t-transparent dark:border-indigo-400 dark:border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-slate-300 border-t-slate-600 dark:border-slate-700 dark:border-t-slate-300',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size] || sizeClasses.medium} ${colorClasses[color] || colorClasses.primary}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
