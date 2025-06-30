import React from 'react';
import WhyWeExistSlider from '../component/Slider';
import ImpactStats from '../component/ImpactStats';
import WhyBoycottMatters from '../component/WhyBoycottMatters';
import JoinTheMovement from '../component/JoinTheMovement';

const Home = () => {
  return (
    <main>
      <WhyWeExistSlider />
      <ImpactStats />
      <WhyBoycottMatters />
      <JoinTheMovement />
    </main>
  );
};

export default Home;

