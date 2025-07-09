import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecentQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function getTimestampFromObjectId(objectId) {
    return parseInt(objectId.substring(0, 8), 16) * 1000;
  }

  useEffect(() => {
    fetch("https://server-code-three.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => getTimestampFromObjectId(b._id) - getTimestampFromObjectId(a._id)
        );
        setQueries(sorted.slice(0, 6));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center text-xl py-20" aria-live="polite">
        Loading recent queries...
      </p>
    );
  }

  if (queries.length === 0) {
    return (
      <p className="text-center text-xl py-20 text-gray-500" aria-live="polite">
        No recent queries found.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold text-center text-purple-900 mb-12 tracking-wide drop-shadow-lg">
        Recently Added Queries
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {queries.map((query) => (
          <div
            key={query._id}
            className="flex flex-col rounded-3xl shadow-lg hover:shadow-xl overflow-hidden
                       bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-700
                       text-white border-4 border-purple-800
                       hover:from-purple-700 hover:via-pink-600 hover:to-red-600
                       transition-transform duration-300 hover:scale-[1.03]"
            role="listitem"
          >
            <img
              src={query.productImageUrl || "/placeholder.jpg"}
              alt={query.queryTitle || query.productName || "Product image"}
              className="h-48 w-full object-cover brightness-90 hover:brightness-110 transition duration-300"
              onError={(e) => (e.target.src = "/placeholder.jpg")}
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-extrabold drop-shadow-md mb-2 truncate">
                {query.queryTitle || "Untitled Query"}
              </h3>
              <p className="text-purple-200 font-semibold mb-1">
                Brand: {query.productBrand || "N/A"}
              </p>
              <p className="text-purple-300 text-sm flex-grow mb-4 line-clamp-3">
                Submitted:{" "}
                {query.date
                  ? new Date(query.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Unknown"}
              </p>

              <button
                onClick={() => navigate(`/query/${query._id}`)}
                className="bg-white text-purple-700 font-semibold rounded-full px-4 py-2
                           shadow-md hover:bg-purple-100 transition"
                aria-label={`View details of query: ${query.queryTitle}`}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentQueries;
