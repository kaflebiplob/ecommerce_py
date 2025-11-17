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
      toast.error("Failed to load categories");
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
      });
      setPreview(res.data.image);
    } catch (error) {
      toast.error("Failed to load Product");
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

      if (formData.image) fd.append("image", formData.image);

      if (isEdit) {
        await api.put(`/admin/products/${id}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product Updated Successfully");
      } else {
        await api.post(`/admin/products/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product Created Successfully");
      }

      navigate("/admin/products");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-6 font-[monospace] text-md">
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit Product" : "Create Product"}
      </h2>

      <form className="bg-white p-5 rounded-lg space-y-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Stock</label>
            <input
              type="number"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Category</label>
            <select
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="category"
              value={formData.category}
              onChange={handleChange}
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

          <div className="col-span-2">
            <label className="font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 h-40 w-40 object-cover border border-gray-300 rounded-lg"
              />
            )}
          </div>
        </div>

        <div>
          <label className="font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={5}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition text-md cursor-pointer font-medium"
          >
            {isEdit ? "Update" : "Create"}
          </button>
          <Link
            to="/admin/products"
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition text-md cursor-pointer font-medium"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;