import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Queries() {
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState(3);
  const navigate = useNavigate();

  // Fetch all queries and sort descending by date
  const fetchQueries = async () => {
    try {
      const res = await fetch("https://server-code-three.vercel.app/products");
      const data = await res.json();
      const sorted = data.sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );
      setQueries(sorted);
      setFilteredQueries(sorted);
    } catch (err) {
      console.error("Error fetching queries:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch once on mount
  useEffect(() => {
    fetchQueries();
  }, []);

  // Filter queries by search term on productName
  useEffect(() => {
    const result = queries.filter((q) =>
      q.productName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredQueries(result);
  }, [search, queries]);

  if (loading) {
    return <p className="text-center text-xl py-20">Loading queries...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-10">
        All Product Queries
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border-2 border-purple-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-label="Search queries by product name"
        />
      </div>

      {/* Layout Toggle Buttons */}
      <div className="flex justify-center gap-3 mb-8" role="group" aria-label="Select layout columns">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setLayout(num)}
            className={`px-4 py-2 rounded font-medium transition ${
              layout === num
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-purple-100"
            }`}
            aria-pressed={layout === num}
            aria-label={`${num} column layout`}
          >
            {num} Column{num > 1 && "s"}
          </button>
        ))}
      </div>

      {/* No Queries Found */}
      {filteredQueries.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No matching queries found.
        </p>
      ) : (
        // Queries Grid
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
              className="flex flex-col rounded-3xl shadow-lg hover:shadow-xl overflow-hidden
                         bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-700
                         text-white border-4 border-purple-800
                         hover:from-purple-700 hover:via-pink-600 hover:to-red-600
                         transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={query.productImageUrl || "/placeholder.jpg"}
                alt={query.productName || "Product image"}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
                className="h-48 w-full object-cover brightness-90 hover:brightness-110 transition duration-300"
              />

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-extrabold drop-shadow-md mb-2 truncate" title={query.queryTitle}>
                  {query.queryTitle || "Untitled Query"}
                </h3>
                <p className="text-purple-200 font-semibold mb-1">
                  Brand: {query.productBrand || "N/A"}
                </p>
                <p className="text-purple-100 text-sm mb-1">
                  Product: {query.productName || "Unknown"}
                </p>
                <p className="text-purple-300 text-sm mb-1">
                  Recommendations: {query.recommendationCount || 0}
                </p>
                <p className="text-purple-300 text-xs mb-4">
                  Submitted by: {query.userName || "Anonymous"}
                </p>

                <button
                  onClick={() => navigate(`/query/${query._id}`)}
                  className="bg-white text-purple-700 font-semibold rounded-full px-4 py-2
                             shadow-md hover:bg-purple-100 transition mt-auto"
                  aria-label={`Recommend for query titled: ${query.queryTitle}`}
                >
                  Recommend 💡
                </button>
              </div>
              <div className="absolute top-3 right-3 bg-white text-purple-700 text-xs font-semibold px-3 py-1 rounded-full shadow select-none">
                📅{" "}
                {query.date
                  ? new Date(query.date).toLocaleDateString()
                  : "Unknown"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
