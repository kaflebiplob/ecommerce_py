import React, { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const mounted = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const paymentPerPage = 10;

  const loadPayments = async () => {
    try {
      const res = await api.get("/admin/payments/");
      setPayments(res.data);
    } catch (error) {
      toast.error("Failed to load payments");
    }
  };

  const deletePayments = async (id) => {
    try {
      await api.delete(`/admin/payments/${id}/`);
      toast.success("Payment deleted successfully");
      loadPayments();
    } catch (error) {
      toast.error("Failed to delete payment");
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      loadPayments();
      mounted.current = true;
    }
  }, []);

  const indexOfLast = currentPage * paymentPerPage;
  const indexOfFirst = indexOfLast - paymentPerPage;
  const currentPayment = payments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(payments.length / paymentPerPage);

  // Status color logic
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500";
      case "COMPLETED":
        return "bg-green-600";
      case "FAILED":
        return "bg-red-500";
      case "REFUNDED":
        return "bg-blue-500";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Payments
        </h2>
      </div>

      <div className="rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-4 text-center">S.N.</th>
                <th className="p-4 text-center">User</th>
                <th className="p-4 text-center">Order</th>
                <th className="p-4 text-center">Amount</th>
                <th className="p-4 text-center">Payment Method</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Payment ID</th>
                <th className="p-4 text-center">Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {currentPayment.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center p-6 text-gray-700 text-lg"
                  >
                    No Payments Found
                  </td>
                </tr>
              ) : (
                currentPayment.map((d, index) => (
                  <tr
                    key={d.id}
                    className={`border-t border-gray-200 hover:bg-gray-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 text-center font-medium">
                      {indexOfFirst + index + 1}
                    </td>

                    <td className="p-4 text-center font-medium">
                      {d.user?.username || "—"}
                    </td>

                    <td className="p-4 text-center">#{d.order?.id}</td>

                    <td className="p-4 text-center">Rs. {d.amount}</td>

                    <td className="p-4 text-center">{d.payment_method}</td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg text-white text-sm ${getStatusColor(
                          d.status
                        )}`}
                      >
                        {d.status}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      {d.payment_id || "—"}
                    </td>

                    <td className="p-4 text-center">
                      {new Date(d.transaction_date).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => deletePayments(d.id)}
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

export default Payment;
