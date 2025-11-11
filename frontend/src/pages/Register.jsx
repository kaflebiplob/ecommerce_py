import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.username, formData.email, formData.password);
      navigate("/login");
    } catch (err) {
      setError("Registration Failed", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Create an Account
        </h2>
        {error && <p className="text-red-600 text-center mb-3 ">{error}</p>}
        <form action="" onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="username"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full border bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
