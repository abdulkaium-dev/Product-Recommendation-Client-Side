import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Queries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState(3);
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  // Fetch all queries sorted descending by date
  const fetchQueries = async () => {
    try {
      const res = await fetch("https://server-code-three.vercel.app/products");
      const data = await res.json();
      const sortedByDate = data.sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );
      setQueries(sortedByDate);
    } catch (err) {
      console.error("Error fetching queries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // Filter + sort combined with useMemo
  const displayedQueries = React.useMemo(() => {
    let filtered = queries.filter((q) =>
      q.productName?.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === "price-asc") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortOrder === "price-desc") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return filtered;
  }, [queries, search, sortOrder]);

  if (loading) {
    return (
      <p
        className="text-center text-xl py-20 text-purple-700"
        aria-live="polite"
        role="status"
      >
        Loading queries...
      </p>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-10 tracking-tight">
        All Product Queries
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="search"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border-2 border-purple-400 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
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
              ? "bg-purple-600 text-white"
              : "bg-gray-100 hover:bg-purple-100 text-purple-700"
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
              ? "bg-purple-600 text-white"
              : "bg-gray-100 hover:bg-purple-100 text-purple-700"
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
            className={`px-5 py-2 rounded-lg font-semibold transition
              ${
                layout === num
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-purple-100 text-purple-700"
              }
            `}
            aria-pressed={layout === num}
            aria-label={`${num} column layout`}
            type="button"
          >
            {num} Column{num > 1 && "s"}
          </button>
        ))}
      </div>

      {/* No Queries Found */}
      {displayedQueries.length === 0 ? (
        <p
          className="text-center text-gray-500 mt-10 text-lg"
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
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
          aria-label="Product queries"
        >
          {displayedQueries.map((query) => (
            <article
              key={query._id}
              className="relative flex flex-col justify-between rounded-2xl shadow-lg
                         bg-gradient-to-tr from-purple-100 via-purple-50 to-pink-50
                         dark:from-purple-900 dark:via-purple-800 dark:to-pink-900
                         hover:from-purple-200 hover:via-purple-100 hover:to-pink-100
                         dark:hover:from-purple-700 dark:hover:via-purple-600 dark:hover:to-pink-800
                         transition-transform duration-200 hover:scale-105
                         h-[480px] w-full max-w-full"
              tabIndex={0}
              aria-labelledby={`query-title-${query._id}`}
              role="article"
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
                className="h-48 w-full object-cover rounded-t-2xl shadow-md bg-gray-100"
                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                loading="lazy"
                decoding="async"
                style={{ aspectRatio: "16 / 9" }}
              />

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h2
                    id={`query-title-${query._id}`}
                    className="text-2xl font-semibold mb-2 truncate text-purple-900 dark:text-purple-100"
                    title={query.queryTitle || "Untitled Query"}
                  >
                    {query.queryTitle || "Untitled Query"}
                  </h2>

                  <p className="text-purple-700 dark:text-purple-300 font-medium mb-1 truncate">
                    Brand: {query.productBrand || "N/A"}
                  </p>

                  <p className="text-purple-600 dark:text-purple-200 text-sm mb-1 truncate">
                    Product: {query.productName || "Unknown"}
                  </p>

                  <p className="text-purple-600 dark:text-purple-300 text-sm mb-1 font-semibold">
                    Price: ${query.price?.toFixed(2) || "0.00"}
                  </p>

                  <p className="text-purple-600 dark:text-purple-300 text-sm mb-4">
                    Recommendations: {query.recommendationCount || 0}
                  </p>

                  <p className="text-purple-600 dark:text-purple-300 text-xs mb-6 truncate">
                    Submitted by: {query.userName || "Anonymous"}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/query/${query._id}`)}
                  className="bg-purple-600 dark:bg-purple-700 text-white font-semibold rounded-full px-6 py-2
                             shadow-md hover:bg-purple-700 dark:hover:bg-purple-800
                             transition self-start focus:outline-none focus:ring-4 focus:ring-purple-400"
                  aria-label={`Recommend for query titled: ${query.queryTitle}`}
                  type="button"
                >
                  Recommend 💡
                </button>
              </div>

              <time
                dateTime={query.date || ""}
                className="absolute top-3 right-3 bg-white text-purple-700 text-xs font-semibold px-3 py-1 rounded-full shadow select-none"
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
