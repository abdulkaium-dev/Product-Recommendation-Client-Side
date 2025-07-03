import React from 'react';
import HomeSlider from '../component/Slider';
import FeaturesSection from '../component/FeaturesSection';
import Testimonials from '../component/Testimonials';
import WhyBoycottMatters from '../component/WhyBoycottMatters';
import ProductGrid from '../component/ProductGrid';

const Home = () => {
  return (
    <main>
      <HomeSlider />
      <FeaturesSection />
      <Testimonials />
      <WhyBoycottMatters />
      <ProductGrid></ProductGrid>
    </main>
  );
};

export default Home;
