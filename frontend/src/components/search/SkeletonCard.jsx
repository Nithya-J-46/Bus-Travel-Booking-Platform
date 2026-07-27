import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/50 dark:border-slate-800/80 mb-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-6 animate-pulse">
        
        {/* Left Side */}
        <div className="flex-1 flex flex-col sm:flex-row gap-6 justify-between border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800/80 pb-6 lg:pb-0 lg:pr-6">
          <div className="flex flex-col space-y-3 w-32">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2 mt-2"></div>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center gap-4 lg:min-w-[280px]">
            <div className="flex flex-col space-y-2 w-16">
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-full"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 mx-auto sm:mx-0"></div>
            </div>
            
            <div className="flex-1 w-full px-4 flex flex-col items-center space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-lg w-12"></div>
              <div className="h-1 bg-slate-200 dark:bg-slate-800 rounded-full w-full"></div>
            </div>

            <div className="flex flex-col space-y-2 w-16 items-end sm:items-start">
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-full"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 ml-auto sm:ml-0"></div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-48 flex flex-col justify-between pt-2 lg:pt-0 space-y-4">
          <div className="flex flex-row lg:flex-col justify-between items-center lg:items-end">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-20"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-16 mt-2"></div>
          </div>
          <div className="h-11 bg-slate-200 dark:bg-slate-800 rounded-xl w-full"></div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonCard;
