import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, q) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity: q } : item))
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Your Cart
        </h2>
        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">
            Your Cart Is Empty {""}.{" "}
            <Link
              to="/products"
              className="text-emerald-500 text-center] hover:underline"
            >
              Shop Now
            </Link>
          </p>
        ) : (
          <>
            <div className="grid gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white shadow rounded-xl p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="w-16 border rounded-lg  p-1 text-center"
                    />
                    <button
                      onChange={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-between items-center border-t pt-4">
              <h3 className="text-xl font-semibold">
                Total : ₹{totalPrice.toFixed(2)}
              </h3>
              <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition">
                <Link to="/checkout"></Link> Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
