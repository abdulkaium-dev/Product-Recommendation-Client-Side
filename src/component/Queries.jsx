import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Queries() {
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState(3); // default 3-column layout
  const navigate = useNavigate();

  // Fetch all queries from backend
  const fetchQueries = async () => {
    try {
      const res = await fetch("http://localhost:3000/products");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      const sorted = data.sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );
      setQueries(sorted);
      setFilteredQueries(sorted);
    } catch (error) {
      console.error("Failed to fetch queries:", error);
      setQueries([]);
      setFilteredQueries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // Handle search filter
  useEffect(() => {
    const result = queries.filter((q) =>
      q.productName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredQueries(result);
  }, [search, queries]);

  if (loading) {
    return <p className="text-center mt-20 text-xl">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-700">
        All Product Queries
      </h1>

      {/* 🔍 Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border-2 border-purple-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      {/* 📐 Layout Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setLayout(num)}
            className={`px-4 py-2 rounded font-semibold transition ${
              layout === num
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-purple-100"
            }`}
          >
            {num} Column{num > 1 && "s"}
          </button>
        ))}
      </div>

      {filteredQueries.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No matching queries found.
        </p>
      ) : (
        <div
          className={`grid gap-8 ${
            layout === 1
              ? "grid-cols-1"
              : layout === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredQueries.map((query) => (
            <div
              key={query._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col border-t-4 border-purple-500"
            >
              <img
                src={query.productImageUrl || "/placeholder.jpg"}
                alt={query.productName || "Product Image"}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
                className="h-48 w-full object-cover rounded mb-4"
              />
              <h2 className="text-2xl font-semibold text-purple-700 mb-2">
                {query.queryTitle || "No Title"}
              </h2>
              <p className="text-gray-600 mb-1">
                <strong>Product:</strong> {query.productName || "Unknown"} (
                {query.productBrand || "N/A"})
              </p>
              <p className="text-gray-500 mb-1 text-sm">
                <strong>Recommendations:</strong>{" "}
                {query.recommendationCount || 0}
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
      )}
    </div>
  );
}
