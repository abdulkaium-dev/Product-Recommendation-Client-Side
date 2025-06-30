// components/ImpactCounter.jsx
import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { label: "Projects Delivered", value: 1500 },
  { label: "Happy Clients", value: 800 },
  { label: "Countries Served", value: 24 },
  { label: "Team Members", value: 70 }
];

export default function ImpactCounter() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4 text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Global Impact</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white bg-opacity-10 p-6 rounded-2xl shadow-lg"
          >
            <h3 className="text-4xl font-bold">
              <CountUp end={stat.value} duration={3} />
            </h3>
            <p className="mt-2 text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
