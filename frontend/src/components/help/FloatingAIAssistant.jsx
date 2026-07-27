import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User as UserIcon } from 'lucide-react';
import { useHelp } from '../../context/HelpContext';

const SUGGESTIONS = [
  "Where is my bus?",
  "How do I cancel?",
  "When will I receive my refund?",
  "Download my ticket",
  "Contact support"
];

const FloatingAIAssistant = () => {
  const { isChatOpen, setIsChatOpen, messages, sendMessage, isTyping } = useHelp();
  const [inputText, setInputText] = useState('');
  const [showRating, setShowRating] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isChatOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const endChat = () => {
    setShowRating(true);
  };

  const submitRating = () => {
    setShowRating(false);
    setIsChatOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[9999]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`relative ${isChatOpen ? 'hidden' : 'block'}`}
        >
          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
            Need Help?
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            className="group relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-indigo-500/50 transition-all overflow-hidden"
          >
            {/* Glassmorphism subtle overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <MessageSquare className="w-6 h-6 md:w-7 md:h-7 relative z-10" />
            
            {/* Pulse Animation Badge */}
            {messages.length <= 1 && (
              <>
                <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white z-20"></span>
                <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full animate-ping z-10"></span>
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[9999] w-[calc(100vw-2.5rem)] md:w-[420px] max-w-[420px] h-[550px] md:h-[650px] max-h-[calc(100vh-5rem)] bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800/50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AI Travel Assistant</h3>
                  <p className="text-[10px] font-medium text-indigo-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!showRating && messages.length > 1 && (
                  <button onClick={endChat} className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg hover:bg-white/30 transition-colors">
                    End Chat
                  </button>
                )}
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            {showRating ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">⭐</span>
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">Was this helpful?</h3>
                <p className="text-sm text-gray-500 mb-6">Please rate your experience with our AI assistant.</p>
                <div className="flex gap-2 mb-8">
                  {[1,2,3,4,5].map(star => (
                    <button key={star} onClick={submitRating} className="text-2xl hover:scale-125 transition-transform">⭐</button>
                  ))}
                </div>
                <button onClick={submitRating} className="text-sm font-bold text-gray-400 hover:text-gray-600">Skip</button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20' : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                        }`}>
                          {msg.sender === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                          msg.sender === 'user' 
                            ? 'bg-indigo-600 text-white rounded-tr-sm' 
                            : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 border border-gray-100 dark:border-slate-700 rounded-tl-sm shadow-sm'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-tl-sm shadow-sm flex items-center gap-1">
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                {!isTyping && messages.length === 1 && (
                  <div className="p-3 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-[#111827] flex gap-2 overflow-x-auto custom-scrollbar">
                    {SUGGESTIONS.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="shrink-0 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-[#111827] border-t border-gray-100 dark:border-slate-800 shrink-0">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:text-white"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim() || isTyping}
                      className="w-11 h-11 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-slate-700 text-white rounded-xl transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAIAssistant;
