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

      setRecommendations((prev) => prev.filter((rec) => rec._id !== id));

      Swal.fire("Deleted!", "Your recommendation has been deleted.", "success");
    } catch (error) {
      console.error("Failed to delete recommendation:", error);
      Swal.fire("Error", "Failed to delete recommendation.", "error");
    }
  };

  if (loading)
    return <div className="text-center py-20 text-xl text-gray-600">Loading...</div>;

  if (recommendations.length === 0)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No recommendations found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">My Recommendations</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Reason</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Recommended At</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec) => (
              <tr key={rec._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{rec.title}</td>
                <td className="border border-gray-300 px-4 py-2">{rec.productName}</td>
                <td className="border border-gray-300 px-4 py-2">{rec.reason}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(rec.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(rec._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    aria-label={`Delete recommendation for ${rec.title}`}
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
