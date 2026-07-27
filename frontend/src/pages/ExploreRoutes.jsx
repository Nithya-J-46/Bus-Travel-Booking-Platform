import React, { useEffect } from 'react';
import RoutesHero from '../components/exploreRoutes/RoutesHero';
import PopularRoutes from '../components/exploreRoutes/PopularRoutes';
import TopDestinations from '../components/exploreRoutes/TopDestinations';
import PopularOperators from '../components/exploreRoutes/PopularOperators';
import TrendingRoutes from '../components/exploreRoutes/TrendingRoutes';
import RoutesFAQ from '../components/exploreRoutes/RoutesFAQ';
import RouteFilters from '../components/exploreRoutes/RouteFilters';
import RouteSearchCard from '../components/exploreRoutes/RouteSearchCard';
import InteractiveRouteMap from '../components/exploreRoutes/InteractiveRouteMap';
import RecentlySearchedRoutes from '../components/exploreRoutes/RecentlySearchedRoutes';
import QuickSearchChips from '../components/exploreRoutes/QuickSearchChips';

const ExploreRoutes = () => {
  const [searchedRoute, setSearchedRoute] = React.useState(null);
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    if (searchedRoute && mapRef.current) {
      setTimeout(() => {
        mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [searchedRoute]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-16">
      <RoutesHero />
      
      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <RouteSearchCard 
          onSubmitCallback={(data) => setSearchedRoute(data)} 
        />
        <QuickSearchChips onRouteSelect={(data) => setSearchedRoute(data)} />
        <RecentlySearchedRoutes onRouteSelect={(data) => setSearchedRoute(data)} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <div ref={mapRef}>
          <InteractiveRouteMap searchedRoute={searchedRoute} />
        </div>
        <PopularRoutes onRouteSelect={(data) => setSearchedRoute(data)} />
        <TrendingRoutes onRouteSelect={(data) => setSearchedRoute(data)} />
        <TopDestinations onRouteSelect={(data) => setSearchedRoute(data)} />
        <PopularOperators />
        <RouteFilters />
        <RoutesFAQ />
      </div>
    </div>
  );
};

export default ExploreRoutes;
