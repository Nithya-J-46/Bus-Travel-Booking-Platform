import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ReviewContext = createContext();

export const useReviews = () => {
  return useContext(ReviewContext);
};

import axiosInstance from '../api/axios';

const INITIAL_MOCK_REVIEWS = [];

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get('bookings/reviews/');
      
      const mappedReviews = response.data.map(r => ({
        id: r.id,
        bookingId: r.booking,
        busId: r.bus,
        rating: r.rating,
        description: r.comment,
        timestamp: r.created_at,
        status: 'approved',
        helpfulVotes: 0,
        trustedReviewer: false,
        recommend: r.rating >= 4
      }));
      setReviews(mappedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Derived State
  const activeReviews = reviews.filter(r => r.status === 'approved');
  
  const calculateAverage = (routeId = null) => {
    // In a real app, we'd filter by routeId
    if (activeReviews.length === 0) return 0;
    const total = activeReviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / activeReviews.length).toFixed(1);
  };

  const getDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    activeReviews.forEach(r => {
      dist[r.rating] += 1;
    });
    return dist;
  };

  const getReviewByBooking = (bookingId) => {
    return reviews.find(r => r.bookingId === bookingId);
  };

  const submitReview = async (newReview) => {
    try {
      // Create new review via API
      const payload = {
        booking: newReview.db_id, // We need to pass db_id here
        bus: newReview.bus_id,
        rating: newReview.rating,
        comment: newReview.description
      };
      
      const response = await axiosInstance.post('bookings/reviews/', payload);
      
      const reviewObj = {
        id: response.data.id,
        bookingId: newReview.bookingId, // Keep frontend ID
        busId: newReview.bus_id,
        rating: response.data.rating,
        description: response.data.comment,
        timestamp: response.data.created_at,
        status: 'approved',
        helpfulVotes: 0,
        trustedReviewer: false,
        recommend: response.data.rating >= 4
      };
      setReviews(prev => [reviewObj, ...prev]);
      toast.success('Review submitted! Thank you for your feedback.', { icon: '🌟' });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error('Failed to submit review.');
    }
  };

  const voteHelpful = (id) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        // If they get 10+ votes, they become a trusted reviewer (demo logic)
        const newVotes = r.helpfulVotes + 1;
        return { 
          ...r, 
          helpfulVotes: newVotes,
          trustedReviewer: newVotes >= 10 || r.trustedReviewer 
        };
      }
      return r;
    }));
    toast.success('Vote recorded!');
  };

  const reportReview = (id, reason) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'pending' } : r));
    toast.success(`Review reported for: ${reason}. It has been hidden pending moderation.`, { icon: '🛡️' });
  };

  return (
    <ReviewContext.Provider value={{
      reviews: activeReviews,
      allReviews: reviews,
      calculateAverage,
      getDistribution,
      getReviewByBooking,
      submitReview,
      voteHelpful,
      reportReview,
      totalActiveReviews: activeReviews.length
    }}>
      {children}
    </ReviewContext.Provider>
  );
};
