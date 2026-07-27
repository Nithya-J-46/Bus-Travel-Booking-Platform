import React from 'react';
import { BellOff } from 'lucide-react';
import EmptyStateComponent from '../common/EmptyState';

const EmptyState = ({ message = "No Notifications Yet" }) => {
  return (
    <EmptyStateComponent 
      icon={BellOff}
      title="All Caught Up!"
      description={message}
      iconColor="text-gray-300 dark:text-slate-600"
    />
  );
};

export default EmptyState;
