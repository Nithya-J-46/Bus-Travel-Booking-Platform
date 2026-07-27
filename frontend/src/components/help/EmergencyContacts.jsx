import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const CONTACTS = [
  { id: 1, title: 'Customer Care', value: '1800-123-4567', icon: Phone, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
  { id: 2, title: 'Email Support', value: 'support@busgo.com', icon: Mail, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
  { id: 3, title: 'WhatsApp', value: '+91 98765 43210', icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
];

const EmergencyContacts = () => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800">
      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Emergency Contacts</h3>
      
      <div className="space-y-4">
        {CONTACTS.map((contact) => {
          const Icon = contact.icon;
          return (
            <div key={contact.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-indigo-100 transition-colors cursor-pointer group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${contact.bg} group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${contact.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-slate-400">{contact.title}</p>
                <p className="text-sm font-black text-gray-900 dark:text-white">{contact.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmergencyContacts;
