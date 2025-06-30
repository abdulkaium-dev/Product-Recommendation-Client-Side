import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateQuery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [queryData, setQueryData] = useState({
    productName: "",
    productBrand: "",
    productImageUrl: "",
    queryTitle: "",
    boycottingReason: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch existing query info
  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch query");

        const data = await res.json();

        if (!data || !data._id) throw new Error("Query not found");

        // Only extract editable fields
        const { productName, productBrand, productImageUrl, queryTitle, boycottingReason } = data;
        setQueryData({
          productName,
          productBrand,
          productImageUrl,
          queryTitle,
          boycottingReason,
        });
      } catch (error) {
        console.error("Error loading query:", error);
        Swal.fire("Error", error.message, "error");
        navigate("/my-queries");
      } finally {
        setLoading(false);
      }
    };

    fetchQuery();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQueryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryData),
      });

      if (!res.ok) throw new Error("Update failed");

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Query updated successfully.",
      });
      navigate("/my-queries");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  if (loading) return <p className="text-center py-20 text-xl">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 my-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">Update Your Query</h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            name="productName"
            value={queryData.productName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Product Brand</label>
          <input
            type="text"
            name="productBrand"
            value={queryData.productBrand}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Product Image URL</label>
          <input
            type="url"
            name="productImageUrl"
            value={queryData.productImageUrl}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Query Title</label>
          <input
            type="text"
            name="queryTitle"
            value={queryData.queryTitle}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Boycotting Reason</label>
          <textarea
            name="boycottingReason"
            value={queryData.boycottingReason}
            onChange={handleChange}
            rows={4}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Update Query
        </button>
      </form>
    </div>
  );
}
