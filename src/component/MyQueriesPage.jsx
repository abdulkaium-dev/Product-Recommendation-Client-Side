import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(3);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const fetchQueries = async () => {
    if (!user) return;
    try {
      const res = await fetch(
        `https://server-code-three.vercel.app/products?email=${encodeURIComponent(
          user.email
        )}`
      );
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setQueries(sorted);
    } catch (error) {
      console.error("Error fetching queries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, [user]);

  const handleDelete = async (id, title) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the query: "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5", // Indigo 600
      cancelButtonColor: "#9ca3af", // gray-400 neutral
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
          fetchQueries();
        } else {
          Swal.fire("Error", "Could not delete the query.", "error");
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    }
  };

  if (loading) {
    return (
      <p
        className="text-center text-xl py-20 text-[#4f46e5] dark:text-[#e0e7ff]"
        role="status"
        aria-live="polite"
      >
        Loading your queries...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Banner */}
      <div
        className="bg-gradient-to-r from-[#4f46e5] via-[#818cf8] to-[#312e81]
                   text-white p-8 rounded-3xl shadow-lg mb-10
                   flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          My Product Queries
        </h2>
        <button
          onClick={() => navigate("/add-query")}
          className="bg-[#4f46e5] hover:bg-[#4338ca] transition
                     text-white px-6 py-3 rounded-xl font-semibold
                     focus:outline-none focus:ring-4 focus:ring-[#818cf8] focus:ring-opacity-60"
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
                  ? "bg-[#4f46e5] text-white shadow-lg"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }
              focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:ring-opacity-50
            `}
            aria-pressed={columns === num}
            aria-label={`${num} column layout`}
            type="button"
          >
            {num} Column{num > 1 ? "s" : ""}
          </button>
        ))}
      </div>

      {/* No queries */}
      {queries.length === 0 ? (
        <div className="text-center py-20 space-y-6">
          <p className="text-xl text-[#3730a3] dark:text-[#e0e7ff]">
            You haven’t added any queries yet.
          </p>
          <button
            onClick={() => navigate("/add-query")}
            className="bg-[#4f46e5] text-white px-8 py-3 rounded-lg
                       hover:bg-[#4338ca] hover:scale-105 transition transform
                       focus:outline-none focus:ring-4 focus:ring-[#818cf8] focus:ring-opacity-50"
            aria-label="Add your first query"
            type="button"
          >
            Add Your First Query
          </button>
        </div>
      ) : (
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
              className="flex flex-col justify-between rounded-2xl shadow-lg
                         bg-gradient-to-tr from-[#eef2ff] via-[#eef2ff] to-pink-50
                         dark:from-[#312e81] dark:via-[#312e81] dark:to-pink-900
                         hover:from-indigo-200 hover:via-indigo-100 hover:to-pink-100
                         dark:hover:from-indigo-700 dark:hover:via-indigo-600 dark:hover:to-pink-800
                         transition-transform duration-200 hover:scale-105
                         h-[420px]"
            >
              <div
                className="w-full rounded-t-2xl overflow-hidden shadow-md bg-[#eef2ff] dark:bg-[#312e81]"
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

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3
                    id={`query-title-${query._id}`}
                    className="text-2xl font-semibold mb-2 truncate text-[#3730a3] dark:text-[#e0e7ff]"
                    title={query.queryTitle || "Untitled Query"}
                  >
                    {query.queryTitle || "Untitled Query"}
                  </h3>

                  <p className="text-[#4f46e5] dark:text-[#818cf8] font-medium mb-1 truncate">
                    Brand: {query.productBrand || "N/A"}
                  </p>

                  <p className="text-[#818cf8] dark:text-[#4f46e5] text-sm mb-1 truncate">
                    Submitted:{" "}
                    {query.date
                      ? new Date(query.date).toLocaleString()
                      : "Unknown"}
                  </p>
                </div>

                <div className="flex justify-between mt-4 gap-3">
                  <button
                    onClick={() => navigate(`/query/${query._id}`)}
                    className="bg-white text-black flex-1 px-3 py-2 rounded-md shadow-md hover:bg-indigo-50 transition text-sm font-semibold
                               focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:ring-opacity-50"
                    aria-label={`View details of query: ${query.queryTitle}`}
                    type="button"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => navigate(`/update-query/${query._id}`)}
                    className="bg-white text-black flex-1 px-3 py-2 rounded-md hover:bg-indigo-50 transition text-sm font-semibold
                               focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:ring-opacity-50"
                    aria-label={`Update query: ${query.queryTitle}`}
                    type="button"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(query._id, query.queryTitle)}
                    className="bg-[#4f46e5] text-white flex-1 px-3 py-2 rounded-md hover:bg-red-50 transition text-sm font-semibold
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
      )}
    </div>
  );
}
