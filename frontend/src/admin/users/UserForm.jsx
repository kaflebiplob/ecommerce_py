import React, { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    is_superuser: false,
    is_active: true,
    is_staff: true,
  });
//   const {id}
  const navigate = useNavigate();
  //   const loadUsers = async () => {
  //     const res = await api.get("/admin/users/");
  //     setFormData(res.data);
  //   };
  //   useEffect(() => {
  //     loadUsers();
  //   },[]);
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "username") {
      value = value.replace(/\s+/g, "");
    }

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("formdata:",formData);
    try {
      await api.post("/admin/users/", formData);
      toast.success("user added succesfully");
      navigate("/admin/users");
    } catch (error) {
      toast.error("failed to add user");
      console.log(error);
    }
  };
  return (
    <div className="mx-auto p-5 bg-white  rounded">
      <h2 className="text-2xl font-semibold mb-4">
        {/* {id ? "Edit Discount" : "Create Discount"} */}
        Create User
      </h2>
      <form
        className="space-y-3 bg-white p-5 rounded-lg"
        action=""
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="" className="font-medium text-gray-700">
              Username
            </label>
            <input
              type="username"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username (letters, numbers, underscore only)"
            />
            <span className="text-gray-500">
              letters, numbers, underscore only no gaps
            </span>
          </div>
          <div>
            <label htmlFor="" className="font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="" className="font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm  focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center cursor-pointer mt-1">
              is_superuser:
              <input
                type="checkbox"
                name="is_superuser"
                checked={formData.is_superuser}
                onChange={(e) =>
                  setFormData({ ...formData, is_superuser: e.target.checked })
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
          </div>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center cursor-pointer mt-1">
              is_staff:
              <input
                type="checkbox"
                name="is_staff"
                checked={formData.is_staff}
                onChange={(e) =>
                  setFormData({ ...formData, is_staff: e.target.checked })
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
          </div>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center cursor-pointer mt-1">
              Status:
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
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
          </div>
        </div>
        <div className="flex items-center gap-4 ">
          <button
            type="submit"
            className="bg-emerald-600 text-white py-2 px-4 cursor-pointer
         font-medium text-md rounded-lg hover:bg-emerald-700 transition"
          >
            {/* {id ? "Update" : "Create"} */} Create
          </button>
          <div className="bg-red-500 px-4 text-white hover:bg-red-700 transition text-md font-medium py-2 rounded-lg">
            <Link to="/admin/users" className="cursor-pointer">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
