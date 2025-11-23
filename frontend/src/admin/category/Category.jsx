import React, { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const categoryPerPage = 1;
  const mounted = useRef(false);
  const navigate = useNavigate();
  const loadCategories = async () => {
    try {
      const res = await api.get("/admin/category/");
      setCategories(res.data);
    } catch (error) {
      toast.error("failed to load categories");
      console.log(error);
    }
  };
  const deleteCategories = async (id) => {
    try {
      const res = await api.delete(`/admin/category/${id}/`);
      toast.success("successfully deleted category ");
      //   navigate('/admin/categories')
      loadCategories();
    } catch (error) {
      toast.error("failed to delete category");
      console.log(error);
    }
  };
  const confirmDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span className="text-lg font-medium">Delete Category?</span>
          <span className="text-sm text-gray-700">
            This action cannot be undone.
          </span>

          <div className="flex gap-3 mt-2">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => {
                toast.dismiss(t.id);
                deleteCategories(id);
              }}
            >
              Yes, Delete
            </button>

            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 3000,
      }
    );
  };

  useEffect(() => {
    if (!mounted.current) {
      loadCategories();
      mounted.current = true;
    }
  }, []);
  const indexOfLast = currentPage * categoryPerPage;
  const indexOfFirst = indexOfLast - categoryPerPage;
  const currentCategory = categories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(categories.length / categoryPerPage);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 sm:flex-row  gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Categories
        </h2>

        <Link
          to="/admin/category/create"
          className="bg-emerald-600 text-white px-3 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg shadow hover:bg-emerald-700 transition whitespace-nowrap"
        >
          + Add
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-4 text-center">S.N.</th>
                <th className="p-4 text-center">name</th>
                <th className="p-4 text-center">description</th>
                {/* <th className="p-4 text-center">Status</th> */}
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {currentCategory.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-700 text-lg"
                  >
                    No Category Found
                  </td>
                </tr>
              ) : (
                currentCategory.map((d, index) => (
                  <tr
                    key={d.id}
                    className={`border-t border-gray-200 hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 text-center font-medium">{index + 1}</td>

                    <td className="p-4 text-center font-medium">
                      {d.name || "—"}
                    </td>
                    <td className="p-4 text-center font-medium">
                      {d.description || "—"}
                    </td>
                    {/* <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        d.active ? "bg-emerald-600" : "bg-gray-500"
                      }`}
                    >
                      {d.active ? "Active" : "Inactive"}
                    </span>
                  </td> */}

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/admin/category/edit/${d.id}`}
                          className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => confirmDelete(d.id)}
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
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages)].map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => setCurrentPage(pageIndex + 1)}
              className={`px-4 py-2 rounded-lg border transition ${
                currentPage === pageIndex + 1
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
