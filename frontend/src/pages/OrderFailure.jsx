import React from "react";
import { Link } from "react-router-dom";

const OrderFailure = () => {
  return (
    <div className="flex  flex-col items-center justify-center min-h-screen bg-gray-50 ">
      <h1 className=" text-3xl font-semibold text-red-600 mb-4">
        Order Failed.
      </h1>
      <p className="text-gray-600 mb-6">Thank you for your patience.</p>
      <Link
        to="/"
        className="bg-emerald-500 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default OrderFailure;
