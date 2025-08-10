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
      className="w-full min-h-[300px] sm:h-[90vh] mb-10"
      aria-label="Home featured product slider"
    >
      {slides.map(({ id, image, titleTop, titleMain, titleHighlight }) => (
        <SwiperSlide
          key={id}
          aria-roledescription="slide"
          role="group"
          aria-label={`${titleMain} featured slide`}
        >
          <section className="relative w-full h-full flex items-center justify-center px-4 sm:px-8 lg:px-16 py-8 bg-white dark:bg-gray-900">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black dark:bg-black/70"></div>

            <div className="relative max-w-7xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
              {/* Text Content */}
              <div className="max-w-lg space-y-2 sm:space-y-3 text-center lg:text-left drop-shadow-md">
                <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest font-semibold text-white dark:text-gray-300">
                  {titleTop}
                </p>
                <h2 className="text-xl sm:text-3xl md:text-5xl font-light leading-tight text-white dark:text-white">
                  {titleMain}
                </h2>
                <h3 className="text-lg sm:text-2xl md:text-4xl font-bold leading-tight text-white dark:text-indigo-400">
                  {titleHighlight}
                </h3>
                <button
                  type="button"
                  className="mt-3 sm:mt-6 px-5 sm:px-8 py-2 sm:py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500 text-sm sm:text-base"
                  aria-label={`Shop now for ${titleMain}`}
                >
                  SHOP NOW
                </button>
              </div>

              {/* Image */}
              <div className="mb-6 lg:mb-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden shadow-lg ring-1 ring-black/20 dark:ring-white/20">
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
