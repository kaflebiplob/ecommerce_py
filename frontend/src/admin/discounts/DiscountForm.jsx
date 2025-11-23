import React, { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const DiscountForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_id: "",
    discount_percent: "",
    valid_from: "",
    valid_to: "",
    active: true,
  });

  const loadProducts = async () => {
    try {
      const res = await api.get("admin/products/");
      setProducts(res.data);
    } catch (err) {
      toast.error("failed to load products", err);
    }
  };

  const loadDiscount = async () => {
    try {
      const res = await api.get(`/admin/discounts/${id}/`);
      setFormData({
        product_id: res.data.product.id,
        discount_percent: res.data.discount_percent,
        valid_from: res.data.valid_from,
        valid_to: res.data.valid_to,
        active: res.data.active,
      });
    } catch (err) {
      toast.error("failed to load discounts", err);
      console.error(err);
    }
  };

  useEffect(() => {
    loadProducts();
    if (id) {
      loadDiscount();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sending form data:", formData);

    try {
      if (id) {
        await api.put(`/admin/discounts/${id}/`, formData);
        toast.success("discount updated successfully");
      } else {
        await api.post("/admin/discounts/", formData);
        toast.success("discount created successfully!!");
      }
      navigate("/admin/discounts");
    } catch (err) {
      const message = err.response?.data?.error || "failed to process discount";
      toast.error(message);
      console.error("failed", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sm:py-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white sm:rounded-lg sm:shadow-sm p-6 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {id ? "Edit Discount" : "Create Discount"}
          </h2>
        </div>

        <div className="bg-white sm:rounded-lg sm:shadow-sm p-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product{!id && <span className="text-red-600">*</span>}
                </label>
                <select
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                >
                  <option value="">Select Product</option>
                  {product.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount(%){!id && <span className="text-red-600">*</span>}
                </label>
                <input
                  type="number"
                  name="discount_percent"
                  value={formData.discount_percent}
                  onChange={handleChange}
                  placeholder="e.g. 20"
                  min="0"
                  max="100"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid From{!id && <span className="text-red-600">*</span>}
                </label>
                <input
                  type="date"
                  name="valid_from"
                  value={formData.valid_from}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid To{!id && <span className="text-red-600">*</span>}
                </label>
                <input
                  type="date"
                  name="valid_to"
                  value={formData.valid_to}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <span className="text-sm font-medium text-gray-700">
                  Status:
                </span>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div
                  className="relative w-11 h-6 bg-gray-300 rounded-full peer 
                peer-checked:bg-emerald-600 peer-focus:ring-2 peer-focus:ring-emerald-500 
                transition-colors"
                >
                  <div
                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
                  shadow-sm transition-transform peer-checked:translate-x-5"
                  ></div>
                </div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-emerald-600 text-white py-2.5 px-6 rounded-lg 
                font-medium hover:bg-emerald-700 transition-colors shadow-sm"
              >
                {id ? "Update" : "Create"}
              </button>

              <Link
                to="/admin/discounts"
                className="flex-1 bg-red-500 text-white py-2.5 px-6 rounded-lg 
                font-medium hover:bg-red-600 transition-colors shadow-sm text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountForm;
