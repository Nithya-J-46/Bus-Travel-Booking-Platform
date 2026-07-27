import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Upload, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import Button from '../Button';

const CATEGORIES = [
  'Bus Cleanliness',
  'Seat Comfort',
  'Staff Behaviour',
  'Punctuality',
  'Journey Experience',
  'Value for Money'
];

const EXPERIENCE_CHIPS = [
  'Very Comfortable', 'Clean Bus', 'On Time', 'Friendly Staff',
  'Smooth Journey', 'Safe Driving', 'Affordable', 'Good AC',
  'Charging Ports', 'Wi-Fi', 'Blankets', 'Water Bottle'
];

const StarRating = ({ rating, onChange, size = 'md' }) => {
  const [hover, setHover] = useState(0);
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={`focus:outline-none transition-all duration-200 ${(hover || rating) >= star ? 'scale-110' : 'scale-100 hover:scale-110'}`}
        >
          <Star 
            className={`${size === 'lg' ? 'w-10 h-10' : 'w-6 h-6'} transition-colors duration-200 ${
              (hover || rating) >= star 
                ? 'text-indigo-500 dark:text-indigo-400 fill-indigo-500 dark:fill-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' 
                : 'text-gray-300 dark:text-slate-600'
            }`} 
          />
        </button>
      ))}
    </div>
  );
};

const RateTripModal = ({ isOpen, onClose, onSubmit, booking }) => {
  const [overallRating, setOverallRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState({});
  const [selectedChips, setSelectedChips] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [recommend, setRecommend] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (booking?.review) {
        setOverallRating(booking.review.overallRating || 0);
        setCategoryRatings(booking.review.categoryRatings || {});
        setSelectedChips(booking.review.selectedChips || []);
        setFeedback(booking.review.feedback || '');
        setRecommend(booking.review.recommend);
        setPhotos(booking.review.photos || []);
      } else {
        setOverallRating(0);
        setCategoryRatings({});
        setSelectedChips([]);
        setFeedback('');
        setRecommend(null);
        setPhotos([]);
      }
    }
  }, [isOpen, booking]);

  if (!isOpen || !booking) return null;

  const toggleChip = (chip) => {
    setSelectedChips(prev => 
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (overallRating === 0) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(booking.id, {
        overallRating,
        categoryRatings,
        selectedChips,
        feedback,
        recommend,
        photos
      });
    }, 1500); // simulate API call
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto"
        />

        {/* Modal */}
        <motion.div 
          initial={{ y: '100%', opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: '100%', opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[700px] max-h-[90vh] bg-white dark:bg-[#111827] sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-slate-800 pointer-events-auto"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center sticky top-0 z-10">
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <Star className="w-6 h-6 text-indigo-500 fill-indigo-500" />
                Rate Your Journey
              </h2>
              <p className="text-sm font-bold text-gray-500 dark:text-slate-400 mt-1">
                {booking.source} to {booking.destination} • {booking.date}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-500 dark:text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content (Scrollable) */}
          <div className="p-5 sm:p-8 overflow-y-auto">
            
            {/* Booking Meta */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 mb-8">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl flex items-center justify-center font-black text-indigo-600 text-lg">
                {booking.operator.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-gray-900 dark:text-white">{booking.operator}</h4>
                <p className="text-xs font-bold text-gray-500 dark:text-slate-400">{booking.busType}</p>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Booking ID</span>
                <span className="text-xs font-black text-gray-700 dark:text-slate-300">{booking.id}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Overall Rating */}
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <h3 className="text-lg font-black text-gray-900 dark:text-white">How was your overall experience?</h3>
                <StarRating rating={overallRating} onChange={setOverallRating} size="lg" />
                <p className="text-xs font-bold text-gray-500 dark:text-slate-400">
                  {overallRating === 0 && "Tap to rate"}
                  {overallRating === 1 && "Terrible"}
                  {overallRating === 2 && "Poor"}
                  {overallRating === 3 && "Average"}
                  {overallRating === 4 && "Very Good"}
                  {overallRating === 5 && "Excellent"}
                </p>
              </div>

              {overallRating > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-10 overflow-hidden">
                  
                  {/* Category Ratings */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 mt-6">
                    <h4 className="text-sm font-black text-gray-900 dark:text-white mb-4">Rate specific categories (Optional)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {CATEGORIES.map(cat => (
                        <div key={cat} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-slate-700/50 last:border-0 md:[&:nth-last-child(-n+2)]:border-0">
                          <span className="text-sm font-bold text-gray-700 dark:text-slate-300">{cat}</span>
                          <StarRating 
                            rating={categoryRatings[cat] || 0} 
                            onChange={(val) => setCategoryRatings(prev => ({...prev, [cat]: val}))} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Travel Experience Chips */}
                  <div>
                    <h4 className="text-sm font-black text-gray-900 dark:text-white mb-3">What did you like about the trip?</h4>
                    <div className="flex flex-wrap gap-2">
                      {EXPERIENCE_CHIPS.map(chip => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => toggleChip(chip)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${
                            selectedChips.includes(chip)
                              ? 'bg-indigo-500 text-white border-indigo-600 shadow-lg shadow-indigo-500/25'
                              : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                          }`}
                        >
                          {selectedChips.includes(chip) && <Check className="w-3 h-3 inline-block mr-1 -mt-0.5" />}
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Textarea */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <h4 className="text-sm font-black text-gray-900 dark:text-white">Tell us more</h4>
                      <span className="text-[10px] font-bold text-gray-400">{feedback.length}/500</span>
                    </div>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value.slice(0, 500))}
                      placeholder="Tell us about your travel experience..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none h-32"
                    />
                  </div>

                  {/* Optional Photos (Demo) */}
                  <div>
                    <h4 className="text-sm font-black text-gray-900 dark:text-white mb-3">Add Photos (Optional)</h4>
                    <div className="flex gap-3">
                      <button type="button" className="w-20 h-20 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-1 text-gray-500 hover:border-indigo-400 hover:text-indigo-500 transition-colors bg-slate-50 dark:bg-slate-900">
                        <Upload className="w-5 h-5" />
                        <span className="text-[10px] font-bold">Upload</span>
                      </button>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-500/5 dark:to-cyan-500/5 p-6 rounded-3xl border border-indigo-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h4 className="text-sm font-black text-gray-900 dark:text-white text-center sm:text-left">Would you recommend this operator?</h4>
                    <div className="flex gap-3">
                      <button 
                        type="button" 
                        onClick={() => setRecommend(true)}
                        className={`flex items-center justify-center flex-1 gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all ${recommend === true ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-500/25' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-emerald-300'}`}
                      >
                        <ThumbsUp className="w-4 h-4" /> Yes
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setRecommend(false)}
                        className={`flex items-center justify-center flex-1 gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all ${recommend === false ? 'bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-500/25' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-rose-300'}`}
                      >
                        <ThumbsDown className="w-4 h-4" /> No
                      </button>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* Submit Footer */}
              <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row justify-end gap-3 pb-8 sm:pb-0">
                <Button type="button" variant="outline" className="py-3 px-6 rounded-xl" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className={`py-3 px-8 rounded-xl min-w-[160px] flex items-center justify-center ${overallRating === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={overallRating === 0 || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RateTripModal;
