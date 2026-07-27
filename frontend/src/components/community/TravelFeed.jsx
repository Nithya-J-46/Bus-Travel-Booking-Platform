import React from 'react';
import FeedPost from './FeedPost';

const MOCK_POSTS = [
  {
    id: 1,
    author: { name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?u=2' },
    time: '2 hours ago',
    category: 'Bus Reviews',
    title: 'IntrCity SmartBus - Bangalore to Hyderabad Experience',
    content: 'Just completed my journey from Bangalore to Hyderabad on the IntrCity SmartBus (AC Sleeper). The experience was surprisingly good! \n\nThe boarding point (Madiwala) had an exclusive lounge with clean washrooms and AC. The bus arrived exactly on time. Beds were clean and they provided a fresh blanket and water bottle.\n\nOnly downside: The WiFi was a bit patchy on the highway. Overall 4.5/5!',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
    likes: 124,
    comments: [
      { id: 1, author: { name: 'Rahul S.', avatar: 'https://i.pravatar.cc/150?u=1' }, time: '1 hr ago', content: 'Did they stop for dinner? If so, where?' },
      { id: 2, author: { name: 'Amit K.', avatar: 'https://i.pravatar.cc/150?u=3' }, time: '45 mins ago', content: 'Yes, usually they stop at Blue Moon Highway Resto. Good food.' }
    ]
  },
  {
    id: 2,
    author: { name: 'Neha Singh', avatar: 'https://i.pravatar.cc/150?u=4' },
    time: '5 hours ago',
    category: 'Questions',
    title: 'Is it safe for solo female travellers on night buses?',
    content: 'I have to travel urgently from Delhi to Manali next week. It is an overnight journey. Which bus operator would you recommend for the best safety and comfort for a solo female traveller?',
    image: null,
    likes: 89,
    comments: [
      { id: 3, author: { name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?u=2' }, time: '3 hrs ago', content: 'Zingbus and IntrCity both have special women-only seat selections and CCTV. Highly recommend them!' }
    ]
  },
  {
    id: 3,
    author: { name: 'Vikram Das', avatar: 'https://i.pravatar.cc/150?u=5' },
    time: '1 day ago',
    category: 'Travel Tips',
    title: 'Pack light for the Goa trip! 🌴',
    content: 'Pro tip for anyone taking the Mumbai -> Goa bus route. The luggage compartments get filled fast, and keeping a massive bag at your feet in a semi-sleeper is a nightmare. \n\nBring a small backpack and wear comfortable layers because the AC gets freezing at night!',
    image: null,
    likes: 210,
    comments: []
  }
];

const TravelFeed = () => {
  return (
    <div className="w-full">
      {MOCK_POSTS.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
      
      {/* Infinite Scroll Loader Mock */}
      <div className="flex justify-center py-6">
        <div className="flex items-center gap-2 text-gray-400">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default TravelFeed;
