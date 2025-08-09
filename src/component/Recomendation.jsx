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
        className="text-center py-20 text-lg text-[var(--text-primary)] dark:text-[var(--text-dark)]"
        role="status"
        aria-live="polite"
      >
        Loading recommendations...
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
        className="text-center py-20 text-lg text-[var(--text-primary)] dark:text-[var(--text-dark)]"
        role="alert"
      >
        No recommendations found for your queries.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-[var(--primary)] dark:text-[var(--primary-dark)]">
        Recommendations on My Queries
      </h1>

      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5 dark:ring-opacity-30">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)]">
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
                  className={`px-6 py-3 text-${align} text-xs font-semibold text-[var(--text-primary)] dark:text-[var(--text-dark)] uppercase tracking-wider`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-[var(--bg-dark)] divide-y divide-gray-200 dark:divide-gray-700">
            {recommendations.map((rec) => (
              <tr
                key={rec._id}
                className="hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors"
                tabIndex={0}
                aria-label={`Recommendation titled ${rec.title} for product ${rec.productName}`}
              >
                <td className="px-6 py-4 whitespace-normal max-w-xs break-words text-[var(--text-primary)] dark:text-[var(--text-dark)] font-medium">
                  {rec.title || "-"}
                </td>

                <td className="px-6 py-4 whitespace-normal max-w-xs break-words text-[var(--text-primary)] dark:text-[var(--text-dark)]">
                  {rec.productName || "-"}
                </td>

                <td className="px-6 py-4 whitespace-normal max-w-xs break-words text-[var(--text-primary)] dark:text-[var(--text-dark)]">
                  {rec.reason || "-"}
                </td>

                <td className="px-6 py-4 whitespace-normal max-w-xs break-words text-[var(--text-primary)] dark:text-[var(--text-dark)]">
                  <div className="font-semibold">{rec.recommenderName || "-"}</div>
                  <div className="text-xs text-[var(--text-primary)] dark:text-[var(--text-dark)] break-all">
                    {rec.recommenderEmail || "-"}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-[var(--text-primary)] dark:text-[var(--text-dark)] text-sm">
                  {rec.createdAt
                    ? new Date(rec.createdAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx="true">{`
        :root {
          --primary: #4f46e5; /* Indigo 600 */
          --primary-dark: #818cf8; /* Indigo 400 lighter */
          --bg-light: #eef2ff; /* Indigo 50 */
          --bg-dark: #312e81; /* Indigo 900 */
          --text-primary: #3730a3; /* Indigo 700 */
          --text-dark: #e0e7ff; /* Indigo 200 */
        }
      `}</style>
    </div>
  );
}
