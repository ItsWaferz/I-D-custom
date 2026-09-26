import React from 'react';
import Hero from '../components/home/Hero';
import ServicesOverview from '../components/home/ServicesOverview';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-dark">
      <Hero />
      <ServicesOverview />
    </div>
  );
};

export default HomePage;
