import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Upload, Info } from 'lucide-react';
import { useReviews } from '../../context/ReviewContext';
import Button from '../Button';

const ReviewModal = ({ isOpen, onClose, booking }) => {
  const { submitReview, getReviewByBooking } = useReviews();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recommend, setRecommend] = useState(true);
  
  const [existingReview, setExistingReview] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && booking) {
      const review = getReviewByBooking(booking.id);
      if (review) {
        setExistingReview(review);
        setRating(review.rating);
        setTitle(review.title);
        setDescription(review.description);
        setRecommend(review.recommend);
        
        // Calculate 24 hour timer
        const reviewDate = new Date(review.timestamp);
        const now = new Date();
        const diffHours = (now - reviewDate) / (1000 * 60 * 60);
        
        if (diffHours >= 24) {
          setIsLocked(true);
        } else {
          setIsLocked(false);
          const remainingMs = (24 * 60 * 60 * 1000) - (now - reviewDate);
          const hrs = Math.floor(remainingMs / (1000 * 60 * 60));
          const mins = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
          setTimeRemaining(`${hrs}h ${mins}m`);
        }
      } else {
        setExistingReview(null);
        setRating(0);
        setTitle('');
        setDescription('');
        setRecommend(true);
        setIsLocked(false);
      }
    }
  }, [isOpen, booking, getReviewByBooking]);

  const validate = () => {
    const newErrors = {};
    if (rating === 0) newErrors.rating = "Rating is required";
    if (title.length < 10 || title.length > 100) newErrors.title = "Title must be between 10 and 100 characters";
    if (description.length < 50 || description.length > 2000) newErrors.description = "Review must be between 50 and 2000 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLocked) return;
    
    if (validate()) {
      submitReview({
        bookingId: booking.id,
        db_id: booking.db_id,
        bus_id: booking.bus_id,
        userId: 'currentUser', // Mocked
        userName: 'Current User', // Mocked
        verified: true,
        rating,
        title,
        description,
        recommend
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-10 pb-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-full"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {existingReview ? (isLocked ? 'View Review' : 'Edit Review') : 'Write a Review'}
              </h2>
              <p className="text-sm text-slate-500 mt-1">Journey to {booking.destination}</p>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            {existingReview && !isLocked && (
              <div className="mb-6 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-400">Edit available for {timeRemaining}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-500">You can edit your review within 24 hours of submission. The rating cannot be changed after this period.</p>
                </div>
              </div>
            )}
            {isLocked && (
              <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 dark:text-slate-400">This review can no longer be edited because 24 hours have passed.</p>
              </div>
            )}

            <form id="review-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Star Rating */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Overall Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={isLocked}
                      className={`p-1 transition-transform ${!isLocked && 'hover:scale-110 cursor-pointer'}`}
                      onMouseEnter={() => !isLocked && setHoverRating(star)}
                      onMouseLeave={() => !isLocked && setHoverRating(0)}
                      onClick={() => !isLocked && setRating(star)}
                    >
                      <Star 
                        className={`w-10 h-10 transition-colors ${
                          (hoverRating || rating) >= star 
                            ? 'fill-amber-400 text-amber-400' 
                            : 'text-slate-200 dark:text-slate-700'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && <span className="text-rose-500 text-xs mt-2 font-semibold">{errors.rating}</span>}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Review Title</label>
                <input
                  type="text"
                  disabled={isLocked}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Summarize your experience..."
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${errors.title ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'} rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-colors disabled:opacity-50`}
                />
                <div className="flex justify-between mt-1">
                  {errors.title ? (
                    <span className="text-rose-500 text-xs font-semibold">{errors.title}</span>
                  ) : (
                    <span className="text-xs text-slate-500">Minimum 10 characters</span>
                  )}
                  <span className={`text-xs ${title.length > 100 ? 'text-rose-500' : 'text-slate-500'}`}>{title.length}/100</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Detailed Review</label>
                <textarea
                  disabled={isLocked}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="How was the driver? Was the bus clean? Did it depart on time?"
                  rows={5}
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${errors.description ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500'} rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-colors disabled:opacity-50 resize-none`}
                />
                <div className="flex justify-between mt-1">
                  {errors.description ? (
                    <span className="text-rose-500 text-xs font-semibold">{errors.description}</span>
                  ) : (
                    <span className="text-xs text-slate-500">Minimum 50 characters</span>
                  )}
                  <span className={`text-xs ${description.length > 2000 ? 'text-rose-500' : 'text-slate-500'}`}>{description.length}/2000</span>
                </div>
              </div>

              {/* Recommendation */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Would you recommend this route?</h4>
                  <p className="text-xs text-slate-500">Help other travellers make a decision.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    disabled={isLocked}
                    className="sr-only peer" 
                    checked={recommend}
                    onChange={(e) => setRecommend(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600 disabled:opacity-50"></div>
                </label>
              </div>

              {/* Photo Upload (Demo) */}
              {!isLocked && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Upload Photos (Optional)</label>
                  <button type="button" className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-indigo-500 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all cursor-pointer">
                    <Upload className="w-6 h-6 mb-2" />
                    <span className="text-sm font-semibold">Click to upload images</span>
                    <span className="text-xs mt-1">Maximum 5 images (JPG, PNG, WEBP)</span>
                  </button>
                </div>
              )}

            </form>
          </div>

          <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              {isLocked ? 'Close' : 'Cancel'}
            </Button>
            {!isLocked && (
              <Button type="submit" form="review-form" variant="primary">
                {existingReview ? 'Update Review' : 'Submit Review'}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReviewModal;
