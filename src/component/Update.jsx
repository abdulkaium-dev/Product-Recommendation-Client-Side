import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateQuery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [queryData, setQueryData] = useState({
    productName: "",
    productBrand: "",
    productImageUrl: "",
    queryTitle: "",
    boycottingReason: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch query");
        const data = await res.json();
        if (!data || !data._id) throw new Error("Query not found");

        const { productName, productBrand, productImageUrl, queryTitle, boycottingReason } = data;
        setQueryData({
          productName,
          productBrand,
          productImageUrl,
          queryTitle,
          boycottingReason,
        });
      } catch (error) {
        console.error("Error loading query:", error);
        Swal.fire("Error", error.message, "error");
        navigate("/my-queries");
      } finally {
        setLoading(false);
      }
    };

    fetchQuery();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queryData),
      });

      if (!res.ok) throw new Error("Update failed");

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Query updated successfully.",
      });
      navigate("/my-queries");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  if (loading)
    return <p className="text-center py-20 text-xl text-gray-600">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 my-12 bg-white rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-4xl font-extrabold text-purple-700 mb-10 text-center drop-shadow-md">
        Update Your Query
      </h2>

      <form onSubmit={handleUpdate} className="space-y-8">
        {/* Product Name */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={queryData.productName}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="Enter product name"
          />
        </div>

        {/* Product Brand */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            Product Brand
          </label>
          <input
            type="text"
            name="productBrand"
            value={queryData.productBrand}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="Enter product brand"
          />
        </div>

        {/* Product Image URL */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            Product Image URL
          </label>
          <input
            type="url"
            name="productImageUrl"
            value={queryData.productImageUrl}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="Enter product image URL"
          />
        </div>

        {/* Query Title */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            Query Title
          </label>
          <input
            type="text"
            name="queryTitle"
            value={queryData.queryTitle}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="Enter query title"
          />
        </div>

        {/* Boycotting Reason */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            Boycotting Reason
          </label>
          <textarea
            name="boycottingReason"
            value={queryData.boycottingReason}
            onChange={handleChange}
            rows={5}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm resize-y focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="Explain why you want to boycott this product"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold py-4 rounded-3xl shadow-lg hover:scale-105 transform transition duration-300"
        >
          Update Query
        </button>
      </form>
    </div>
  );
}
