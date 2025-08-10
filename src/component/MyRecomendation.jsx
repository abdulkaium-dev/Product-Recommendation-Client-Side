import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

export default function MyRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
        setRecommendations([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!userEmail) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://server-code-three.vercel.app/recommendations?email=${encodeURIComponent(
            userEmail
          )}`
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
  }, [userEmail]);

  const handleDelete = async (id, title = "this recommendation") => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete ${title}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://server-code-three.vercel.app/recommendations/${id}`,
        { method: "DELETE" }
      );

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
      <div
        className="flex justify-center items-center py-20"
        role="status"
        aria-live="polite"
      >
        <svg
          className="animate-spin h-12 w-12 text-indigo-600 dark:text-indigo-300"
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
        <span className="sr-only">Loading recommendations...</span>
      </div>
    );

  if (!userEmail)
    return (
      <div
        className="text-center py-20 text-lg text-red-600 dark:text-red-400"
        role="alert"
      >
        Please log in to view your recommendations.
      </div>
    );

  if (recommendations.length === 0)
    return (
      <div className="text-center py-20 text-lg text-indigo-900 dark:text-indigo-200">
        No recommendations found.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-8 text-indigo-700 dark:text-indigo-300 text-center">
        My Recommendations
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-indigo-700 rounded-lg">
          <thead>
            <tr className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-100">
              {["Title", "Product", "Reason", "Recommended At", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="border border-gray-300 dark:border-indigo-700 px-4 py-3 text-left whitespace-nowrap"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec, i) => (
              <tr
                key={rec._id}
                className={`${
                  i % 2 === 0
                    ? "bg-indigo-50 dark:bg-indigo-800"
                    : "bg-indigo-100 dark:bg-indigo-700"
                } hover:bg-indigo-200 dark:hover:bg-indigo-600 transition-colors`}
              >
                <td className="border border-gray-300 dark:border-indigo-700 px-4 py-2 max-w-xs truncate text-indigo-900 dark:text-indigo-100">
                  {rec.title || "-"}
                </td>
                <td className="border border-gray-300 dark:border-indigo-700 px-4 py-2 max-w-xs truncate text-indigo-900 dark:text-indigo-100">
                  {rec.productName || "-"}
                </td>
                <td className="border border-gray-300 dark:border-indigo-700 px-4 py-2 max-w-md truncate text-indigo-900 dark:text-indigo-100">
                  {rec.reason || "-"}
                </td>
                <td className="border border-gray-300 dark:border-indigo-700 px-4 py-2 whitespace-nowrap text-indigo-900 dark:text-indigo-100">
                  {rec.createdAt
                    ? new Date(rec.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                <td className="border border-gray-300 dark:border-indigo-700 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(rec._id, rec.title)}
                    className="bg-indigo-700 hover:bg-indigo-800 text-white py-1 px-3 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-60"
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
