import React from 'react';
import HeroCard from '../components/rewards/HeroCard';
import SectionHeading from '../components/ui/SectionHeading';
import { Trophy } from 'lucide-react';
import PointsSummary from '../components/rewards/PointsSummary';
import WaysToEarn from '../components/rewards/WaysToEarn';
import RecentActivity from '../components/rewards/RecentActivity';
import AvailableRewards from '../components/rewards/AvailableRewards';
import Achievements from '../components/rewards/Achievements';
import ReferralProgram from '../components/rewards/ReferralProgram';
import TravelMilestones from '../components/rewards/TravelMilestones';

const RewardsDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FB] dark:bg-[#0b0f19] py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Section */}
        <SectionHeading 
          badge="REWARDS" 
          icon={Trophy} 
          title="BusGo Rewards" 
          subtitle="Earn points on every trip and unlock exclusive travel benefits."
          align="left"
        />
        <HeroCard />
        <PointsSummary />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Wider on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <AvailableRewards />
            <Achievements />
          </div>

          {/* Right Column (Sidebar on desktop) */}
          <div className="space-y-6">
            <WaysToEarn />
            <RecentActivity />
          </div>

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ReferralProgram />
          </div>
          <div>
            <TravelMilestones />
          </div>
        </div>

      </div>
    </div>
  );
};

export default RewardsDashboard;
