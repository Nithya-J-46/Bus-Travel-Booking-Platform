import React from 'react';
import { CreditCard, Wallet, Smartphone, Building2, CheckCircle2 } from 'lucide-react';

const PaymentMethods = ({ selectedMethod, onMethodSelect }) => {
  const methods = [
    {
      id: 'upi',
      title: 'UPI',
      description: 'Google Pay, PhonePe, Paytm, BHIM',
      icon: Smartphone,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      id: 'card',
      title: 'Credit / Debit Card',
      description: 'Visa, Mastercard, RuPay, Amex',
      icon: CreditCard,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-500/10',
    },
    {
      id: 'netbanking',
      title: 'Net Banking',
      description: 'All major Indian banks supported',
      icon: Building2,
      color: 'text-cyan-500',
      bg: 'bg-cyan-50 dark:bg-cyan-500/10',
    },
    {
      id: 'wallet',
      title: 'Wallets',
      description: 'Amazon Pay, Mobikwik, Freecharge',
      icon: Wallet,
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {methods.map((method) => {
        const isSelected = selectedMethod === method.id;
        const Icon = method.icon;
        
        return (
          <div
            key={method.id}
            onClick={() => onMethodSelect(method.id)}
            className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 flex items-start gap-4 ${
              isSelected
                ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/20 shadow-md shadow-indigo-500/10 scale-[1.02]'
                : 'border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-sm'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${method.bg}`}>
              <Icon className={`w-6 h-6 ${method.color}`} />
            </div>
            
            <div className="flex-1 pr-6">
              <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">{method.title}</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                {method.description}
              </p>
            </div>

            <div className="absolute top-5 right-5">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                isSelected 
                  ? 'border-indigo-500 bg-indigo-500' 
                  : 'border-gray-300 dark:border-slate-600'
              }`}>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentMethods;
