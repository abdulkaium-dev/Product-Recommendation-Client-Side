import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';

const QueryDetails = () => {
  const { id } = useParams();
  const [queryData, setQueryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendForm, setRecommendForm] = useState({
    title: '',
    productName: '',
    productImage: '',
    reason: '',
  });
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        if (!res.ok) throw new Error('Query not found');
        const data = await res.json();
        setQueryData(data);
      } catch (err) {
        console.error('Error fetching query details:', err);
        setQueryData(null);
      } finally {
        setLoading(false);
      }
    };

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

    const recommendation = {
      ...recommendForm,
      queryId: queryData._id,
      queryTitle: queryData.queryTitle,
      productName: queryData.productName,
      userEmail: queryData.userEmail,
      userName: queryData.userName,
      recommenderEmail: user.email,
      recommenderName: user.displayName,
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch("http://localhost:3000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(recommendation)
      });

      if (res.ok) {
        Swal.fire("Success", "Recommendation submitted!", "success");
        setRecommendForm({
          title: '',
          productName: '',
          productImage: '',
          reason: ''
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      Swal.fire("Error", "Failed to submit recommendation.", "error");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!queryData) return <div className="text-center text-red-600 mt-10">Query not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg space-y-6">
      <h1 className="text-3xl font-bold text-purple-600">{queryData.queryTitle}</h1>

      {/* Query Info */}
      <div className="space-y-2 text-gray-700">
        <p><strong>Product Name:</strong> {queryData.productName}</p>
        <p><strong>Product Brand:</strong> {queryData.productBrand}</p>
        <p><strong>Reason:</strong> {queryData.boycottingReason}</p>
        <img
          src={queryData.productImageUrl}
          alt={queryData.productName}
          className="w-full max-w-sm rounded-lg"
        />
      </div>

      {/* User Info */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
        <h2 className="text-lg font-semibold">Posted by:</h2>
        <div className="flex items-center gap-4 mt-2">
          <img src={queryData.userPhoto} alt="User" className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-medium">{queryData.userName}</p>
            <p className="text-sm text-gray-500">{queryData.userEmail}</p>
          </div>
        </div>
      </div>

      {/* Add Recommendation Form */}
      <div className="bg-gray-100 p-6 rounded-lg mt-6">
        <h3 className="text-xl font-semibold mb-4 text-purple-700">Add a Recommendation</h3>
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
          <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700 w-full">
            Add Recommendation
          </button>
        </form>
      </div>
    </div>
  );
};

export default QueryDetails;
