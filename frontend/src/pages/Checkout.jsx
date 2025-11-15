import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  }, [cart]);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      items: cart,
      shipping,
      total,
    };
    console.log("Order Submitted", orderData);
    localStorage.removeItem("cart");
    navigate("/order-success");
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            Checkout
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Shipping Information
              </h3>
              <form action="" onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  name="name"
                  placeholder="Full Name"
                  value={shipping.name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  name="address"
                  placeholder="Address"
                  value={shipping.address}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={shipping.postalCode}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  name="phone"
                  placeholder="Phone Number"
                  value={shipping.phone}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 text-white py-2.5 rounded-lg  hover:bg-gray-800 transition"
                >
                  Place Order
                </button>
              </form>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Order Summary
              </h3>
              <div className="space-y-3 border p-4 rounded-lg bg-gray-50">
                {cart.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div
                      className="flex justify-between items-center border-b pb-4"
                      key={item.id}
                    >
                      <span>
                        {item.name}x {item.quantity}
                      </span>
                    </div>
                  ))
                )}
                <div className="flex justify-between font-semibold text-lg pt-3">
                  <span>Total:</span> <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
