// components/WhyBoycottMatters.jsx
import React from "react";

export default function WhyBoycottMatters() {
  const cards = [
    {
      title: "Raise Awareness",
      desc: "Help others know which brands support unethical causes.",
      icon: "📢",
    },
    {
      title: "Support Better Brands",
      desc: "Encourage ethical and local alternatives.",
      icon: "💡",
    },
    {
      title: "Community Power",
      desc: "When many act together, real change happens.",
      icon: "🤝",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-red-100 via-pink-100 to-purple-100 mb-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">
          Why Boycott Matters?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((item, i) => (
            <article
              key={item.title}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <div
                className="text-5xl mb-4"
                role="img"
                aria-label={item.title + " icon"}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

