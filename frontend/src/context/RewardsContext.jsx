import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axios';
import { useAuth } from './AuthContext';

const RewardsContext = createContext();

export const useRewards = () => useContext(RewardsContext);

const TIERS = [
  { id: 'bronze', name: 'Bronze', icon: '🥉', minPoints: 0, benefits: ['Basic Support', 'Standard Offers'] },
  { id: 'silver', name: 'Silver', icon: '🥈', minPoints: 1000, benefits: ['Priority Support', '5% Extra Discount', 'Free Cancellation (1/year)'] },
  { id: 'gold', name: 'Gold', icon: '🥇', minPoints: 3000, benefits: ['VIP Support', '10% Extra Discount', 'Free Seat Upgrade', 'Free Cancellation (3/year)'] },
  { id: 'platinum', name: 'Platinum', icon: '💎', minPoints: 8000, benefits: ['24/7 Dedicated Agent', '15% Extra Discount', 'Free Upgrades', 'Unlimited Free Cancellation', 'Lounge Access'] }
];

const INITIAL_REWARDS = [
  { id: 'r1', title: '10% Discount Coupon', points: 500, icon: '🎫', description: 'Valid for 30 days on any route.' },
  { id: 'r2', title: 'Free Seat Upgrade', points: 800, icon: '💺', description: 'Upgrade to sleeper or premium seater.' },
  { id: 'r3', title: 'Priority Support Pass', points: 300, icon: '🎧', description: 'Jump the queue for 1 month.' },
  { id: 'r4', title: 'Free Cancellation Voucher', points: 1000, icon: '✅', description: 'Cancel any trip with 0 fees.' },
  { id: 'r5', title: 'Cashback Voucher (₹500)', points: 2000, icon: '💰', description: 'Credited to your BusGo wallet.' },
  { id: 'r6', title: 'Travel Merchandise', points: 5000, icon: '🎁', description: 'Exclusive BusGo t-shirt and mug (Demo).' }
];

const INITIAL_ACTIVITY = [];

export const RewardsProvider = ({ children }) => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [lifetimePoints, setLifetimePoints] = useState(0);
  const [activity, setActivity] = useState(INITIAL_ACTIVITY);

  useEffect(() => {
    if (user) {
      setPoints(user.points_balance || 0);
      setLifetimePoints(user.points_balance || 0); // Simplified for demo
    }
    fetchRewards();
  }, [user]);

  const fetchRewards = async () => {
    try {
      const response = await axiosInstance.get('auth/rewards/');
      const mapped = response.data.map(r => ({
        id: r.id,
        title: r.description,
        points: r.amount,
        date: r.created_at,
        type: r.transaction_type === 'earned' ? 'earn' : 'spend'
      }));
      setActivity(mapped);
    } catch (error) {
      console.error("Error fetching rewards:", error);
    }
  };
  
  // Stats
  const stats = {
    pointsExpiring: 150,
    tripsCompleted: 12,
    averageRating: 4.8,
    distanceTravelled: 4250,
    moneySaved: 1850,
    favoriteOperator: 'SRS Travels',
    favoriteRoute: 'Bangalore → Hyderabad',
    totalReferrals: 3,
    referralPoints: 150
  };

  const getTierInfo = () => {
    let currentTier = TIERS[0];
    let nextTier = TIERS[1];
    
    for (let i = 0; i < TIERS.length; i++) {
      if (lifetimePoints >= TIERS[i].minPoints) {
        currentTier = TIERS[i];
        nextTier = TIERS[i + 1] || null;
      }
    }
    
    return { currentTier, nextTier };
  };

  const redeemReward = async (reward) => {
    if (points >= reward.points) {
      try {
        await axiosInstance.post('auth/rewards/', {
          amount: reward.points,
          transaction_type: 'redeemed',
          description: `${reward.title} Redeemed`
        });
        
        setPoints(prev => prev - reward.points);
        fetchRewards(); // refresh list from server
        return true;
      } catch (error) {
        console.error("Error redeeming reward:", error);
        toast.error("Failed to redeem reward");
        return false;
      }
    }
    return false;
  };

  const earnDemoPoints = async (amount, reason) => {
    try {
      await axiosInstance.post('auth/rewards/', {
        amount,
        transaction_type: 'earned',
        description: reason
      });
      fetchRewards();
      setPoints(prev => prev + amount);
      toast.success(`Earned ${amount} points!`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RewardsContext.Provider value={{
      points,
      lifetimePoints,
      activity,
      stats,
      tiers: TIERS,
      rewardsList: INITIAL_REWARDS,
      tierInfo: getTierInfo(),
      redeemReward,
      earnDemoPoints
    }}>
      {children}
    </RewardsContext.Provider>
  );
};
