import React, { useEffect, useState } from "react";
import HomeSlider from "../component/Hero";
import Testimonials from "../component/Testimonials";
import WhyBoycottMatters from "../component/WhyBoycottMatters";
import RecentProducts from "../component/RecentProducts";

const Loader = () => (
  <div
    className="flex justify-center items-center py-20"
    role="status"
    aria-live="polite"
  >
    <svg
      className="animate-spin h-12 w-12 text-indigo-600 dark:text-indigo-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <span className="sr-only">Loading homepage...</span>
  </div>
);

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (2 seconds)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="">
      {/* Add vertical spacing between sections */}
      <section className="mb-16">
        <HomeSlider />
      </section>

      <section className="mb-16">
        <RecentProducts />
      </section>

      <section className="mb-16">
        <WhyBoycottMatters />
      </section>

      <section>
        <Testimonials />
      </section>
    </main>
  );
};

export default Home;
