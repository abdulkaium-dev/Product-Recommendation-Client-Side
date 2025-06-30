import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    img: "https://www.linkedin.com/pulse/bridging-gap-from-thought-action-empowering-devarapalli-5pkdc/",
    title: "Empowering Innovation",
    subtitle: "We build tools that spark progress and creativity."
  },
  {
    img: "",
    title: "Collaboration Matters",
    subtitle: "We unite people to solve real-world challenges."
  },
  {
    img: "https://source.unsplash.com/1600x600/?education",
    title: "Educating Minds",
    subtitle: "We share knowledge that transforms lives."
  },
  {
    img: "https://source.unsplash.com/1600x600/?community",
    title: "Community First",
    subtitle: "We grow with the people we serve."
  }
];

const WhyWeExistSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 rounded overflow-hidden shadow-lg mb-10">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-6">
              <h2 className="text-3xl md:text-4xl font-bold">{slide.title}</h2>
              <p className="text-lg md:text-xl mt-2">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WhyWeExistSlider;
