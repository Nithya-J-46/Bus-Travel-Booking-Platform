import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from 'lucide-react';

const FeedPost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-5 mb-6">
      {/* Post Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img loading="lazy" src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">{post.author.name}</h4>
              <span className="text-xs text-gray-500">• {post.time}</span>
            </div>
            <span className="inline-block mt-0.5 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-full">
              {post.category}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
        {post.image && (
          <div className="mt-4 rounded-xl overflow-hidden max-h-80">
            <img loading="lazy" src={post.image} alt="Post attachment" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700/50">
        <div className="flex items-center gap-6">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              isLiked ? 'text-rose-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <motion.div whileTap={{ scale: 0.8 }}>
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.div>
            {likesCount}
          </button>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            {post.comments.length}
          </button>
          
          <button className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>

        <button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`transition-colors ${isBookmarked ? 'text-indigo-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-4 pt-4 border-t border-gray-100 dark:border-slate-700/50"
          >
            {/* Comment Input */}
            <div className="flex gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-500 font-bold shrink-0">
                U
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-indigo-500 dark:text-white"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {post.comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <img loading="lazy" src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl rounded-tl-none w-full border border-gray-100 dark:border-slate-700/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{comment.author.name}</span>
                      <span className="text-[10px] text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{comment.content}</p>
                    <div className="flex gap-4 mt-2">
                      <button className="text-[10px] font-semibold text-gray-500 hover:text-indigo-500">Like</button>
                      <button className="text-[10px] font-semibold text-gray-500 hover:text-indigo-500">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(FeedPost);
