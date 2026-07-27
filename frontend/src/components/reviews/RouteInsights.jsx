import React, { useState, useMemo } from 'react';
import { Star, TrendingUp, ThumbsDown, MessageSquare, Filter, ChevronDown, Check } from 'lucide-react';
import { useReviews } from '../../context/ReviewContext';
import ReviewCard from './ReviewCard';

const RouteInsights = () => {
  const { calculateAverage, getDistribution, totalActiveReviews } = useReviews();
  
  const average = calculateAverage();
  const distribution = getDistribution();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6">Review Insights</h3>
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Overall Rating */}
        <div className="flex flex-col items-center justify-center min-w-[150px]">
          <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">{average}</div>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                className={`w-4 h-4 ${star <= Math.round(average) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'}`} 
              />
            ))}
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{totalActiveReviews} Reviews</p>
        </div>

        {/* Distribution Bars */}
        <div className="flex-1 space-y-2 border-l border-slate-100 dark:border-slate-800 pl-8">
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 w-4">{star}</span>
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full" 
                  style={{ width: `${totalActiveReviews ? (distribution[star] / totalActiveReviews) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-500 w-6 text-right">{distribution[star]}</span>
            </div>
          ))}
        </div>

        {/* AI Style Insights */}
        <div className="flex-1 space-y-4 border-l border-slate-100 dark:border-slate-800 pl-8">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Top Positive</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">"Punctual departure", "Clean seats", "Friendly driver"</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-rose-600 shrink-0">
              <ThumbsDown className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Top Negative</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">"AC too cold", "Traffic delay"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReviewList = () => {
  const { reviews } = useReviews();
  const [sortBy, setSortBy] = useState('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortedReviews = useMemo(() => {
    let sorted = [...reviews];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating);
      case 'helpful':
        return sorted.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
      default:
        return sorted;
    }
  }, [reviews, sortBy]);

  const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'highest', label: 'Highest Rating' },
    { id: 'lowest', label: 'Lowest Rating' },
    { id: 'helpful', label: 'Most Helpful' }
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-slate-900 dark:text-white">Recent Reviews</h3>
        
        <div className="relative">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-300 transition-colors"
          >
            <Filter className="w-4 h-4" />
            {sortOptions.find(o => o.id === sortBy)?.label}
            <ChevronDown className="w-4 h-4" />
          </button>

          {isSortOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-20">
                {sortOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => { setSortBy(opt.id); setIsSortOpen(false); }}
                    className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-left"
                  >
                    <span className={sortBy === opt.id ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}>
                      {opt.label}
                    </span>
                    {sortBy === opt.id && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {sortedReviews.length > 0 ? (
          sortedReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No reviews yet</h4>
            <p className="text-sm text-slate-500">Be the first traveller to share your experience on this route.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteInsights;
