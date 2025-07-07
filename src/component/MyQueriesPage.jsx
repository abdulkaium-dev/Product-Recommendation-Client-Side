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
      const res = await fetch(`http://localhost:3000/products?email=${encodeURIComponent(user.email)}`);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      // Sort by date descending
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
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Delete request failed");
        const result = await res.json();
        if (result.deletedCount > 0) {
          Swal.fire("Deleted!", "Your query has been removed.", "success");
          fetchQueries(); // Refresh list
        } else {
          Swal.fire("Error", "Could not delete the query.", "error");
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Something went wrong.", "error");
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
          + Add Queries
        </button>
      </div>

      {/* Layout Toggle Buttons */}
      <div className="flex justify-end gap-2 mb-6">
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

      {/* No Queries Message */}
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
        // Queries Grid
        <div
          className={`grid gap-6 ${
            columns === 1
              ? "grid-cols-1"
              : columns === 2
              ? "sm:grid-cols-2"
              : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
          role="list"
        >
          {queries.map((query) => (
            <div
              key={query._id}
              className="bg-white p-5 rounded-xl shadow-md border-t-4 border-purple-500 flex flex-col"
              role="listitem"
            >
              <img
                src={query.productImageUrl || "/placeholder.jpg"}
                alt={query.productName || "Product image"}
                className="h-44 w-full object-cover rounded-md mb-4"
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <h3 className="text-xl font-bold text-purple-700 mb-1">{query.queryTitle || "Untitled Query"}</h3>
              <p className="text-sm text-gray-600">Brand: {query.productBrand || "N/A"}</p>
              <p className="text-sm text-gray-400 mb-3">
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
          ))}
        </div>
      )}
    </div>
  );
}
