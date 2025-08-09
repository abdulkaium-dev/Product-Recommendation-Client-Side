import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HomeSlider() {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80",
      titleTop: "RADISH CHIPS",
      titleMain: "Lunchbox Snack",
      titleHighlight: "Kids’ll Love!",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=1600&q=80",
      titleTop: "ORGANICS FOOD",
      titleMain: "Dried Persimmon",
      titleHighlight: "Sale Up To 40% Off",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
      titleTop: "HEALTHY SNACKS",
      titleMain: "Berry Crunch",
      titleHighlight: "Tasty & Healthy!",
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      className="w-full h-[90vh] mb-10"
      aria-label="Home featured product slider"
    >
      {slides.map(({ id, image, titleTop, titleMain, titleHighlight }) => (
        <SwiperSlide key={id} aria-roledescription="slide">
          <section
            className="bg-black relative w-full h-full flex items-center justify-center px-6 sm:px-10 lg:px-16"
            aria-label={`${titleMain} featured slide`}
            role="group"
          >
            {/* Overlay for dark mode readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between h-full">
              {/* Text Content */}
              <div className="text-white max-w-lg space-y-3 text-center md:text-left drop-shadow-md">
                <p className="text-sm md:text-base uppercase tracking-widest font-semibold">
                  {titleTop}
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
                  {titleMain}
                </h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  {titleHighlight}
                </h3>
                <button
                  type="button"
                  className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500"
                  aria-label={`Shop now for ${titleMain}`}
                >
                  SHOP NOW
                </button>
              </div>

              {/* Image */}
              <div className="mb-8 md:mb-0 max-w-md w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg ring-1 ring-black/10">
                <img
                  src={image}
                  alt={`${titleMain} product`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
