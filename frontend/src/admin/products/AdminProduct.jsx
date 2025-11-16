import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await api.get("/admin/products/");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch product", err);
    }
  };

  const deleteProducts = async (id) => {
    if (!confirm("Delete product?")) return;
    try {
      await api.delete(`/admin/products/${id}/`);
      loadProducts();
    } catch (err) {
      console.error("Delete Failed", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Products</h2>

        <Link
          to="/admin/products/create"
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden">
        <table className="w-full border-collapse table ">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-4 text-center">ID</th>
              <th className="p-4 text-center">Title</th>
              <th className="p-4 text-center">Price</th>
              <th className="p-4 text-center">Stock</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {products.map((p, index) => (
              <tr
                key={p.id}
                className={`border-t border-gray-200 hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-4 font-medium text-center">{p.id}</td>
                <td className="p-4 text-center">{p.name}</td>
                <td className="p-4 text-center">${p.price}</td>
                <td className="p-4 text-center">{p.stock}</td>

                <td className="p-4  flex justify-center gap-3">
                  <Link
                    to={`/admin/products/edit/${p.id}`}
                    className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow transition items-center"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProducts(p.id)}
                    className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProduct;
