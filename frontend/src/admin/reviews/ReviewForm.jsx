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
      toast.error("failed to fetch the reviews", err);
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
        toast.success("successfully updated review");
      } else {
        await api.post("/admin/reviews/", formData);
        toast.success("review created successfully");
      }
      navigate("/admin/reviews");
    } catch (error) {
      toast.error("failed to process review");
      console.error("failed to process review", error);
    }
  };

  return (
    <div className="sm:py-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white sm:rounded-lg sm:shadow-sm p-6 mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {id ? "Edit Review" : "Create Review"}
          </h2>
        </div>

        <div className="bg-white sm:rounded-lg sm:shadow-sm p-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product{!id && <span className="text-red-600">*</span>}
                </label>
                <select
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User{!id && <span className="text-red-600">*</span>}
                </label>
                <select
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating{!id && <span className="text-red-600">*</span>}
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  placeholder="1-5"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment{!id && <span className="text-red-600">*</span>}
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition outline-none"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-emerald-600 text-white py-2.5 px-6 rounded-lg 
                font-medium hover:bg-emerald-700 transition-colors shadow-sm"
              >
                {id ? "Update" : "Create"}
              </button>

              <Link
                to="/admin/reviews"
                className="flex-1 bg-red-500 text-white py-2.5 px-6 rounded-lg 
                font-medium hover:bg-red-600 transition-colors shadow-sm text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
