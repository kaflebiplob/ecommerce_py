import React, { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const mounted = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  const loadReviews = async () => {
    try {
      const res = await api.get("/admin/reviews/");
      setReviews(res.data);
    } catch (error) {
      toast.error("failed to load reviews");
      console.log(error);
    }
  };

  const deleteReview = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this review?</p>
          <div className="flex gap-2 justify-end">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await api.delete(`/admin/reviews/${id}/`);
                  toast.success("Successfully deleted review");
                  loadReviews();
                } catch (err) {
                  toast.error("Failed to delete the review");
                  console.log(err);
                }
              }}
            >
              Yes
            </button>

            <button
              className="px-3 py-1 bg-gray-300 text-black rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: 3000,
      }
    );
  };

  useEffect(() => {
    if (!mounted.current) {
      loadReviews();
      mounted.current = true;
    }
  }, []);
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReview = reviews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Reviews
        </h2>
        <Link
          to="/admin/review/create"
          className="bg-emerald-600 text-white px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg shadow hover:bg-emerald-700 transition whitespace-nowrap"
        >
          + Add
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
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
              {currentReview.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-700 text-lg"
                  >
                    No Reviews Found
                  </td>
                </tr>
              ) : (
                currentReview.map((d, index) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages)].map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => setCurrentPage(pageIndex + 1)}
              className={`px-4 py-2 rounded-lg border transition ${
                currentPage === pageIndex + 1
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
