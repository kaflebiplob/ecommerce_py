import React, { useEffect, useState } from "react";
import api from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
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
        const res = await api.post("/admin/category/", formData);
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
    <div className="mx-auto p-5 bg-white  rounded">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Edit Category" : "Create Category"}
        {/* Create */}
      </h2>
      <form
        className="space-y-3 bg-white p-5 rounded-lg"
        action=""
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="" className="font-medium text-gray-700">
              name
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
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

          {/* <div className="flex items-center gap-4">
            <label className="inline-flex items-center cursor-pointer mt-1">
              Status:
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
                className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500 
       rounded-full peer peer-checked:bg-emerald-600 relative transition"
              >
                <div
                  className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
        transition peer-checked:translate-x-5"
                ></div>
              </div>
            </label>
          </div> */}
        </div>
        <div className="flex items-center gap-4 ">
          <button
            type="submit"
            className="bg-emerald-600 text-white py-2 px-4 cursor-pointer
         font-medium text-md rounded-lg hover:bg-emerald-700 transition"
          >
            {id ? "Update" : "Create"}
            {/* Create */}
          </button>
          <div className="bg-red-500 px-4 text-white hover:bg-red-700 transition text-md font-medium py-2 rounded-lg">
            <Link to="/admin/categories" className="cursor-pointer">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
