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
          `https://server-code-three.vercel.app/recommendations?email=${encodeURIComponent(user.email)}`
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
      confirmButtonColor: "#4f46e5", // Indigo 600
      cancelButtonColor: "#9ca3af", // gray neutral
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`https://server-code-three.vercel.app/recommendations/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setRecommendations((prev) => prev.filter((rec) => rec._id !== id));

      Swal.fire("Deleted!", "Your recommendation has been deleted.", "success");
    } catch (error) {
      console.error("Failed to delete recommendation:", error);
      Swal.fire("Error", "Failed to delete recommendation.", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-xl text-[#4f46e5] dark:text-[#e0e7ff]">
        Loading...
      </div>
    );

  if (recommendations.length === 0)
    return (
      <div className="text-center py-20 text-lg text-[#3730a3] dark:text-[#e0e7ff]">
        No recommendations found.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-[#4f46e5] dark:text-[#818cf8] text-center">
        My Recommendations
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-[#818cf8]">
          <thead>
            <tr className="bg-[#eef2ff] dark:bg-[#312e81] text-[#4f46e5] dark:text-[#818cf8]">
              <th className="border border-gray-300 dark:border-[#818cf8] px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 dark:border-[#818cf8] px-4 py-2 text-left">Product</th>
              <th className="border border-gray-300 dark:border-[#818cf8] px-4 py-2 text-left">Reason</th>
              <th className="border border-gray-300 dark:border-[#818cf8] px-4 py-2 text-left">Recommended At</th>
              <th className="border border-gray-300 dark:border-[#818cf8] px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec) => (
              <tr
                key={rec._id}
                className="hover:bg-indigo-50 dark:hover:bg-indigo-900 even:bg-indigo-50/50 dark:even:bg-indigo-900/50"
              >
                <td className="border border-gray-300 dark:border-[#818cf8] px-4 py-2 max-w-xs truncate">{rec.title || "-"}</td>
                <td className="border border-gray-300 dark:border-[#818cf8] px-4 py-2 max-w-xs truncate">{rec.productName || "-"}</td>
                <td className="border border-gray-300 dark:border-[#818cf8] px-4 py-2 max-w-md truncate">{rec.reason || "-"}</td>
                <td className="border border-gray-300 dark:border-[#818cf8] px-4 py-2 whitespace-nowrap">
                  {new Date(rec.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 dark:border-[#818cf8] px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(rec._id)}
                    className="bg-[#4f46e5] hover:bg-[#4338ca] text-white py-1 px-3 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:ring-opacity-60"
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
