import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: null,
    is_featured: "",
    status: "",
  });

  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
    if (isEdit) loadProduct();
  }, [id]);

  const loadCategories = async () => {
    try {
      const res = await api.get("/admin/category/");
      setCategories(res.data);
    } catch (error) {
      toast.error("failed to load categories");
    }
  };

  const loadProduct = async () => {
    try {
      const res = await api.get(`/admin/products/${id}/`);
      setFormData({
        name: res.data.name,
        price: res.data.price,
        stock: res.data.stock,
        category: res.data.category,
        description: res.data.description,
        image: null,
        is_featured: res.data.is_featured,
        status: res.data.status,
      });
      setPreview(res.data.image);
    } catch (error) {
      toast.error("failed to load product");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("price", formData.price);
      fd.append("stock", formData.stock);
      fd.append("category", formData.category);
      fd.append("description", formData.description);
      fd.append("is_featured", formData.is_featured);
      fd.append("status", formData.status);

      if (formData.image) fd.append("image", formData.image);

      if (isEdit) {
        await api.put(`/admin/products/${id}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("product updated successfully");
      } else {
        await api.post(`/admin/products/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("product created successfully");
      }

      navigate("/admin/products");
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="sm:py-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white sm:rounded-lg sm:shadow-sm p-6 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {isEdit ? "Edit Product" : "Create Product"}
          </h2>
        </div>

        <div className="bg-white sm:rounded-lg sm:shadow-sm p-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name{!id && <span className="text-red-600">*</span>}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price{!id && <span className="text-red-600">*</span>}
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock{!id && <span className="text-red-600">*</span>}
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category{!id && <span className="text-red-600">*</span>}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">
                    Featured:
                  </span>
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_featured: e.target.checked,
                      })
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
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">
                    Status:
                  </span>
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.checked })
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description{!id && <span className="text-red-600">*</span>}
              </label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 h-40 w-40 object-cover border border-gray-300 rounded-lg"
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-emerald-600 text-white py-2.5 px-6 rounded-lg 
                font-medium hover:bg-emerald-700 transition-colors shadow-sm"
              >
                {isEdit ? "Update" : "Create"}
              </button>

              <Link
                to="/admin/products"
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

export default ProductForm;
