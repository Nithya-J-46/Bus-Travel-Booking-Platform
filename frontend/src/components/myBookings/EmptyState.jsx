import React from 'react';
import { Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmptyStateComponent from '../common/EmptyState';

const EmptyState = ({ activeTab }) => {
  const navigate = useNavigate();
  
  const getMessage = () => {
    switch(activeTab) {
      case 'upcoming': return "You don't have any upcoming journeys.";
      case 'completed': return "You haven't completed any journeys yet.";
      case 'cancelled': return "You don't have any cancelled bookings.";
      default: return "No bookings found.";
    }
  };

  return (
    <EmptyStateComponent 
      icon={Compass}
      title="No Bookings Found"
      description={`${getMessage()} Start exploring amazing destinations and book your next trip with BusGo!`}
      actionLabel="Book Your First Trip"
      onAction={() => navigate('/')}
    />
  );
};

export default EmptyState;
