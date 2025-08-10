import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    async function fetchRecommendations() {
      try {
        const res = await fetch(
          `https://server-code-three.vercel.app/myqueries/recommendations?email=${encodeURIComponent(
            userEmail
          )}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setRecommendations(data);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [userEmail]);

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
      <div
        className="text-center py-20 text-lg text-indigo-700 dark:text-indigo-300"
        role="alert"
      >
        No recommendations found for your queries.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-600 dark:text-indigo-400">
        Recommendations on My Queries
      </h1>

      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5 dark:ring-opacity-30">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-indigo-50 dark:bg-indigo-900">
            <tr>
              {[
                { label: "Title", align: "left" },
                { label: "Product Name", align: "left" },
                { label: "Reason", align: "left" },
                { label: "Recommender", align: "left" },
                { label: "Recommended At", align: "left" },
              ].map(({ label, align }) => (
                <th
                  key={label}
                  scope="col"
                  className={`px-6 py-3 text-${align} text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider select-none`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-indigo-800 divide-y divide-gray-200 dark:divide-gray-700">
            {recommendations.map((rec) => (
              <tr
                key={rec._id}
                className="hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-400"
                tabIndex={0}
                aria-label={`Recommendation titled ${rec.title} for product ${rec.productName}`}
              >
                <td className="px-6 py-4 max-w-xs break-words text-indigo-700 dark:text-indigo-300 font-medium whitespace-normal">
                  {rec.title || "-"}
                </td>

                <td className="px-6 py-4 max-w-xs break-words text-indigo-700 dark:text-indigo-300 whitespace-normal">
                  {rec.productName || "-"}
                </td>

                <td className="px-6 py-4 max-w-xs break-words text-indigo-700 dark:text-indigo-300 whitespace-normal">
                  {rec.reason || "-"}
                </td>

                <td className="px-6 py-4 max-w-xs break-words text-indigo-700 dark:text-indigo-300 whitespace-normal">
                  <div className="font-semibold">{rec.recommenderName || "-"}</div>
                  <div className="text-xs break-all">{rec.recommenderEmail || "-"}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-indigo-700 dark:text-indigo-300 text-sm">
                  {rec.createdAt
                    ? new Date(rec.createdAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
