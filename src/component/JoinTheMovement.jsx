// components/JoinTheMovement.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function JoinTheMovement() {
  return (
    <section className="bg-purple-900 text-white py-20 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Movement</h2>
        <p className="text-lg md:text-xl mb-8">
          Be part of the growing community that chooses conscious consumption.
        </p>
        <Link
          to="/add-query"
          className="inline-block bg-white text-purple-800 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transform transition duration-300"
        >
          Add Your Query
        </Link>
      </div>

      {/* Animated decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-32 h-32 bg-pink-400 rounded-full opacity-30 animate-pulse top-10 left-10"></div>
        <div className="absolute w-24 h-24 bg-purple-500 rounded-full opacity-20 animate-bounce bottom-10 right-10"></div>
      </div>
    </section>
  );
}
