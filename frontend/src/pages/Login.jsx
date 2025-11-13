import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError(" Please fill out both fields.");
      return;
    }
    const result = await login(formData.username, formData.password);
    if (result.success) {
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } else {
      // setMessage(` ${result.message}`);
      setError(`Invalid username or password. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Login
        </h2>
        {message && (
          <p className="text-green-600 text-center mb-4 text-sm">{message}</p>
        )}
        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
              <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800  transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-500 hover:text-gray-800 font-medium transition"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
