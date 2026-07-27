import React from 'react';
import { CreditCard, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import Button from '../Button';

const PaymentMethodsSection = () => {
  const methods = [
    { id: 1, type: 'Visa', number: '•••• •••• •••• 4242', expiry: '12/28', default: true },
    { id: 2, type: 'Mastercard', number: '•••• •••• •••• 8888', expiry: '08/27', default: false },
    { id: 3, type: 'UPI', number: 'johndoe@okicici', expiry: null, default: false }
  ];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-indigo-500" />
          Payment Methods
        </h2>
        <Button variant="primary" className="py-2 px-4 rounded-xl text-sm">
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button>
      </div>

      <p className="text-xs font-bold text-amber-500 mb-6 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-xl border border-amber-100 dark:border-amber-500/20">
        Demo Mode: Payment methods shown here are for demonstration purposes only.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {methods.map(method => (
          <div key={method.id} className={`p-5 rounded-2xl border ${method.default ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900'} relative overflow-hidden transition-all hover:shadow-md`}>
            
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-6 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-[10px] font-black tracking-wider text-slate-500 dark:text-slate-400">
                {method.type.toUpperCase()}
              </div>
              {method.default && (
                <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-100 dark:bg-indigo-500/20 px-2 py-1 rounded-md">
                  <CheckCircle2 className="w-3 h-3" /> Default
                </div>
              )}
            </div>

            <p className="text-sm font-black text-gray-900 dark:text-white tracking-widest mb-1">{method.number}</p>
            {method.expiry && <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Valid Thru: {method.expiry}</p>}
            {!method.expiry && <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Linked Account</p>}

            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 hover:opacity-100 transition-opacity p-2">
              <button className="text-rose-500 hover:text-rose-600 bg-white dark:bg-slate-800 rounded p-1 shadow">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodsSection;
