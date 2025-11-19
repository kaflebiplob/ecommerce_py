import React, { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

const Support = () => {
  const [ticket, setTicket] = useState([]);
  const mounted = useRef(false);
  const loadTicket = async () => {
    try {
      const res = await api.get("/admin/support/");
      setTicket(res.data);
    } catch (error) {
      console.error("Failed to load all data");
      toast.error("failed to load support ticked");
    }
  };
  const updateStatus = async (id) => {
    try {
      const res = await api.patch(`/admin/support/${id}/update_status/`);
      toast.success("Status updated to " + res.data.status.replace("_", " "));
      loadTicket();
    } catch (error) {
      toast.error("Failed to update the status");
      console.log(error);
    }
  };
  const deleteTicket = async (id) => {
    try {
      await api.delete(`/admin/support/${id}/`);
      toast.success("Succesfully deleted ticket");
      loadTicket();
    } catch (error) {
      console.error("Failed to delete ticket", error);
      toast.error("failed to delete ticket");
    }
  };
  useEffect(() => {
    if (!mounted.current) {
      loadTicket();
      mounted.current = true;
    }
  }, []);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Tickets</h2>

        {/* <Link
          to="/admin/review/create"
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
        >
          + Add Ticket
        </Link> */}
      </div>

      <div className="rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-4 text-center">S.N.</th>
                <th className="p-4 text-center">User</th>
                <th className="p-4 text-center">Subject</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Created At</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {ticket.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-700 text-lg"
                  >
                    No Tickets Found
                  </td>
                </tr>
              ) : (
                ticket.map((d, index) => (
                  <tr
                    key={d.id}
                    className={`border-t border-gray-200 hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 text-center font-medium">{index + 1}</td>

                    <td className="p-4 text-center font-medium">
                      {d.user || "—"}
                    </td>

                    <td className="p-4 text-center">{d.subject}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-white text-sm
                      ${
                        d.status === "open"
                          ? "bg-green-600"
                          : d.status === "in_progress"
                          ? "bg-yellow-500"
                          : "bg-gray-600"
                      }`}
                      >
                        {d.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {new Date(d.created_at).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        {/* <Link
                      to={`/admin/review/edit/${d.id}`}
                      className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </Link> */}
                        <button
                          onClick={() => updateStatus(d.id)}
                          className="px-4 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                        >
                          Update Status
                        </button>

                        <button
                          onClick={() => deleteTicket(d.id)}
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
    </div>
  );
};

export default Support;
