import React from 'react';
import { MapPin, Plus, Home, Briefcase, Map, Edit2, Trash2 } from 'lucide-react';
import Button from '../Button';

const SavedAddressesSection = () => {
  const addresses = [
    { id: 1, type: 'Home', icon: Home, line1: '123, Silver Oak Apartments', line2: 'Whitefield', city: 'Bangalore', state: 'Karnataka', pin: '560066' },
    { id: 2, type: 'Office', icon: Briefcase, line1: 'Tech Park, Tower B', line2: 'Electronic City', city: 'Bangalore', state: 'Karnataka', pin: '560100' }
  ];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-6 h-6 text-indigo-500" />
          Saved Addresses
        </h2>
        <Button variant="primary" className="py-2 px-4 rounded-xl text-sm">
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map(addr => {
          const Icon = addr.icon;
          return (
            <div key={addr.id} className="p-5 rounded-2xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-black text-gray-900 dark:text-white">{addr.type}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-indigo-500 transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button className="text-gray-400 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              
              <div className="text-sm font-medium text-gray-600 dark:text-slate-400">
                <p>{addr.line1}</p>
                <p>{addr.line2}</p>
                <p>{addr.city}, {addr.state} - {addr.pin}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedAddressesSection;
