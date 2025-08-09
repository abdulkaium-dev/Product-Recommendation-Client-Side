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
      className="py-16
        bg-gradient-to-r from-purple-50 via-indigo-50 to-indigo-100
        dark:from-indigo-900 dark:via-indigo-800 dark:to-indigo-900
        mb-10 transition-colors duration-500"
      aria-labelledby="why-boycott-heading"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2
          id="why-boycott-heading"
          className="text-4xl md:text-5xl font-extrabold
            text-primary dark:text-primary-dark
            mb-12 tracking-tight"
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
                className="bg-white dark:bg-indigo-900 p-8 rounded-3xl shadow-lg
                  hover:shadow-2xl transform hover:scale-105 transition-transform duration-300
                  flex flex-col items-center text-center
                  focus:outline-none focus:ring-4 focus:ring-primary"
              >
                <div
                  role="img"
                  aria-label={`${title} icon`}
                  className="text-7xl mb-5 select-none text-primary dark:text-primary-dark"
                >
                  {icon}
                </div>

                <h3
                  id={`${id}-title`}
                  className="text-2xl font-semibold mb-3
                    text-primary dark:text-primary-dark"
                >
                  {title}
                </h3>

                <p className="text-gray-700 dark:text-indigo-300 max-w-xs leading-relaxed">
                  {desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      {/* CSS Variables & dark mode */}
      <style jsx="true">{`
        :root {
          --color-primary: #4f46e5; /* Indigo 600 */
          --color-primary-dark: #818cf8; /* Indigo 400 lighter for dark mode */
        }

        .text-primary {
          color: var(--color-primary);
        }
        .dark .text-primary {
          color: var(--color-primary-dark);
        }
        .bg-primary {
          background-color: var(--color-primary);
        }
        .dark .bg-primary {
          background-color: var(--color-primary-dark);
        }
        .focus\\:ring-primary:focus {
          --tw-ring-color: var(--color-primary);
        }
        .dark .focus\\:ring-primary:focus {
          --tw-ring-color: var(--color-primary-dark);
        }
      `}</style>
    </section>
  );
}
