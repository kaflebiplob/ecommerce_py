import React, { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const CategoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`admin/category/${id}/`, formData);
        toast.success("successfully updated category");
      } else {
        await api.post("/admin/category/", formData);
        toast.success("successfully created category");
      }
      navigate("/admin/categories/");
    } catch (error) {
      toast.error("failed to create category");
      console.log(error);
    }
  };

  const loadCategory = async () => {
    try {
      const res = await api.get(`/admin/category/${id}/`);
      setFormData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      loadCategory();
    }
  }, [id]);

  return (
    <div className="sm:py-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white sm:rounded-lg sm:shadow-sm p-6 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {id ? "Edit Category" : "Create Category"}
          </h2>
        </div>

        <div className="bg-white sm:rounded-lg sm:shadow-sm p-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
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
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                  required
                ></textarea>
              </div>
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
                to="/admin/categories"
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

export default CategoryForm;
