import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Queries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState(3);
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  // Fetch queries from API
  const fetchQueries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://server-code-three.vercel.app/products");
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();

      // Artificial delay for spinner visibility
      await new Promise((r) => setTimeout(r, 1000));

      // Sort by date descending by default
      const sortedByDate = data.sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );
      setQueries(sortedByDate);
    } catch (err) {
      console.error("Error fetching queries:", err);
      setError(err.message || "Error fetching queries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // Filter and sort queries memoized
  const displayedQueries = useMemo(() => {
    let filtered = queries.filter((q) =>
      q.productName?.toLowerCase().includes(search.toLowerCase())
    );
    filtered = [...filtered];
    if (sortOrder === "price-asc") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOrder === "price-desc") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    return filtered;
  }, [queries, search, sortOrder]);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center py-20"
        role="status"
        aria-live="polite"
      >
        <svg
          className="animate-spin h-12 w-12 text-indigo-600 dark:text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <span className="sr-only">Loading queries...</span>
      </div>
    );
  }

  if (error) {
    return (
      <p
        className="text-center text-xl py-20 text-red-600 dark:text-red-400"
        role="alert"
        aria-live="assertive"
      >
        {error}
      </p>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight text-indigo-600 dark:text-indigo-400">
        All Product Queries
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="search"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border-2 border-indigo-600 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:border-indigo-400 dark:focus:ring-indigo-400
                     text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 transition"
          aria-label="Search queries by product name"
        />
      </div>

      {/* Sorting Buttons */}
      <div
        className="flex justify-center gap-4 mb-6"
        role="group"
        aria-label="Sort products by price"
      >
        <button
          onClick={() => setSortOrder("price-asc")}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            sortOrder === "price-asc"
              ? "bg-indigo-600 text-white shadow"
              : "bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-700"
          }`}
          aria-pressed={sortOrder === "price-asc"}
          type="button"
        >
          Price: Low to High
        </button>
        <button
          onClick={() => setSortOrder("price-desc")}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            sortOrder === "price-desc"
              ? "bg-indigo-600 text-white shadow"
              : "bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-700"
          }`}
          aria-pressed={sortOrder === "price-desc"}
          type="button"
        >
          Price: High to Low
        </button>
      </div>

      {/* Layout Toggle Buttons */}
      <div
        className="flex justify-center gap-3 mb-8"
        role="group"
        aria-label="Select layout columns"
      >
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setLayout(num)}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              layout === num
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-700"
            }`}
            aria-pressed={layout === num}
            aria-label={`${num} column layout`}
            type="button"
          >
            {num} Column{num > 1 ? "s" : ""}
          </button>
        ))}
      </div>

      {/* No Queries Found */}
      {displayedQueries.length === 0 ? (
        <p
          className="text-center text-indigo-700 dark:text-indigo-300 mt-10 text-lg"
          aria-live="polite"
          role="alert"
        >
          No matching queries found.
        </p>
      ) : (
        <section
          className={`grid gap-8 ${
            layout === 1
              ? "grid-cols-1"
              : layout === 2
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          }`}
          aria-label="Product queries"
        >
          {displayedQueries.map((query) => (
            <article
              key={query._id}
              className="relative flex flex-col justify-between rounded-2xl shadow-lg
                         bg-gradient-to-tr from-indigo-50 via-indigo-50 to-pink-50
                         dark:from-indigo-900 dark:via-indigo-900 dark:to-pink-900
                         hover:from-indigo-200 hover:via-indigo-100 hover:to-pink-100
                         dark:hover:from-indigo-700 dark:hover:via-indigo-600 dark:hover:to-pink-800
                         transition-transform duration-200 hover:scale-105
                         h-[480px] w-full max-w-full
                         focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:focus:ring-indigo-300"
              tabIndex={0}
              aria-labelledby={`query-title-${query._id}`}
              role="article"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-t-2xl overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800">
                <img
                  src={query.productImageUrl || "/placeholder.jpg"}
                  alt={
                    query.queryTitle
                      ? `Image for query: ${query.queryTitle}`
                      : query.productName
                      ? `Image for product: ${query.productName}`
                      : "Product image"
                  }
                  className="object-cover w-full h-full"
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h2
                    id={`query-title-${query._id}`}
                    className="text-2xl font-semibold mb-2 truncate text-indigo-700 dark:text-indigo-300"
                    title={query.queryTitle || "Untitled Query"}
                  >
                    {query.queryTitle || "Untitled Query"}
                  </h2>

                  <p className="font-medium mb-1 truncate text-indigo-700 dark:text-indigo-300">
                    Brand: {query.productBrand || "N/A"}
                  </p>

                  <p className="text-sm mb-1 truncate text-indigo-700 dark:text-indigo-300">
                    Product: {query.productName || "Unknown"}
                  </p>

                  <p className="text-sm mb-1 font-semibold text-indigo-700 dark:text-indigo-300">
                    Price: ${query.price?.toFixed(2) || "0.00"}
                  </p>

                  <p className="text-sm mb-4 text-indigo-700 dark:text-indigo-300">
                    Recommendations: {query.recommendationCount || 0}
                  </p>

                  <p className="text-xs mb-6 truncate text-indigo-700 dark:text-indigo-300">
                    Submitted by: {query.userName || "Anonymous"}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/query/${query._id}`)}
                  className="bg-indigo-600 dark:bg-indigo-700 text-white font-semibold rounded-full px-6 py-2
                             shadow-md hover:bg-indigo-700 dark:hover:bg-indigo-800
                             transition self-start focus:outline-none focus:ring-4 focus:ring-indigo-400"
                  aria-label={`Recommend for query titled: ${query.queryTitle}`}
                  type="button"
                >
                  Recommend 💡
                </button>
              </div>

              <time
                dateTime={query.date || ""}
                className="absolute top-3 right-3 bg-white text-black dark:bg-gray-800 dark:text-white text-xs font-semibold px-3 py-1 rounded-full shadow select-none"
              >
                📅 {query.date ? new Date(query.date).toLocaleDateString() : "Unknown"}
              </time>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
