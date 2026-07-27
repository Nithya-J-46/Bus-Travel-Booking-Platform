import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2 } from 'lucide-react';

const PollWidget = () => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const poll = {
    question: "Which bus operator provides the most comfortable sleeper buses?",
    totalVotes: 1420,
    options: [
      { id: 1, text: 'IntrCity SmartBus', votes: 650, percent: 46 },
      { id: 2, text: 'VRL Travels', votes: 420, percent: 30 },
      { id: 3, text: 'SRS Travels', votes: 200, percent: 14 },
      { id: 4, text: 'Orange Tours', votes: 150, percent: 10 }
    ]
  };

  const handleVote = (id) => {
    if (hasVoted) return;
    setSelectedOption(id);
    setHasVoted(true);
  };

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-indigo-500" />
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Community Poll</h2>
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        {poll.question}
      </h3>

      <div className="space-y-3">
        {poll.options.map((option) => {
          const isSelected = selectedOption === option.id;
          
          return (
            <div 
              key={option.id}
              onClick={() => handleVote(option.id)}
              className={`relative overflow-hidden rounded-xl border p-3 cursor-pointer transition-all ${
                hasVoted 
                  ? isSelected ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50'
                  : 'border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              {/* Progress Bar Background */}
              {hasVoted && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${option.percent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`absolute top-0 left-0 bottom-0 opacity-20 ${isSelected ? 'bg-indigo-500' : 'bg-gray-400'}`}
                />
              )}
              
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {hasVoted && isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  <span className={`font-semibold ${isSelected ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-700 dark:text-gray-200'}`}>
                    {option.text}
                  </span>
                </div>
                {hasVoted && (
                  <span className="font-bold text-sm text-gray-900 dark:text-white">
                    {option.percent}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 font-medium">
        {poll.totalVotes.toLocaleString()} total votes • 2 days left
      </div>
    </div>
  );
};

export default PollWidget;
