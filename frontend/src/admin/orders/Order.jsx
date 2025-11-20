import React, { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Order = () => {
  const [orders, setorders] = useState([]);
  const mounted = useRef(false);
  const loadOrders = async () => {
    try {
      const res = await api.get("/admin/orders/");
      setorders(res.data);
    } catch (error) {
      console.log(error);
      toast.error("failed to load orders");
    }
  };
  const deleteOrder = async (id) => {
    toast(
      (t) => (
        <div >
          <p>Are you sure you want to delete this order?</p>
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await api.delete(`/admin/orders/${id}/`);
                  toast.success("order deleted successfully");
                  loadOrders();
                } catch (error) {
                  console.log(error);
                  toast.error("failed to delete order");
                }
              }}
              style={{ marginRight: "10px", padding: "5px 10px" }} className="bg-red-500 text-white"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{ padding: "5px 10px" }}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };
  const updateDeliveryStatus = async (id, newStatus) => {
    toast(
      (t) => (
        <div>
          <p>Change delivery status to {newStatus}?</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await api.patch(`/admin/orders/${id}/`, {
                    status: newStatus,
                  });
                  toast.success("delivery status updated successfully");
                  loadOrders();
                } catch (error) {
                  console.log(error);
                  toast.error("failed to update delivery status");
                }
              }}
              className="px-4 py-2 bg-red-600 rounded-md font-medium"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 rounded-md font-medium"
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };
  useEffect(() => {
    if(!mounted.current){
      loadOrders();
      mounted.current=true;
    }
  }, []);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Orders</h2>

        <Link
          to="/admin/order/create"
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
        >
          + Add Order
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-4 text-center">S.N.</th>
              <th className="p-4 text-center">Customer</th>
              <th className="p-4 text-center">Total Amount</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Created At</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-700 text-lg"
                >
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`border-t border-gray-200 hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-4 text-center font-medium">{index + 1}</td>

                  <td className="p-4 text-center font-medium">
                    {order.user || "—"}
                  </td>

                  <td className="p-4 text-center">Rs. {order.total_amount}</td>

                  <td className="p-4 text-center">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateDeliveryStatus(order.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-white text-sm cursor-pointer ${
                        order.status === "completed"
                          ? "bg-emerald-600"
                          : order.status === "processing"
                          ? "bg-blue-500"
                          : order.status === "canceled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>

                  <td className="p-4 text-center">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/order/edit/${order.id}`}
                        className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteOrder(order.id)}
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
  );
};

export default Order;