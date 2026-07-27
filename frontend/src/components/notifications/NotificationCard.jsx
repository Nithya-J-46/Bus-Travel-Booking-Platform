import React from 'react';
import { Check, CheckCircle2, Clock, XCircle, AlertCircle, RefreshCw, Trash2, Archive, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'booking': return '🎫';
    case 'system': return '⚙️';
    case 'payment': return '💳';
    case 'offer': return '🔥';
    case 'journey': return '🚌';
    case 'community': return '👥';
    case 'refund': return '💰';
    default: return '🔔';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'critical': return 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400';
    case 'high': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
    case 'medium': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    case 'low': return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
    default: return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400';
  }
};

const NotificationCard = ({ notif, onMarkRead, onDelete, onArchive, onRetry }) => {
  return (
    <div className={`p-4 rounded-2xl transition-all duration-300 relative group overflow-hidden ${
      notif.read ? 'bg-slate-50 dark:bg-slate-900/40 opacity-80' : 'bg-white dark:bg-slate-800 shadow-sm border border-indigo-100 dark:border-indigo-500/20'
    }`}>
      
      {!notif.read && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-2xl"></div>
      )}

      <div className="flex gap-4">
        {/* Icon & Status */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/20 text-xl shadow-sm border border-indigo-100/50 dark:border-indigo-500/20">
            {getCategoryIcon(notif.category)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className={`font-bold text-sm ${notif.read ? 'text-slate-600 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
              {notif.title}
            </h4>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
              {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            {notif.message}
          </p>

          <div className="flex items-center gap-2 flex-wrap mb-3">
            {notif.priority && (
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${getPriorityColor(notif.priority)}`}>
                {notif.priority}
              </span>
            )}
            
            {/* Delivery Status Badge */}
            {notif.deliveryStatus === 'pending' && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3" /> Sending
              </span>
            )}
            {notif.deliveryStatus === 'delivered' && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Delivered
              </span>
            )}
            {notif.deliveryStatus === 'retrying' && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">
                <RefreshCw className="w-3 h-3 animate-spin" /> Retrying...
              </span>
            )}
            {notif.deliveryStatus === 'failed' && (
              <button onClick={() => onRetry(notif.id)} className="flex items-center gap-1 text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-900/20 px-2 py-0.5 rounded-full hover:bg-rose-100 transition-colors cursor-pointer group/retry">
                <XCircle className="w-3 h-3" /> Failed. <span className="underline group-hover/retry:text-rose-600">Retry</span>
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {!notif.read && (
              <button onClick={() => onMarkRead(notif.id)} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                Mark as read
              </button>
            )}
            {notif.actionUrl && (
              <Link to={notif.actionUrl} className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                {notif.actionText} <LinkIcon className="w-3 h-3" />
              </Link>
            )}
            <div className="flex-1"></div>
            <button onClick={() => onArchive(notif.id)} className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors cursor-pointer" title="Archive">
              <Archive className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(notif.id)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors cursor-pointer" title="Delete">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
