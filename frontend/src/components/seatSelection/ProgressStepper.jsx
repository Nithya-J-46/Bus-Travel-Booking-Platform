import React from 'react';
import { Check } from 'lucide-react';

const ProgressStepper = ({ currentStep = 2 }) => {
  const steps = [
    { id: 1, label: 'Search Results', status: currentStep > 1 ? 'completed' : 'current' },
    { id: 2, label: 'Seat Selection', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'upcoming' },
    { id: 3, label: 'Passenger Details', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'upcoming' },
    { id: 4, label: 'Payment', status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'current' : 'upcoming' },
    { id: 5, label: 'Confirmation', status: currentStep === 5 ? 'current' : 'upcoming' },
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4">
      <div className="flex items-start justify-between min-w-max md:w-full max-w-5xl mx-auto px-4 lg:px-12">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step */}
            <div className="flex flex-col items-center relative z-10 w-20 sm:w-32 shrink-0">
              <div 
                className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border-2 z-10 transition-colors duration-300 ${
                  step.status === 'completed' 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : step.status === 'current'
                      ? 'bg-indigo-600 border-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900'
                      : 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 text-gray-400 dark:text-slate-500'
                }`}
              >
                {step.status === 'completed' ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : step.status === 'current' ? (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                ) : (
                  <span className="text-xs font-bold">{step.id}</span>
                )}
              </div>
              <span className={`mt-2 text-[10px] sm:text-xs font-bold text-center transition-colors duration-300 ${
                step.status === 'current' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-[-16px] sm:mx-[-24px] mt-[15px] relative z-0">
                <div className={`absolute inset-0 transition-colors duration-300 ${step.status === 'completed' ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-slate-700'}`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;
