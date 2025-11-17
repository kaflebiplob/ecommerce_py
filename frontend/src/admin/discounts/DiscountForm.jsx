import React, { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const DiscountForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    discount_percent: "",
    valid_from: "",
    valid_to: "",
    active: true,
  });
  const loadProducts = async () => {
    try {
      const res = await api.get("admin/products/");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products", err);
    }
  };

  const loadDiscount = async () => {
    try {
      const res = await api.post(`admin/discounts/${id}/`);
      setFormData(res.data);
    } catch (err) {
      toast.error("faled to load discunts", err);
      console.error(err);
    }
  };
  useEffect(() => {
    loadProducts();
    if (id) {
      loadDiscount();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.post(`admin/discounts/${id}`, formData);
        toast.success("Discount Updated Succesfully");
      } else {
        await api.post("admin/discounts/", formData);
        toast.success("Discount Created Succesfully!!");
      }
      navigate("/admin/discounts");

      //   setFormData({
      //     product: "",
      //     discount_percent: "",
      //     valid_from: "",
      //     valid_to: "",
      //     active: true,
      //   });
    } catch (err) {
      toast.error("failed to create the discount", err);
      console.error("failed", err);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="nax-w-xl mx-auto p-5 bg-white  rounded">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Edit Discount" : "Create Discount"}
      </h2>
      <form
        className="space-y-3 bg-white p-5 rounded-lg"
        action=""
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="" className="font-medium text-gray-700">
              Product
            </label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              id=""
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
            <label htmlFor="" className="font-medium text-gray-700">
              Discount (%)
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="discount_percent"
              value={formData.discount_percent}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="" className="font-medium text-gray-700">
              Valid From
            </label>
            <input
              type="date"
              value={formData.valid_from}
              name="valid_from"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm  focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="" className="font-medium text-gray-700">
              Valid To
            </label>
            <input
              type="date"
              value={formData.valid_to}
              name="valid_to"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full text-sm  focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="" className="font-medium text-gray-700">
              Active:
            </label>
            <input
              type="checkbox"
              checked={formData.active}
              name="active"
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
              className="mt-1 p-2 rounded-lg w-5 h-4"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 ">
          <button
            type="submit"
            className="bg-emerald-600 text-white py-2 px-4 cursor-pointer
         font-medium text-md rounded-lg hover:bg-emerald-700 transition"
          >
            {id ? "Update" : "Create"}
          </button>
          <div className="bg-red-500 px-4 text-white hover:bg-red-700 transition text-md font-medium py-2 rounded-lg">
            <Link to="/admin/discounts" className="cursor-pointer">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DiscountForm;
