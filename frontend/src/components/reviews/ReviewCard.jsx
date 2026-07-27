import React, { memo } from 'react';
import { Star, ThumbsUp, MoreVertical, BadgeCheck, Flag, ShieldAlert } from 'lucide-react';
import { useReviews } from '../../context/ReviewContext';

const ReviewCard = ({ review }) => {
  const { voteHelpful, reportReview } = useReviews();

  const handleReport = () => {
    if (window.confirm('Are you sure you want to report this review?')) {
      reportReview(review.id, 'Inappropriate Content');
    }
  };

  if (review.status === 'hidden' || review.status === 'pending') {
    return null; // Don't show hidden/reported reviews in the public feed
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-lg">
            {review.userName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 dark:text-white">{review.userName}</h4>
              {review.trustedReviewer && (
                <div className="flex items-center gap-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  <BadgeCheck className="w-3 h-3" /> Trusted
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {new Date(review.timestamp).toLocaleDateString()} • {review.verified ? 'Verified Booking' : 'Unverified'}
            </p>
          </div>
        </div>

        <div className="relative group">
          <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 rounded-full transition-colors cursor-pointer">
            <MoreVertical className="w-4 h-4" />
          </button>
          
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button 
              onClick={handleReport}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-left cursor-pointer first:rounded-t-xl last:rounded-b-xl"
            >
              <Flag className="w-4 h-4" /> Report Review
            </button>
          </div>
        </div>
      </div>

      {/* Rating & Content */}
      <div className="mb-4">
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'}`} 
            />
          ))}
        </div>
        <h5 className="font-bold text-slate-900 dark:text-white mb-1">{review.title}</h5>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
          {review.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => voteHelpful(review.id)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          <ThumbsUp className="w-4 h-4" />
          Helpful ({review.helpfulVotes})
        </button>
        
        {review.recommend ? (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full">
            Recommends this route
          </span>
        ) : (
          <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-3 py-1.5 rounded-full">
            Does not recommend
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(ReviewCard);
