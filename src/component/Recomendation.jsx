import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
      else {
        setUserEmail(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    async function fetchRecommendations() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://server-code-three.vercel.app/myqueries/recommendations?email=${encodeURIComponent(
            userEmail
          )}`
        );
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        const data = await res.json();
        setRecommendations(data);
      } catch (err) {
        console.error(err);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [userEmail]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <svg
          className="animate-spin h-12 w-12 text-indigo-600 dark:text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>
    );

  if (!userEmail)
    return (
      <div className="text-center py-20 text-red-600">
        Please log in to view your recommendations.
      </div>
    );

  if (recommendations.length === 0)
    return (
      <div className="text-center py-20 text-indigo-700">
        No recommendations found for your queries.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Recommendations on My Queries
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              {[
                { label: "Query Title", key: "queryTitle" },
                { label: "Product Name", key: "productName" },
                { label: "Boycotting Reason", key: "boycottingReason" },
                { label: "Recommender Email", key: "recommenderEmail" },
                { label: "Recommended At", key: "createdAt" },
              ].map(({ label, key }) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-semibold text-indigo-700 uppercase"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {recommendations.map((rec) => (
              <tr key={rec._id} className="hover:bg-indigo-100">
                <td className="px-6 py-4">{rec.queryDetails?.queryTitle || "-"}</td>
                <td className="px-6 py-4">{rec.queryDetails?.productName || "-"}</td>
                <td className="px-6 py-4">{rec.boycottingReason || "-"}</td>
                <td className="px-6 py-4">{rec.recommenderEmail || "-"}</td>
                <td className="px-6 py-4">
                  {rec.createdAt ? new Date(rec.createdAt).toLocaleString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
