import React, { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const ReviewForm = () => {
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    product_id: "",
    user_id: "",
    rating: "",
    comment: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const loadProducts = async () => {
    try {
      const res = await api.get("/admin/products/");
      setProduct(res.data);
    } catch (err) {
      toast.error("failed fo fetch the reviews", err);
      console.log("failed to fetch reviews", err);
    }
  };
  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users/");
      setUser(res.data);
    } catch (error) {
      console.error("failed to load user", error);
      toast.error("failed to load user");
    }
  };

  const loadReview = async () => {
    try {
      const res = await api.get(`/admin/reviews/${id}/`);
      setFormData({
        product_id: res.data.product?.id || res.data.product,
        user_id: res.data.user?.id || res.data.user_id,
        rating: res.data.rating,
        comment: res.data.comment,
      });
    } catch (error) {
      console.error("failed to load review", error);
      toast.error("failed!!");
    }
  };
  useEffect(() => {
    loadProducts();
    loadUsers();
    if (id) {
      loadReview();
    }
  }, [id]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/admin/reviews/${id}/`, formData);
        toast.success("succesfully updated review");
      } else {
        await api.post("/admin/reviews/", formData);
        toast.success("review created succesfully");
      }
      navigate("/admin/reviews");
    } catch (error) {
      toast.error("failed to process review");
      console.error("failed to process review", error);
    }
  };
  return (
    <div className="mx-auto p-5 bg-white rounded">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Edit Review" : "Create review"}
      </h2>
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
              name="product_id"
              id=""
              onChange={handleChange}
              value={formData.product_id}
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
              name="user_id"
              onChange={handleChange}
              value={formData.user_id}
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
              value={formData.rating}
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
            value={formData.comment}
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
            {id ? "Update" : "Create"}
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
