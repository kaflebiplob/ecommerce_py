import React, { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const loadReviews = async () => {
    const res = await api.get("/admin/reviews/");
    setReviews(res.data);
  };
  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      toast("Delete cancelled");
      return;
    }
    try {
      await api.delete(`/admin/reviews/${id}/`);
      toast.success("Succesfully Deleted Review");
      loadReviews();
    } catch (err) {
      toast.error("failed to delete the review");
      console.log("failed to delete the review", err);
    }
  };
  useEffect(() => {
    loadReviews();
  }, []);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Reviews</h2>

        <Link
          to="/admin/review/create"
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
        >
          + Add Review
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-4 text-center">S.N.</th>
              <th className="p-4 text-center">Product</th>
              <th className="p-4 text-center">User</th>
              <th className="p-4 text-center">Rating</th>
              <th className="p-4 text-center">Comment</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {reviews.map((d, index) => (
              <tr
                key={d.id}
                className={`border-t border-gray-200 hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-4 text-center font-medium">{index + 1}</td>

                <td className="p-4 text-center font-medium">
                  {d.product?.name || "—"}
                </td>

                <td className="p-4 text-center">{d.user || "—"}</td>
                <td className="p-4 text-center">{d.rating}</td>
                <td className="p-4 text-center">{d.comment}</td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/review/edit/${d.id}`}
                      className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteReview(d.id)}
                      className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Review;
