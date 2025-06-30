import { motion } from "framer-motion";

const team = [
  {
    name: "Ayesha Rahman",
    role: "CTO",
    img: "/team1.jpg",
    bio: "Tech visionary with 10+ years experience."
  },
  {
    name: "Farhan Ahmed",
    role: "CEO",
    img: "/team2.jpg",
    bio: "Leads with passion and purpose."
  },
  {
    name: "Sadia Khan",
    role: "Design Lead",
    img: "/team3.jpg",
    bio: "Transforms ideas into stunning visuals."
  }
];

const TeamSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-4xl font-bold mb-12 text-gray-800"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Meet the Visionaries
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="relative group perspective"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180 rounded-xl shadow-lg">
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 bg-black bg-opacity-60 w-full p-4 text-white rounded-b-xl">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm">{member.role}</p>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-gray-900 text-white p-6 rounded-xl transform rotate-y-180 backface-hidden flex items-center justify-center">
                  <p>{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
