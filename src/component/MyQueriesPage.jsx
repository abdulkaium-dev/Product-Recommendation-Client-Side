import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(3); // Layout toggle: 1, 2, or 3 columns
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  // Fetch queries created by the logged-in user
  const fetchQueries = async () => {
    if (!user) return;
    try {
      const res = await fetch(
        `https://server-code-three.vercel.app/products?email=${encodeURIComponent(user.email)}`
      );
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      // Sort by date descending (newest first)
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

  // Delete query with confirmation
  const handleDelete = async (id, title) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the query: "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://server-code-three.vercel.app/products/${id}`, {
          method: "DELETE",
        });
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
    return <p className="text-center text-xl py-20">Loading your queries...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Stylish Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-8 rounded-3xl shadow-lg mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-bold">My Product Queries</h2>
        <button
          onClick={() => navigate("/add-query")}
          className="bg-white text-purple-700 px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
          aria-label="Add new product query"
        >
          + Add Query
        </button>
      </div>

      {/* Layout Toggle Buttons */}
      <div className="flex justify-end gap-2 mb-6" role="group" aria-label="Layout toggle">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setColumns(num)}
            className={`px-4 py-1 border rounded-lg ${
              columns === num ? "bg-purple-600 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            aria-pressed={columns === num}
            aria-label={`${num} column layout`}
          >
            {num} Column{num > 1 ? "s" : ""}
          </button>
        ))}
      </div>

      {/* If no queries */}
      {queries.length === 0 ? (
        <div className="text-center py-20 space-y-6">
          <p className="text-xl text-gray-600">You haven’t added any queries yet.</p>
          <button
            onClick={() => navigate("/add-query")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition"
            aria-label="Add your first query"
          >
            Add Your First Query
          </button>
        </div>
      ) : (
        // Queries grid
        <div
          className={`grid gap-6 ${
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
            <div
              key={query._id}
              role="listitem"
              className="flex flex-col rounded-3xl shadow-lg overflow-hidden
                         bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-700
                         text-white border-4 border-purple-800
                         hover:from-purple-700 hover:via-pink-600 hover:to-red-600
                         transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={query.productImageUrl || "/placeholder.jpg"}
                alt={query.productName || "Product image"}
                className="h-44 w-full object-cover brightness-90 hover:brightness-110 transition duration-300"
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-extrabold drop-shadow-md mb-2 truncate">
                  {query.queryTitle || "Untitled Query"}
                </h3>
                <p className="text-purple-200 font-semibold mb-1">
                  Brand: {query.productBrand || "N/A"}
                </p>
                <p className="text-purple-300 text-sm flex-grow mb-4 line-clamp-3">
                  Submitted: {query.date ? new Date(query.date).toLocaleString() : "Unknown"}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  <button
                    onClick={() => navigate(`/query/${query._id}`)}
                    className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
                    aria-label={`View details of query: ${query.queryTitle}`}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate(`/update-query/${query._id}`)}
                    className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600"
                    aria-label={`Update query: ${query.queryTitle}`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(query._id, query.queryTitle)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    aria-label={`Delete query: ${query.queryTitle}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
