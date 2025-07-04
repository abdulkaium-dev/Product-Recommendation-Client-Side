import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-purple-500 via-pink-500 to-red-500 px-4">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-xl p-12 max-w-lg text-center">
        <h1 className="text-9xl font-extrabold text-purple-700 mb-6 drop-shadow-lg">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, the page you are looking for doesn't exist or has been moved.
          Please check the URL or return to the homepage.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-semibold px-8 py-3 rounded-3xl shadow-lg hover:scale-105 transform transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
