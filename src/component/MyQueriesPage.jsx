import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(3);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Fetch queries for logged in user
  const fetchQueries = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://server-code-three.vercel.app/products?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      const sorted = data.sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );
      setQueries(sorted);
    } catch (err) {
      console.error("Error fetching queries:", err);
      setError("Failed to load queries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        fetchQueries(user.email);
      } else {
        setUserEmail(null);
        setQueries([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  // Delete query handler
  const handleDelete = async (id, title) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the query: "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(
          `https://server-code-three.vercel.app/products/${id}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Delete request failed");
        const result = await res.json();
        if (result.deletedCount > 0) {
          Swal.fire("Deleted!", "Your query has been deleted.", "success");
          fetchQueries(userEmail);
        } else {
          Swal.fire("Error", "Could not delete the query.", "error");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    }
  };

  // Loading spinner UI
  if (loading)
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
        <span className="sr-only">Loading your queries...</span>
      </div>
    );

  // If user not logged in
  if (!userEmail)
    return (
      <div
        className="text-center py-20 text-lg text-red-600 dark:text-red-400"
        role="alert"
      >
        Please log in to view your queries.
      </div>
    );

  // If fetch error occurred
  if (error)
    return (
      <div
        className="text-center py-20 text-lg text-red-600 dark:text-red-400"
        role="alert"
      >
        {error}
      </div>
    );

  // No queries found
  if (queries.length === 0)
    return (
      <div className="text-center py-20 space-y-6">
        <p className="text-xl text-indigo-900 dark:text-indigo-200">
          You haven’t added any queries yet.
        </p>
        <button
          onClick={() => navigate("/add-query")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg
                     hover:bg-indigo-700 hover:scale-105 transition transform
                     focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50"
          aria-label="Add your first query"
          type="button"
        >
          Add Your First Query
        </button>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Banner */}
      <div
        className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700
                   text-white p-8 rounded-3xl shadow-lg mb-10
                   flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
          My Product Queries
        </h2>
        <button
          onClick={() => navigate("/add-query")}
          className="bg-indigo-700 hover:bg-indigo-800 transition
                     text-white px-6 py-3 rounded-xl font-semibold
                     focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-60"
          aria-label="Add new product query"
          type="button"
        >
          + Add Query
        </button>
      </div>

      {/* Layout toggle */}
      <div
        className="flex justify-end gap-3 mb-8"
        role="group"
        aria-label="Layout toggle"
      >
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setColumns(num)}
            className={`px-5 py-2 rounded-lg font-semibold transition
              ${
                columns === num
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50
            `}
            aria-pressed={columns === num}
            aria-label={`${num} column layout`}
            type="button"
          >
            {num} Column{num > 1 ? "s" : ""}
          </button>
        ))}
      </div>

      {/* Queries grid */}
      <div
        className={`grid gap-8 ${
          columns === 1
            ? "grid-cols-1"
            : columns === 2
            ? "sm:grid-cols-2"
            : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
        role="list"
        aria-live="polite"
      >
        {queries.map((query) => (
          <article
            key={query._id}
            role="listitem"
            tabIndex={0}
            aria-labelledby={`query-title-${query._id}`}
            className="
              flex flex-col justify-between rounded-2xl shadow-lg
              bg-gradient-to-tr from-indigo-50 via-indigo-50 to-pink-50
              dark:from-indigo-900 dark:via-indigo-900 dark:to-pink-900
              hover:from-indigo-200 hover:via-indigo-100 hover:to-pink-100
              dark:hover:from-indigo-700 dark:hover:via-indigo-600 dark:hover:to-pink-800
              transition-transform duration-200 hover:scale-105
              min-h-[420px]
            "
          >
            <div
              className="w-full rounded-t-2xl overflow-hidden shadow-md bg-indigo-100 dark:bg-indigo-800"
              style={{ aspectRatio: "16 / 9" }}
            >
              <img
                src={query.productImageUrl || "/placeholder.jpg"}
                alt={
                  query.productName
                    ? `Image of product: ${query.productName}`
                    : "Product image"
                }
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3
                  id={`query-title-${query._id}`}
                  className="text-2xl font-semibold mb-2 truncate text-indigo-900 dark:text-indigo-200"
                  title={query.queryTitle || "Untitled Query"}
                >
                  {query.queryTitle || "Untitled Query"}
                </h3>

                <p className="text-indigo-700 dark:text-indigo-400 font-medium mb-1 truncate">
                  Brand: {query.productBrand || "N/A"}
                </p>

                <p className="text-indigo-600 dark:text-indigo-500 text-sm mb-1 truncate">
                  Submitted:{" "}
                  {query.date ? new Date(query.date).toLocaleString() : "Unknown"}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3">
                <button
                  onClick={() => navigate(`/query/${query._id}`)}
                  className="bg-white text-indigo-900 flex-1 px-3 py-2 rounded-md shadow-md hover:bg-indigo-100 transition text-sm font-semibold
                             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
                  aria-label={`View details of query: ${query.queryTitle}`}
                  type="button"
                >
                  View Details
                </button>

                <button
                  onClick={() => navigate(`/update-query/${query._id}`)}
                  className="bg-white text-indigo-900 flex-1 px-3 py-2 rounded-md hover:bg-indigo-100 transition text-sm font-semibold
                             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
                  aria-label={`Update query: ${query.queryTitle}`}
                  type="button"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(query._id, query.queryTitle)}
                  className="bg-indigo-600 text-white flex-1 px-3 py-2 rounded-md hover:bg-red-600 transition text-sm font-semibold
                             focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                  aria-label={`Delete query: ${query.queryTitle}`}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
