import React from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-50 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 max-w-md sm:max-w-lg md:max-w-xl w-full text-center">
        <h1 className="text-7xl sm:text-8xl font-extrabold text-indigo-700 mb-3 select-none">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-indigo-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-indigo-600 mb-8 text-sm sm:text-base px-2 sm:px-0">
          Sorry, the page you are looking for does not exist or has been moved.
          Please check the URL or click the button below to return home.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 sm:px-6 sm:py-3 rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Go to homepage"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
