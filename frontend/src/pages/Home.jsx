import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BusSearchCard from '../components/home/BusSearchCard';
import PopularDestinations from '../components/home/PopularDestinations';
import WhyChooseUs from '../components/home/WhyChooseUs';
import OperatorCarousel from '../components/home/OperatorCarousel';
import JourneyStats from '../components/home/JourneyStats';
import TestimonialCarousel from '../components/home/TestimonialCarousel';
import AppPromotion from '../components/home/AppPromotion';
import FAQAccordion from '../components/home/FAQAccordion';
import NewsletterSection from '../components/home/NewsletterSection';

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-300 overflow-hidden">
      <HeroSection />
      <BusSearchCard />
      <PopularDestinations />
      <WhyChooseUs />
      <OperatorCarousel />
      <JourneyStats />
      <TestimonialCarousel />
      <AppPromotion />
      <FAQAccordion />
      <NewsletterSection />
    </div>
  );
};

export default Home;
