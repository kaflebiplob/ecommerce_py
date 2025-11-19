import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";

const Discount = () => {
  const [discount, setDiscount] = useState([]);
  const mounted = useRef(false);

  const loadDiscounts = async () => {
    try {
      const res = await api.get("/admin/discounts/");
      setDiscount(res.data);
    } catch (err) {
      toast.error("Failed to load discounts");
    }
  };

  const deleteDiscount = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="font-medium text-gray-800">
          Are you sure you want to delete this discount?
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
    ));
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/discounts/${id}/`);
      toast.success("Discount deleted successfully");
      loadDiscounts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      loadDiscounts();
      mounted.current = true;
    }
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Discounts</h2>

        <Link
          to="/admin/discount/create"
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
        >
          + Add Discount
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-4 text-center">S.N.</th>
              <th className="p-4 text-center">Product</th>
              <th className="p-4 text-center">Discount (%)</th>
              <th className="p-4 text-center">Valid From</th>
              <th className="p-4 text-center">Valid To</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {discount.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-700 text-lg"
                >
                  No Discounts Found
                </td>
              </tr>
            ) : (
              discount.map((d, index) => (
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

                  <td className="p-4 text-center">{d.discount_percent}%</td>
                  <td className="p-4 text-center">{d.valid_from}</td>
                  <td className="p-4 text-center">{d.valid_to}</td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        d.active ? "bg-emerald-600" : "bg-gray-500"
                      }`}
                    >
                      {d.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/discount/edit/${d.id}`}
                        className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteDiscount(d.id)}
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
  );
};

export default Discount;
