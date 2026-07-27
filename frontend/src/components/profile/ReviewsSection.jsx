import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { useReviews } from '../../context/ReviewContext';
import ReviewCard from '../reviews/ReviewCard';

const ReviewsSection = () => {
  const { reviews } = useReviews();

  // Filter reviews to only show those written by the logged-in user (simulated, since all reviews in context are user's in this demo)
  const userReviews = reviews || [];

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
      <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
        <Star className="w-6 h-6 text-indigo-500" />
        My Reviews
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        Manage the reviews you've written for your completed journeys.
      </p>

      <div className="space-y-4">
        {userReviews.length > 0 ? (
          userReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="py-12 text-center text-slate-500 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
            <MessageSquare className="w-8 h-8 text-slate-300 mb-3" />
            <p className="font-bold text-slate-700 dark:text-slate-300">No reviews yet.</p>
            <p className="text-sm mt-1">Book a trip and share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
