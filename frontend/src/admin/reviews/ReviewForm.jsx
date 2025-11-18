import React, { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    user: "",
    rating: "",
    comment: "",
  });
  const navigate = useNavigate();
  const loadProducts = async () => {
    try {
      const res = await api.get("/admin/products/");
      setProduct(res.data);
    } catch (err) {
      toast.error("Failed fo fetch the reviews", err);
      console.log("Failed to fetch reviews", err);
    }
  };
  const loadUsers = async () => {
    const res = await api.get("/admin/users/");
    setUser(res.data);
  };
  useEffect(() => {
    loadProducts();
    loadUsers();
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/reviews/", formData);
      toast.success("Review Created Succesfully");
      navigate('/admin/reviews');
    } catch (error) {
      toast.error("Failed to create te review");
      console.error("Failed to create review", error);
    }
  };
  return (
    <div className="mx-auto p-5 bg-white rounded">
      <h2 className="text-2xl font-semibold mb-4">Create Review</h2>
      <form
        action=""
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-5 rounded-lg"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="" className="font-medium text-gray-700">
              Product
            </label>
            <select
              name="product"
              id=""
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Product</option>
              {product.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="" className="text-gray-700 font-medium">
              User
            </label>
            <select
              name="user"
              onChange={handleChange}
              id=""
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 "
            >
              <option value="">Select User</option>
              {user.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.username}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">Rating</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="rating"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="" className="text-gray-700 font-medium">
            Comment
          </label>
          <textarea
            name="comment"
            id=""
            onChange={handleChange}
            rows={5}
            cols={5}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="bg-emerald-500 text-white hover:bg-emerald-700 transition text-md font-medium py-2 px-4 rounded-lg"
          >
            Submit
          </button>
          <div className="bg-red-500 text-white px-4  hover:bg-red-700 transition text-md font-medium py-2 rounded-lg">
            <Link to="/admin/reviews">Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
