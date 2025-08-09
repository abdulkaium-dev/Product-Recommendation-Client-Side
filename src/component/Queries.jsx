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

  // Fetch all queries sorted descending by date
  const fetchQueries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://server-code-three.vercel.app/products");
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
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

  // Filter + sort combined with useMemo for performance
  const displayedQueries = useMemo(() => {
    let filtered = queries.filter((q) =>
      q.productName?.toLowerCase().includes(search.toLowerCase())
    );
    filtered = [...filtered]; // clone to avoid in-place sort issues

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
        className="text-center text-xl py-20 text-[var(--primary)]"
        aria-live="polite"
        role="status"
      >
        Loading queries...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className="text-center text-xl py-20 text-red-600"
        role="alert"
        aria-live="assertive"
      >
        {error}
      </p>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight text-[var(--primary)]">
        All Product Queries
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="search"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border-2 border-[var(--primary)] rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
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
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--bg-light)] hover:bg-[var(--primary-light)] text-[var(--primary)]"
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
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--bg-light)] hover:bg-[var(--primary-light)] text-[var(--primary)]"
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
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "bg-[var(--bg-light)] hover:bg-[var(--primary-light)] text-[var(--primary)]"
              }
            `}
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
          className="text-center text-[var(--text-primary)] mt-10 text-lg"
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
                         bg-gradient-to-tr from-[var(--bg-light)] via-purple-50 to-pink-50
                         dark:from-[var(--bg-dark)] dark:via-purple-900 dark:to-pink-900
                         hover:from-purple-200 hover:via-purple-100 hover:to-pink-100
                         dark:hover:from-purple-700 dark:hover:via-purple-600 dark:hover:to-pink-800
                         transition-transform duration-200 hover:scale-105
                         h-[480px] w-full max-w-full"
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
                    className="text-2xl font-semibold mb-2 truncate text-[var(--text-primary)] dark:text-[var(--text-dark)]"
                    title={query.queryTitle || "Untitled Query"}
                  >
                    {query.queryTitle || "Untitled Query"}
                  </h2>

                  <p className="font-medium mb-1 truncate text-[var(--text-primary)] dark:text-[var(--text-dark)]">
                    Brand: {query.productBrand || "N/A"}
                  </p>

                  <p className="text-sm mb-1 truncate text-[var(--text-primary)] dark:text-[var(--text-dark)]">
                    Product: {query.productName || "Unknown"}
                  </p>

                  <p className="text-sm mb-1 font-semibold text-[var(--text-primary)] dark:text-[var(--text-dark)]">
                    Price: ${query.price?.toFixed(2) || "0.00"}
                  </p>

                  <p className="text-sm mb-4 text-[var(--text-primary)] dark:text-[var(--text-dark)]">
                    Recommendations: {query.recommendationCount || 0}
                  </p>

                  <p className="text-xs mb-6 truncate text-[var(--text-primary)] dark:text-[var(--text-dark)]">
                    Submitted by: {query.userName || "Anonymous"}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/query/${query._id}`)}
                  className="bg-[var(--primary)] dark:bg-indigo-700 text-white font-semibold rounded-full px-6 py-2
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
                className="absolute top-3 right-3 bg-white text-black dark:text-white text-xs font-semibold px-3 py-1 rounded-full shadow select-none"
              >
                📅 {query.date ? new Date(query.date).toLocaleDateString() : "Unknown"}
              </time>
            </article>
          ))}
        </section>
      )}

      <style jsx="true">{`
        :root {
          --primary: #4f46e5; /* Indigo 600 */
          --primary-light: #818cf8; /* Indigo 400 lighter */
          --bg-light: #eef2ff; /* Indigo 50 */
          --bg-dark: #312e81; /* Indigo 900 */
          --text-primary: #3730a3; /* Indigo 700 */
          --text-dark: #e0e7ff; /* Indigo 200 */
        }
      `}</style>
    </main>
  );
}
