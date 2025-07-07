import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddQuery() {
  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    productImageUrl: "",
    queryTitle: "",
    boycottingReason: "",
  });

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate(); // 🔥 added

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        title: 'Please log in to submit a query!',
        icon: 'warning',
        confirmButtonColor: '#f59e0b',
      });
      return;
    }

    const newQuery = {
      ...formData,
      email: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      date: new Date().toISOString(),
      recommendationCount: 0,
    };

    try {
      const res = await fetch("https://server-code-three.vercel.app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuery),
      });

      const data = await res.json();
      if (data.insertedId || data.acknowledged) {
        Swal.fire({
          title: "Query Added Successfully!",
          icon: "success",
          confirmButtonColor: "#22c55e",
        });

        setFormData({
          productName: "",
          productBrand: "",
          productImageUrl: "",
          queryTitle: "",
          boycottingReason: "",
        });

        // 🔥 Redirect to /my-queries
        navigate("/my-queries");
      }
    } catch (error) {
      console.error("Error adding query:", error);
      Swal.fire({
        title: "Failed to Add Query",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 p-10 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-3xl shadow-2xl font-sans">
      <h2 className="text-4xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
        Add Product Query
      </h2>
      <form onSubmit={handleAddTask} className="space-y-8 bg-white rounded-xl p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-gray-700 font-semibold mb-2 block text-lg">Product Name</span>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-5 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-transparent transition duration-300"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold mb-2 block text-lg">Product Brand</span>
            <input
              type="text"
              name="productBrand"
              value={formData.productBrand}
              onChange={handleChange}
              placeholder="Enter product brand"
              className="w-full px-5 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-transparent transition duration-300"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold mb-2 block text-lg">Product Image URL</span>
            <input
              type="url"
              name="productImageUrl"
              value={formData.productImageUrl}
              onChange={handleChange}
              placeholder="Enter product image URL"
              className="w-full px-5 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-400 focus:border-transparent transition duration-300"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold mb-2 block text-lg">Query Title</span>
            <input
              type="text"
              name="queryTitle"
              value={formData.queryTitle}
              onChange={handleChange}
              placeholder="Is there any better product that gives me the same quality?"
              className="w-full px-5 py-3 border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-transparent transition duration-300"
              required
            />
          </label>
        </div>

        <label className="block">
          <span className="text-gray-700 font-semibold mb-2 block text-lg">Boycotting Reason Details</span>
          <textarea
            name="boycottingReason"
            value={formData.boycottingReason}
            onChange={handleChange}
            placeholder="Explain why you don't want this product"
            rows={5}
            className="w-full px-5 py-3 border-2 border-green-300 rounded-xl resize-y focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-transparent transition duration-300"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300"
        >
          Add Query
        </button>
      </form>
    </div>
  );
}
