import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    async function fetchRecommendations() {
      try {
        const res = await fetch(
          `http://localhost:3000/myqueries/recommendations?email=${encodeURIComponent(user.email)}`
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
  }, [user]);

  if (loading)
    return (
      <div className="text-center py-20 text-xl text-gray-600">Loading...</div>
    );

  if (recommendations.length === 0)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No recommendations found for your queries.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">
        Recommendations on My Queries
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Reason</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Recommender</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Recommended At</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec) => (
              <tr key={rec._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{rec.title}</td>
                <td className="border border-gray-300 px-4 py-2">{rec.productName}</td>
                <td className="border border-gray-300 px-4 py-2">{rec.reason}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {rec.recommenderName} <br />
                  <small className="text-xs text-gray-500">{rec.recommenderEmail}</small>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(rec.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
