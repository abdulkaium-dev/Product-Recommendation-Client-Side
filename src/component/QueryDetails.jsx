import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const QueryDetails = () => {
  const { id } = useParams();
  const [queryData, setQueryData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendForm, setRecommendForm] = useState({
    title: "",
    productName: "",
    productImage: "",
    reason: "",
  });

  const auth = getAuth();
  const user = auth.currentUser;

  const fetchData = async () => {
    setLoading(true);
    try {
      const resQuery = await fetch(`https://server-code-three.vercel.app/products/${id}`);
      if (!resQuery.ok) throw new Error("Query not found");
      const query = await resQuery.json();
      setQueryData(query);

      const resRecs = await fetch(
        `https://server-code-three.vercel.app/recommendations?queryId=${encodeURIComponent(id)}`
      );
      if (!resRecs.ok) throw new Error("Failed to fetch recommendations");
      const recs = await resRecs.json();
      recs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecommendations(recs);
    } catch (error) {
      console.error(error);
      setQueryData(null);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setRecommendForm({ ...recommendForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return Swal.fire("Unauthorized", "Please login to recommend.", "warning");
    }
    if (!queryData) {
      return Swal.fire("Error", "Query data is missing.", "error");
    }
    const recommendation = {
      title: recommendForm.title,
      productName: recommendForm.productName,
      productImage: recommendForm.productImage,
      reason: recommendForm.reason,
      queryId: queryData._id,
      queryTitle: queryData.queryTitle,
      productNameOriginal: queryData.productName,
      userEmail: queryData.userEmail,
      userName: queryData.userName,
      recommenderEmail: user.email,
      recommenderName: user.displayName || user.email,
      createdAt: new Date().toISOString(),
    };
    try {
      const res = await fetch("https://server-code-three.vercel.app/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recommendation),
      });
      if (!res.ok) throw new Error("Failed to submit recommendation");
      Swal.fire("Success", "Recommendation submitted!", "success");
      setRecommendForm({ title: "", productName: "", productImage: "", reason: "" });
      fetchData();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to submit recommendation.", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-lg font-semibold text-indigo-700 dark:text-indigo-200">
        Loading...
      </div>
    );

  if (!queryData)
    return (
      <div className="text-center py-20 font-semibold text-red-600">
        Query not found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-indigo-50 dark:bg-indigo-900 rounded-lg shadow-md space-y-8 text-indigo-700 dark:text-indigo-200">
      {/* Query Details */}
      <h1 className="text-3xl font-bold text-indigo-600">{queryData.queryTitle}</h1>
      <div className="space-y-3">
        <p>
          <strong>Product Name:</strong> {queryData.productName}
        </p>
        <p>
          <strong>Product Brand:</strong> {queryData.productBrand}
        </p>
        <p>
          <strong>Boycotting Reason:</strong> {queryData.boycottingReason}
        </p>
        <img
          src={queryData.productImageUrl || "/placeholder.jpg"}
          alt={queryData.productName}
          className="w-full max-w-sm rounded-lg object-cover"
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
      </div>

      {/* User Info */}
      <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-lg shadow-inner flex items-center gap-4">
        <img
          src={queryData.userPhoto || "/user-placeholder.png"}
          alt={queryData.userName || "User"}
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => (e.target.src = "/user-placeholder.png")}
        />
        <div>
          <p className="font-semibold">{queryData.userName || "Anonymous"}</p>
          <p className="text-sm text-indigo-700 dark:text-indigo-200">{queryData.userEmail || "No email"}</p>
        </div>
      </div>

      {/* Recommendation Form */}
      <section className="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">Add a Recommendation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={recommendForm.title}
            onChange={handleChange}
            placeholder="Recommendation Title"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="productName"
            value={recommendForm.productName}
            onChange={handleChange}
            placeholder="Recommended Product Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="url"
            name="productImage"
            value={recommendForm.productImage}
            onChange={handleChange}
            placeholder="Recommended Product Image URL"
            className="input input-bordered w-full"
          />
          <textarea
            name="reason"
            value={recommendForm.reason}
            onChange={handleChange}
            placeholder="Why are you recommending this product?"
            className="textarea textarea-bordered w-full"
            required
          />
          <button
            type="submit"
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full"
          >
            Add Recommendation
          </button>
        </form>
      </section>

      {/* Recommendations List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Recommendations ({recommendations.length})
        </h2>
        {recommendations.length === 0 ? (
          <p className="text-indigo-500 dark:text-indigo-400">No recommendations yet.</p>
        ) : (
          <ul className="space-y-6">
            {recommendations.map((rec) => (
              <li
                key={rec._id}
                className="border rounded-lg p-4 bg-indigo-50 dark:bg-indigo-900 shadow-sm flex gap-4"
              >
                {rec.productImage ? (
                  <img
                    src={rec.productImage}
                    alt={rec.productName}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                ) : (
                  <div className="w-20 h-20 bg-indigo-200 dark:bg-indigo-700 rounded flex items-center justify-center text-indigo-400 dark:text-indigo-500">
                    No Image
                  </div>
                )}
                <div className="flex-1 text-indigo-700 dark:text-indigo-200">
                  <h3 className="text-lg font-semibold">{rec.title}</h3>
                  <p className="text-sm font-medium">Product: {rec.productName}</p>
                  <p className="mt-1">{rec.reason}</p>
                  <p className="text-xs mt-2 text-indigo-500 dark:text-indigo-400">
                    Recommended by{" "}
                    <strong>{rec.recommenderName || rec.recommenderEmail}</strong> on{" "}
                    {new Date(rec.createdAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default QueryDetails;
