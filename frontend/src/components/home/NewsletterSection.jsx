import React, { useState } from 'react';
import { Mail, ArrowRight, BellRing, Send } from 'lucide-react';
import Button from '../Button';
import SectionHeading from '../ui/SectionHeading';
import InputField from '../InputField';
import toast from 'react-hot-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email address!');
      return;
    }
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success('Thank you for subscribing! Check your inbox for travel deals.');
      setEmail('');
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-white dark:bg-[#0b0f19] transition-colors duration-300 relative overflow-hidden select-none">
      
      {/* Background aurora glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Banner Card */}
        <div className="p-[1.5px] rounded-[32px] bg-gradient-to-r from-indigo-500/20 via-cyan-400/20 to-emerald-500/20 shadow-[0_20px_50px_rgba(99,102,241,0.08)]">
          
          <div className="bg-[#0f172a] dark:bg-[#0c111e] rounded-[30.5px] p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden flex flex-col items-center">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/2 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-550/3 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />
            
            <SectionHeading 
              badge="NEWSLETTER" 
              icon={Mail} 
              align="center"
              title="Unlock Special Passenger Offers" 
              subtitle="Subscribe to our weekly newsletter and receive instant route announcements, holiday discounts, and limited-edition travel coupons!"
              className="lg:!mb-8 mx-auto"
            />

            {/* Form */}
            <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3">
              
              <div className="w-full text-left">
                <InputField
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-5 h-5" />}
                  className="mb-0"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 shadow-lg shadow-indigo-500/25 h-[50px] shrink-0"
                icon={<Send className="w-4 h-4" />}
              >
                Subscribe
              </Button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};

export default NewsletterSection;
