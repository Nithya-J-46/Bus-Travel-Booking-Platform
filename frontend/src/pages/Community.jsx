import React, { useState } from 'react';
import CommunityHero from '../components/community/CommunityHero';
import CommunityFilters from '../components/community/CommunityFilters';
import TravelFeed from '../components/community/TravelFeed';
import PollWidget from '../components/community/PollWidget';
import TravelTipsWidget from '../components/community/TravelTipsWidget';
import Leaderboard from '../components/community/Leaderboard';
import CreatePostModal from '../components/community/CreatePostModal';
import Button from '../components/Button';
import { PenSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Community = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('latest');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const handleCreatePostClick = () => {
    if (!user) {
      toast.error('Please login to create a post.');
      return;
    }
    setIsPostModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <CommunityHero />
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Feed</h2>
          <Button 
            onClick={handleCreatePostClick}
            variant="primary" 
            icon={<PenSquare className="w-4 h-4" />}
            className="shadow-lg shadow-indigo-500/20"
          >
            Create Post
          </Button>
        </div>

        <CommunityFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed Column (Left/Center) */}
          <div className="lg:col-span-8">
            <TravelFeed />
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-6">
            <PollWidget />
            <TravelTipsWidget />
            <Leaderboard />
          </div>
        </div>
      </div>

      <CreatePostModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
    </div>
  );
};

export default Community;
