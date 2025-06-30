import React from 'react';
import WhyWeExistSlider from '../component/Slider';
import ImpactStats from '../component/ImpactStats'; 
import WhyBoycottMatters from '../component/WhyBoycottMatters';
import JoinTheMovement from '../component/JoinTheMovement';
import Sams from '../component/sams';


const Home = () => {
  return (
    <main>
      <WhyWeExistSlider />
      <ImpactStats></ImpactStats>
      <WhyBoycottMatters></WhyBoycottMatters>
      <JoinTheMovement></JoinTheMovement>
    </main>
  );
};

export default Home;
