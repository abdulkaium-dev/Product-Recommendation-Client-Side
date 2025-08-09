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
    <section
      className="py-16 bg-gradient-to-r from-pink-50 via-purple-50 to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900 mb-10 transition-colors duration-500"
      aria-labelledby="why-boycott-heading"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2
          id="why-boycott-heading"
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-12 tracking-tight"
        >
          Why Boycott Matters?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map(({ title, desc, icon }) => {
            const id = title.replace(/\s+/g, "-").toLowerCase();
            return (
              <article
                key={title}
                role="region"
                aria-labelledby={`${id}-title`}
                tabIndex={0}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300
                  flex flex-col items-center text-center focus:outline-none focus:ring-4 focus:ring-purple-400"
              >
                <div
                  role="img"
                  aria-label={`${title} icon`}
                  className="text-7xl mb-5 select-none"
                >
                  {icon}
                </div>
                <h3
                  id={`${id}-title`}
                  className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100"
                >
                  {title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 max-w-xs leading-relaxed">
                  {desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
