import React, { useState } from 'react';
import { CreditCard, Wallet, Landmark, Smartphone } from 'lucide-react';

const PaymentForms = ({ selectedMethod }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    upiId: '',
    bank: '',
    wallet: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
      if (formattedValue.length > 0) {
        formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || '';
      }
    }
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
      }
    }
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const inputClass = "w-full px-4 py-3.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all";
  const errorClass = "border-rose-500 dark:border-rose-500 focus:ring-rose-500";
  const labelClass = "block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1.5 ml-1";

  if (selectedMethod === 'card') {
    return (
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 w-full">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-indigo-500" />
          Enter Card Details
        </h3>
        
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="0000 0000 0000 0000"
              className={`${inputClass} tracking-widest ${errors.cardNumber ? errorClass : ''}`}
            />
          </div>
          
          <div>
            <label className={labelClass}>Name on Card</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="e.g. John Doe"
              className={`${inputClass} ${errors.cardName ? errorClass : ''}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Expiry Date</label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className={`${inputClass} tracking-widest ${errors.expiry ? errorClass : ''}`}
              />
            </div>
            <div>
              <label className={labelClass}>CVV</label>
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                className={`${inputClass} tracking-widest ${errors.cvv ? errorClass : ''}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="saveCard" className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
            <label htmlFor="saveCard" className="text-sm font-medium text-gray-600 dark:text-slate-400 cursor-pointer">
              Securely save this card for faster payments
            </label>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'upi') {
    return (
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 w-full">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Smartphone className="w-6 h-6 text-emerald-500" />
          Pay via UPI
        </h3>
        
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Enter UPI ID</label>
            <div className="flex gap-3">
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleInputChange}
                placeholder="username@upi"
                className={`${inputClass} flex-1 ${errors.upiId ? errorClass : ''}`}
              />
              <button className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-bold rounded-xl transition-colors">
                Verify
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 ml-1">
              A payment request will be sent to your UPI app.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'netbanking') {
    return (
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 w-full">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Landmark className="w-6 h-6 text-cyan-500" />
          Select Bank
        </h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {['HDFC', 'SBI', 'ICICI', 'Axis'].map(bank => (
              <button key={bank} className="py-3 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-sm hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all text-gray-700 dark:text-slate-300">
                {bank}
              </button>
            ))}
          </div>
          <div>
            <label className={labelClass}>Other Banks</label>
            <select className={`${inputClass} appearance-none cursor-pointer`}>
              <option value="">Select your bank</option>
              <option value="pnb">Punjab National Bank</option>
              <option value="bob">Bank of Baroda</option>
              <option value="yes">Yes Bank</option>
              <option value="kotak">Kotak Mahindra</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'wallet') {
    return (
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-slate-800 transition-colors duration-300 w-full">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Wallet className="w-6 h-6 text-purple-500" />
          Link Wallet
        </h3>
        
        <div className="space-y-4">
          {['Amazon Pay', 'Mobikwik', 'Freecharge'].map(wallet => (
            <label key={wallet} className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all">
              <div className="flex items-center gap-3">
                <input type="radio" name="wallet" value={wallet} className="w-4 h-4 text-purple-600 focus:ring-purple-500" />
                <span className="font-bold text-gray-800 dark:text-slate-200">{wallet}</span>
              </div>
              <span className="text-xs font-bold text-gray-500 dark:text-slate-400">Link Account</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentForms;
