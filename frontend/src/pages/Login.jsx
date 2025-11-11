import React, { useContext, useState } from "react";
import {AuthContext} from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.username, formData.password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid Credentials");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <form action="" onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="enter username"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            placeholder="enter password"
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Login</button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">Don't have a acccount? <Link to='/register' className="text-blue-600 hover:underline">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
