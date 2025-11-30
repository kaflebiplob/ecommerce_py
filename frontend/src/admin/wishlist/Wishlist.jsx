import React, { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const wishlistPerPage = 5;

  const mounted = useRef(false);

  const loadWishlist = async () => {
    try {
      const res = await api.get("/admin/wishlist/");
      setWishlist(res.data);
    } catch (error) {
      toast.error("Failed to load wishlist");
      console.log(error);
    }
  };

  const deleteWishlist = async (id) => {
    toast(
      (t) => (
        <div>
          <p className="font-semibold">Delete this wishlist?</p>
          <div className="flex gap-3 mt-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await api.delete(`/admin/wishlist/${id}/`);
                  toast.success("Wishlist deleted");
                  loadWishlist();
                } catch (error) {
                  toast.error("Failed to delete");
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: 4000,
      }
    );
  };

  useEffect(() => {
    if (!mounted.current) {
      loadWishlist();
      mounted.current = true;
    }
  });

  const indexOfLast = currentPage * wishlistPerPage;
  const indexOfFirst = indexOfLast - wishlistPerPage;
  const currentWishlist = wishlist.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(wishlist.length / wishlistPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Wishlists
        </h2>
      </div>

      <div className="rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-4 text-center">S.N.</th>
                <th className="p-4 text-center">Product</th>
                <th className="p-4 text-center">User</th>
                <th className="p-4 text-center">Added At</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {wishlist.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-700 text-lg"
                  >
                    No Wishlist Found
                  </td>
                </tr>
              ) : (
                currentWishlist.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-t border-gray-200 hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 text-center font-medium">
                      {indexOfFirst + index + 1}
                    </td>

                    <td className="p-4 text-center font-medium">
                      {item.product_name || "—"}
                    </td>

                    <td className="p-4 text-center">{item.username || "—"}</td>

                    <td className="p-4 text-center">
                      {item.added_at?.split("T")[0]}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => deleteWishlist(item.id)}
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

      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-emerald-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
