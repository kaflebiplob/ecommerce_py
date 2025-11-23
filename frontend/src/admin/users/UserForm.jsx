import React, { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    is_superuser: false,
    is_active: true,
    is_staff: true,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const loadUsers = async () => {
    const res = await api.get(`/admin/users/${id}/`);
    setFormData({
      username: res.data.username,
      email: res.data.email,
      password: "",
      is_superuser: res.data.is_superuser,
      is_staff: res.data.is_staff,
      is_active: res.data.is_active,
    });
  };

  useEffect(() => {
    if (id) {
      loadUsers();
    }
  }, [id]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "username") {
      value = value.replace(/\s+/g, "");
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/admin/users/${id}/`, formData);
        toast.success("user updated successfully");
      } else {
        await api.post("/admin/users/", formData);
        toast.success("user added successfully");
      }
      navigate("/admin/users");
    } catch (error) {
      toast.error("failed to add user");
      console.log(error);
    }
  };

  return (
    <div className="sm:py-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white sm:rounded-lg sm:shadow-sm p-6 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {id ? "Edit User" : "Create User"}
          </h2>
        </div>

        <div className="bg-white sm:rounded-lg sm:shadow-sm p-6">
          <div className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username (letters, numbers, underscore only)"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                  required
                />
                <span className="text-xs text-gray-500 mt-1 block">
                  Letters, numbers, underscore only - no spaces
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={id ? "Leave blank to keep current" : "Enter password"}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">Superuser:</span>
                  <input
                    type="checkbox"
                    name="is_superuser"
                    checked={formData.is_superuser}
                    onChange={(e) =>
                      setFormData({ ...formData, is_superuser: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-300 rounded-full peer 
                  peer-checked:bg-emerald-600 peer-focus:ring-2 peer-focus:ring-emerald-500 
                  transition-colors">
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
                    shadow-sm transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">Staff:</span>
                  <input
                    type="checkbox"
                    name="is_staff"
                    checked={formData.is_staff}
                    onChange={(e) =>
                      setFormData({ ...formData, is_staff: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-300 rounded-full peer 
                  peer-checked:bg-emerald-600 peer-focus:ring-2 peer-focus:ring-emerald-500 
                  transition-colors">
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
                    shadow-sm transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">Active:</span>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-300 rounded-full peer 
                  peer-checked:bg-emerald-600 peer-focus:ring-2 peer-focus:ring-emerald-500 
                  transition-colors">
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
                    shadow-sm transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
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
                to="/admin/users"
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

export default UserForm;