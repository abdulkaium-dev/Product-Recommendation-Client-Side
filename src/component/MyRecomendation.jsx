import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

export default function MyRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user?.email) return;

    const fetchRecommendations = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/recommendations?email=${encodeURIComponent(user.email)}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setRecommendations(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/recommendations/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      // Remove from local state
      setRecommendations((prev) => prev.filter((rec) => rec._id !== id));

      Swal.fire("Deleted!", "Your recommendation has been deleted.", "success");
    } catch (error) {
      console.error("Failed to delete recommendation:", error);
      Swal.fire("Error", "Failed to delete recommendation.", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-xl text-gray-600">Loading...</div>
    );

  if (recommendations.length === 0)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No recommendations found.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-purple-700 text-center">
        My Recommendations
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-purple-100 text-purple-800">
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Reason</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Recommended At</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec) => (
              <tr
                key={rec._id}
                className="hover:bg-purple-50 even:bg-purple-50/50"
              >
                <td className="border border-gray-300 px-4 py-2 max-w-xs truncate">{rec.title || "-"}</td>
                <td className="border border-gray-300 px-4 py-2 max-w-xs truncate">{rec.productName || "-"}</td>
                <td className="border border-gray-300 px-4 py-2 max-w-md truncate">{rec.reason || "-"}</td>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  {new Date(rec.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(rec._id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg font-semibold transition"
                    aria-label={`Delete recommendation titled ${rec.title}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
