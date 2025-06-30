import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Queries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all queries
  const fetchQueries = async () => {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setQueries(sorted);
    } catch (error) {
      console.error("Failed to fetch queries", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  if (loading) {
    return <p className="text-center mt-20 text-xl">Loading...</p>;
  }

  if (queries.length === 0) {
    return (
      <p className="text-center mt-20 text-xl">
        No queries available at the moment.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">
        All Product Queries
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {queries.map((query) => (
          <div
            key={query._id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col border-t-4 border-purple-500"
          >
            <img
              src={query.productImageUrl || "/placeholder.jpg"}
              alt={query.productName}
              onError={(e) => (e.target.src = "/placeholder.jpg")}
              className="h-48 w-full object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">
              {query.queryTitle}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Product:</strong> {query.productName} ({query.productBrand})
            </p>
            <p className="text-gray-500 mb-1 text-sm">
              <strong>Recommendations:</strong> {query.recommendationCount || 0}
            </p>
            <p className="text-gray-400 text-sm mb-3">
              <strong>By:</strong> {query.userName || "Anonymous"}
            </p>
            <button
              onClick={() => navigate(`/query/${query._id}`)}
              className="mt-auto bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Recommend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
