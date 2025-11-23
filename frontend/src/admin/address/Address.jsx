import React, { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

const Address = () => {
  const [address, setAddress] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const addressesPerPage = 10;
  const mounted = useRef(false);

  const loadAddress = async () => {
    try {
      const res = await api.get("/admin/address/");
      setAddress(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load address");
    }
  };

  const deleteAddress = async (id) => {
    try {
      await api.delete(`/admin/address/${id}/`);
      toast.success("Successfully deleted address");
      loadAddress();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete");
    }
  };

  const confirmDelete = (id) => {
    toast(
      (t) => (
        <div className="p-3">
          <p className="font-medium">
            Are you sure you want to delete this address?
          </p>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                deleteAddress(id);
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
      loadAddress();
      mounted.current = true;
    }
  }, []);

  // ---------- PAGINATION ----------
  const indexOfLast = currentPage * addressesPerPage;
  const indexOfFirst = indexOfLast - addressesPerPage;
  const currentAddress = address.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(address.length / addressesPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Address</h2>
      </div>

      <div className="rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-4 text-center">S.N.</th>
                <th className="p-4 text-center">Username</th>
                <th className="p-4 text-center">Address</th>
                <th className="p-4 text-center">City</th>
                <th className="p-4 text-center">Country</th>
                <th className="p-4 text-center">Zipcode</th>
                <th className="p-4 text-center">Phone</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {currentAddress.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-t border-gray-200 hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-4 text-center font-medium">{index + 1}</td>

                  <td className="p-4 text-center font-medium">
                    {item.full_name || "—"}
                  </td>

                  <td className="p-4 text-center">
                    {item.address_line || "—"}
                  </td>
                  <td className="p-4 text-center">{item.city || "—"}</td>
                  <td className="p-4 text-center">{item.country || "—"}</td>
                  <td className="p-4 text-center">{item.zip_code || "—"}</td>
                  <td className="p-4 text-center">{item.phone || "—"}</td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => confirmDelete(item.id)}
                      className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {address.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="p-6 text-center text-gray-700 text-lg"
                  >
                    No address found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------- PAGINATION BUTTONS ---------- */}
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

export default Address;
