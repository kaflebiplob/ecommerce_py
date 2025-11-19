import React, { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const mounted = useRef(false);
  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users/");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
      toast.error("failed to load users");
    }
  };

  const deleteUsers = async (id) => {
    try {
      await api.delete(`/admin/users/${id}/`);
      toast.success("Succesfully deleted user");
      loadUsers();
    } catch (error) {
      console.log(error);
      toast.error("failed to delete user");
    }
  };
  const confirmDelete = (id) => {
    toast(
      (t) => (
        <div className="p-3">
          <p className="font-medium">
            Are you sure you want to delete this user?
          </p>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                deleteUsers(id);
              }}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Yes, Delete
            </button>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );
  };

  useEffect(() => {
    if (!mounted.current) {
      loadUsers();
      mounted.current = true;
    }
  }, []);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Users</h2>

        <Link
          to="/admin/discount/create"
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
        >
          + Add User
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-4 text-center">S.N.</th>
              <th className="p-4 text-center">Userbane</th>
              <th className="p-4 text-center">email</th>
              <th className="p-4 text-center">is_superuser</th>
              <th className="p-4 text-center">is_staff</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-t border-gray-200 hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-4 text-center font-medium">{index + 1}</td>

                <td className="p-4 text-center font-medium">
                  {user.username || "—"}
                </td>

                <td className="p-4 text-center">{user.email}</td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      user.is_superuser ? "bg-emerald-600" : "bg-gray-500"
                    }`}
                  >
                    {user.is_superuser ? "Yes" : "No"}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      user.is_staff ? "bg-emerald-600" : "bg-gray-500"
                    }`}
                  >
                    {user.is_staff ? "Yes" : "No"}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      user.active ? "bg-emerald-600" : "bg-gray-500"
                    }`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/user/edit/${user.id}`}
                      className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => confirmDelete(user.id)}
                      className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
