import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecentQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Convert MongoDB ObjectId timestamp
  function getTimestampFromObjectId(objectId) {
    return parseInt(objectId.substring(0, 8), 16) * 1000;
  }

  useEffect(() => {
    fetch("https://server-code-three.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        // Sort by newest (ObjectId timestamp)
        const sorted = data.sort(
          (a, b) => getTimestampFromObjectId(b._id) - getTimestampFromObjectId(a._id)
        );
        setQueries(sorted.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p
        className="text-center text-lg py-20 text-indigo-700 dark:text-indigo-200"
        aria-live="polite"
        role="status"
      >
        Loading recent queries...
      </p>
    );
  }

  if (queries.length === 0) {
    return (
      <p
        className="text-center text-lg py-20 text-indigo-700 dark:text-indigo-200"
        aria-live="polite"
        role="status"
      >
        No recent queries found.
      </p>
    );
  }

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      aria-label="Recently added queries"
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-200 mb-12 tracking-wide">
        Recently Added Queries
      </h2>

      <div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Recent Queries List"
      >
        {queries.map((query) => (
          <article
            key={query._id}
            role="listitem"
            className="
              flex flex-col rounded-2xl shadow-lg
              bg-gradient-to-tr from-indigo-100 via-indigo-100 to-pink-50
              dark:from-indigo-900 dark:via-indigo-900 dark:to-pink-900
              hover:from-indigo-200 hover:via-indigo-100 hover:to-pink-100
              dark:hover:from-indigo-700 dark:hover:via-indigo-600 dark:hover:to-pink-800
              transition-transform duration-200 hover:scale-105
              min-h-[460px]
            "
          >
            <img
              src={query.productImageUrl || "/placeholder.jpg"}
              alt={
                query.queryTitle
                  ? `Image for query: ${query.queryTitle}`
                  : query.productName
                  ? `Image for product: ${query.productName}`
                  : "Product image"
              }
              className="h-48 w-full object-cover rounded-t-2xl"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/placeholder.jpg";
              }}
              loading="lazy"
              decoding="async"
            />

            <div className="p-4 sm:p-6 flex flex-col flex-grow">
              <h3
                className="text-xl sm:text-2xl font-semibold mb-2 truncate text-indigo-700 dark:text-indigo-200"
                title={query.queryTitle || "Untitled Query"}
              >
                {query.queryTitle || "Untitled Query"}
              </h3>

              <p className="text-indigo-700 dark:text-indigo-200 font-medium mb-1">
                Brand: {query.productBrand || "N/A"}
              </p>

              <p className="text-indigo-700 dark:text-indigo-200 text-sm flex-grow mb-4 line-clamp-3">
                {query.shortDescription
                  ? query.shortDescription
                  : query.productDescription
                  ? query.productDescription.substring(0, 100) + "..."
                  : "No description available."}
              </p>

              <button
                onClick={() => navigate(`/query/${query._id}`)}
                className="
                  bg-indigo-600 dark:bg-indigo-700 text-white font-semibold rounded-full px-6 py-2
                  shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-800
                  transition self-start
                  focus:outline-none focus:ring-4 focus:ring-indigo-500
                  text-sm sm:text-base
                "
                aria-label={`See more details about query: ${query.queryTitle || "Untitled Query"}`}
                type="button"
              >
                See More
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentQueries;
