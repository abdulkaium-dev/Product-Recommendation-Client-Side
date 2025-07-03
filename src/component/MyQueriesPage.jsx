import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyQueries() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  // Fetch user's queries
  const fetchQueries = async () => {
    if (!user) return;

    try {
      const res = await fetch(`http://localhost:3000/products?email=${user.email}`);
      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setQueries(sorted);
    } catch (error) {
      console.error("Failed to load queries", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, [user]);

  // Delete handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this query?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        });
        const result = await res.json();
        if (result.deletedCount > 0) {
          Swal.fire("Deleted!", "Your query has been deleted.", "success");
          fetchQueries();
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  if (loading) return <p className="text-center text-xl py-20">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* === Banner Section === */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-8 rounded-3xl shadow-lg mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-bold">My Product Queries</h2>
        <button
          onClick={() => navigate("/add-query")}
          className="bg-white text-purple-700 px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          + Add Queries
        </button>
      </div>

      {/* === No Query Message === */}
      {queries.length === 0 ? (
        <div className="text-center py-20 space-y-6">
          <p className="text-xl text-gray-600">You haven't added any queries yet.</p>
          <button
            onClick={() => navigate("/add-query")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition"
          >
            Add Your First Query
          </button>
        </div>
      ) : (
        // === Query Grid ===
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {queries.map((query) => (
            <div
              key={query._id}
              className="bg-white p-5 rounded-xl shadow-md border-t-4 border-purple-500"
            >
              <img
                src={query.productImageUrl}
                alt={query.productName}
                className="h-44 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-purple-700 mb-1">{query.queryTitle}</h3>
              <p className="text-sm text-gray-500 mb-1">Brand: {query.productBrand}</p>
              <p className="text-xs text-gray-400 mb-3">
                Submitted: {new Date(query.date).toLocaleString()}
              </p>
              <div className="flex flex-wrap gap-2">
               <button
  onClick={() => navigate(`/query/${query._id}`)}
  className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
>
  View Details
</button>
                <button
                  onClick={() => navigate(`/update-query/${query._id}`)}
                  className="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(query._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
