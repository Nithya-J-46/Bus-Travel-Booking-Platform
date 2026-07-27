import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const HelpContext = createContext();

export const useHelp = () => useContext(HelpContext);

const INITIAL_FAQS = [
  { id: 'f1', question: 'How do I cancel my booking?', answer: 'You can cancel your booking from the "My Bookings" section. Click on the booking you wish to cancel and select the "Cancel Booking" option. Refund will be processed as per the cancellation policy.', category: 'cancellation' },
  { id: 'f2', question: 'How can I download my ticket?', answer: 'Go to "My Bookings", select your journey, and click the "View E-Ticket" button. You can then download it as a PDF or share it directly.', category: 'ticket' },
  { id: 'f3', question: 'How do refunds work?', answer: 'Refunds for cancelled tickets are automatically processed to the original payment method within 5-7 business days. The refund amount depends on the time of cancellation.', category: 'refund' },
  { id: 'f4', question: 'Can I change my seat?', answer: 'Currently, seat changes after booking are not supported. You will need to cancel your existing booking and make a new one with your preferred seat.', category: 'booking' },
  { id: 'f5', question: 'How do reward points work?', answer: 'You earn reward points for every completed journey and by referring friends. Points can be redeemed for discounts, free upgrades, and vouchers in the Rewards Dashboard.', category: 'rewards' },
  { id: 'f6', question: 'How do I contact the driver?', answer: 'The driver\'s contact number becomes available on your Live Tracking page 1 hour before the journey starts.', category: 'tracking' },
  { id: 'f7', question: 'My payment failed but money was deducted', answer: 'Don\'t worry! If money was deducted but the booking failed, the amount is automatically refunded to your bank account within 3-4 working days.', category: 'payment' },
  { id: 'f8', question: 'How do I update my profile?', answer: 'You can update your personal details, email, and password from the "Profile" section in your account settings.', category: 'profile' }
];

const INITIAL_MESSAGES = [
  { id: 'm1', text: 'Hi 👋\nHow can I help you today?', sender: 'ai', timestamp: new Date().toISOString() }
];

export const HelpProvider = ({ children }) => {
  const [faqs] = useState(INITIAL_FAQS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Chat State
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Ticket State
  const [tickets, setTickets] = useState([
    { id: 'TKT-9281', subject: 'Payment failed for last booking', status: 'Resolved', date: new Date(Date.now() - 86400000 * 2).toISOString() }
  ]);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const simulateAIResponse = (userText) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let aiResponse = "I'm sorry, I didn't quite catch that. Could you please rephrase or select a category below? Our human agents are also available 24/7 if you need immediate assistance.";
      const lowerText = userText.toLowerCase();

      if (lowerText.includes('cancel') || lowerText.includes('cancellation')) {
        aiResponse = "To cancel your booking, please visit the 'My Bookings' section, select your upcoming trip, and click 'Cancel Booking'. Need me to take you there?";
      } else if (lowerText.includes('refund')) {
        aiResponse = "Refunds are processed automatically to your original payment method. It usually takes 5-7 business days to reflect in your account depending on your bank.";
      } else if (lowerText.includes('ticket') || lowerText.includes('download')) {
        aiResponse = "You can view and download your E-Ticket anytime from the 'My Bookings' page, or from the link sent to your email after booking.";
      } else if (lowerText.includes('track') || lowerText.includes('where')) {
        aiResponse = "You can track your bus in real-time! Just click on 'Track Live' from your Booking Confirmation or My Bookings page.";
      } else if (lowerText.includes('payment') || lowerText.includes('money')) {
        aiResponse = "If your money was deducted but the ticket wasn't confirmed, the amount will be automatically refunded within 3-4 working days. You can also file a support ticket below for us to check immediately.";
      } else if (lowerText.includes('human') || lowerText.includes('agent') || lowerText.includes('contact')) {
        aiResponse = "I can connect you to a human agent right away! Please use the 'Call Support' or 'Email Support' options below, or submit a Support Ticket.";
      }

      const newMessage = {
        id: Date.now().toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500); // 1.5s simulated delay
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    simulateAIResponse(text);
  };

  const submitTicket = (ticketData) => {
    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketData.subject,
      status: 'Open',
      date: new Date().toISOString()
    };
    setTickets(prev => [newTicket, ...prev]);
    toast.success(`Support Ticket ${newTicket.id} submitted successfully!`);
    return newTicket.id;
  };

  return (
    <HelpContext.Provider value={{
      faqs: filteredFaqs,
      searchQuery,
      setSearchQuery,
      messages,
      sendMessage,
      isTyping,
      isChatOpen,
      setIsChatOpen,
      tickets,
      submitTicket
    }}>
      {children}
    </HelpContext.Provider>
  );
};
