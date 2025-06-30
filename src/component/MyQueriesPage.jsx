import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyQueriesPage({ queries = [], userId, deleteQuery }) {
  const navigate = useNavigate();

  const [updateQueryId, setUpdateQueryId] = useState(null);

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

  // Filter queries by user and sort descending by timestamp
  const sortedQueries = queries
    .filter((q) => q.userId === userId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Get the 6 most recent queries
  const recentSixQueries = sortedQueries.slice(0, 6);

  return (
    <div className="container mx-auto p-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-lg text-white flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Queries</h1>
        <button
          onClick={() => navigate("/add-query")}
          className="btn btn-primary"
          aria-label="Add new query"
        >
          Add Queries
        </button>
      </div>

      {/* Recently Added 6 Queries Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Recently Added Queries</h2>
        {recentSixQueries.length === 0 ? (
          <p className="text-gray-500">No recent queries found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSixQueries.map((query) => (
              <div
                key={query.id}
                className="card bg-base-200 shadow-md rounded-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">{query.title}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">{query.content}</p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(query.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="mt-4 flex justify-between gap-2">
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

      {/* Full queries list */}
      {sortedQueries.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl mb-6">
            No queries found. Please add your first query!
          </p>
          <Link to="/add-query">
            <button className="btn btn-secondary">Add Query</button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedQueries.map((query) => (
            <div
              key={query.id}
              className="card bg-base-200 shadow-md rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{query.title}</h2>
                <p className="text-gray-700 mb-4 line-clamp-3">{query.content}</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(query.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="mt-4 flex justify-between gap-2">
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

      {/* Optional update modal */}
      {updateQueryId && (
        <UpdateQueryModal
          queryId={updateQueryId}
          onClose={() => setUpdateQueryId(null)}
          onUpdate={() => setUpdateQueryId(null)}
        />
      )}
    </div>
  );
}
