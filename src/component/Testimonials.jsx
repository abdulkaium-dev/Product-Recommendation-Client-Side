import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ariana Gomez",
    comment: "Amazing product quality! I'm extremely satisfied.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKiH2rSHj53440eAMIK2VhOMRIrCx0XZ3lFw&s",
  },
  {
    name: "Rahim Uddin",
    comment: "The support team is very responsive and kind.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Lina Das",
    comment: "Delivery was faster than expected. 5 stars!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

function Testimonials() {
  return (
    <section
      className="bg-indigo-50 dark:bg-indigo-900 py-20 transition-colors duration-700"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2
          id="testimonials-heading"
          className="text-4xl md:text-5xl font-extrabold mb-12 text-indigo-700 dark:text-indigo-200 drop-shadow-lg"
        >
          What Our Customers Say
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              initial={{ rotateY: 90, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.3 }}
              viewport={{ once: true }}
              tabIndex={0}
              className="bg-white dark:bg-indigo-900 rounded-3xl p-8 shadow-lg
                hover:shadow-2xl hover:scale-105 transition-transform cursor-pointer
                focus:outline-none focus:ring-4 focus:ring-indigo-600 dark:focus:ring-indigo-400"
              aria-label={`Testimonial from ${t.name}`}
              role="region"
            >
              <img
                src={t.image}
                alt={`Photo of ${t.name}`}
                className="w-24 h-24 mx-auto rounded-full mb-6 object-cover border-4 border-indigo-600 dark:border-indigo-400 shadow-md"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
              <p className="text-indigo-700 dark:text-indigo-200 italic mb-6 leading-relaxed text-lg font-medium tracking-wide">
                “{t.comment}”
              </p>
              <h4 className="text-indigo-600 dark:text-indigo-400 text-xl font-semibold tracking-wide">
                {t.name}
              </h4>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
