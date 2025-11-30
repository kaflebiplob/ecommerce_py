import React from "react";
import { Link } from "react-router-dom";
import { FiShield, FiHome } from "react-icons/fi";

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <FiShield className="text-red-600 text-4xl" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl sm:text-8xl font-bold text-gray-800 mb-4">
          403
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-3">
          Access Forbidden
        </h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg 
          font-medium hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <FiHome className="text-lg" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
