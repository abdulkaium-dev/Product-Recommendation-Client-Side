import React from "react";
import HomeSlider from "../component/Slider";
import Testimonials from "../component/Testimonials";
import WhyBoycottMatters from "../component/WhyBoycottMatters";
import RecentProducts from "../component/RecentProducts";

const Home = () => {
  return (
    <main>
      <HomeSlider />
      <RecentProducts />
      <WhyBoycottMatters />
      <Testimonials />
    </main>
  );
};

export default Home;
