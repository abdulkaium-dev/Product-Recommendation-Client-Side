import { motion } from "framer-motion";

function FeaturesSection() {
  const features = [
    { title: "Fast Delivery", desc: "Get your product within 48 hours", icon: "🚚" },
    { title: "24/7 Support", desc: "We’re always here to help", icon: "📞" },
    { title: "Easy Returns", desc: "No hassle 7-day return policy", icon: "🔁" },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default FeaturesSection;