import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
import { useSearch } from "../../context/SearchCOntext";

const AdminProduct = () => {
  const { globalSearch } = useSearch();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const mounted = useRef(false);

  const loadProducts = async () => {
    try {
      const res = await api.get("/admin/products/");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  const deleteProducts = async (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium text-gray-800">
            Are you sure you want to delete this product?
          </p>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleDelete(id);
              }}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Yes, Delete
            </button>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 3000 }
    );
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/products/${id}/`);
      toast.success("Product deleted successfully");
      loadProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      loadProducts();
      mounted.current = true;
    }
  }, []);

  const filteredProducts = globalSearch
    ? products.filter((p) =>
        JSON.stringify(p).toLowerCase().includes(globalSearch.toLowerCase())
      )
    : products;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Products
        </h2>

        <Link
          to="/admin/product/create"
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
                <th className="p-4 text-center">S.N</th>
                <th className="p-4 text-center">Image</th>
                <th className="p-4 text-center">Title</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {currentProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-700 text-lg"
                  >
                    No Products Found
                  </td>
                </tr>
              ) : (
                currentProducts.map((p, index) => (
                  <tr
                    key={p.id}
                    className={`border-t border-gray-200 hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 text-center font-medium">{index + 1}</td>

                    <td className="p-4 text-center flex justify-center">
                      <img
                        src={p.image}
                        alt="product"
                        className="w-14 h-14 object-cover rounded"
                      />
                    </td>

                    <td className="p-4 text-center">{p.name}</td>
                    <td className="p-4 text-center">Rs. {p.price}</td>
                    <td className="p-4 text-center">{p.stock}</td>

                    <td className="p-4">
                      <div className="flex justify-center items-center gap-3">
                        <Link
                          to={`/admin/product/edit/${p.id}`}
                          className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deleteProducts(p.id)}
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

export default AdminProduct;
