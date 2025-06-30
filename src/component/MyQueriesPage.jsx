import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// ✅ Reusable DataCard component
export const DataCard = ({ data }) => {
  const { title, content, timestamp } = data;

  return (
    <motion.div
      className="max-w-sm rounded-2xl shadow-lg bg-white overflow-hidden p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-700 mb-4 line-clamp-3">{content}</p>
      <p className="text-xs text-gray-500">
        Created: {new Date(timestamp).toLocaleString()}
      </p>
    </motion.div>
  );
};

// ✅ MyQueriesPage component
export default function MyQueriesPage({ queries = [], userId, deleteQuery }) {
  const navigate = useNavigate();

  // 🧹 Filter and sort queries
  const sortedQueries = queries
    .filter((q) => q.userId === userId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const recentSixQueries = sortedQueries.slice(0, 6);

  // 🗑️ Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      try {
        await deleteQuery(id);
        toast.success("Query deleted successfully");
      } catch {
        toast.error("Failed to delete query");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* 🔷 Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-lg text-white flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Queries</h1>
        <button
          onClick={() => navigate("/add-query")}
          className="btn btn-primary"
        >
          Add Queries
        </button>
      </div>

      {/* 🕓 Recently Added Queries */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Recently Added Queries</h2>

        {recentSixQueries.length === 0 ? (
          <p className="text-gray-500">No recent queries found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSixQueries.map((query) => (
              <div key={query.id}>
                <DataCard data={query} />

                <div className="flex justify-between gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/query/${query.id}`)}
                    className="btn btn-sm btn-info"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate(`/query/update/${query.id}`)}
                    className="btn btn-sm btn-warning"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(query.id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🔁 Optional: Full List Section (not included) */}
    </div>
  );
}
