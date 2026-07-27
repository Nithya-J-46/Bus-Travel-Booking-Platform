import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Ticket } from 'lucide-react';
import { useHelp } from '../../context/HelpContext';
import Button from '../Button';

const SupportTicket = () => {
  const { submitTicket, tickets } = useHelp();
  const [formData, setFormData] = useState({ category: 'Booking', subject: '', description: '', priority: 'Normal' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const id = submitTicket(formData);
      setSuccessId(id);
      setIsSubmitting(false);
      setFormData({ category: 'Booking', subject: '', description: '', priority: 'Normal' });
      
      setTimeout(() => setSuccessId(null), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <Ticket className="w-6 h-6 text-indigo-500" />
        <h3 className="text-xl font-black text-gray-900 dark:text-white">Submit a Ticket</h3>
      </div>

      <AnimatePresence mode="wait">
        {successId ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-10"
          >
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2">Ticket Submitted!</h4>
            <p className="text-sm font-medium text-gray-500 mb-2">Your ticket ID is <strong className="text-indigo-500">{successId}</strong></p>
            <p className="text-xs text-gray-400">Our team will get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Category</label>
                <select 
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Booking</option>
                  <option>Cancellation</option>
                  <option>Refund</option>
                  <option>Payment</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Priority</label>
                <select 
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Subject</label>
              <input 
                required
                type="text" 
                placeholder="Brief summary of the issue"
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 mb-1">Description</label>
              <textarea 
                required
                rows="4"
                placeholder="Provide details about your issue..."
                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full justify-center shadow-lg shadow-indigo-500/20"
              isLoading={isSubmitting}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Ticket
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      {tickets.length > 0 && (
        <div className="mt-8 border-t border-gray-100 dark:border-slate-800 pt-6">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Your Recent Tickets</h4>
          <div className="space-y-3">
            {tickets.slice(0, 3).map(ticket => (
              <div key={ticket.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                <div>
                  <p className="text-xs font-bold text-indigo-500 mb-0.5">{ticket.id}</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{ticket.subject}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                  ticket.status === 'Open' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTicket;
