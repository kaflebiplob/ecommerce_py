import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/api";
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const mounted = useRef(false);

  const loadCart = async () => {
    try {
      const response = await api.get("/cart/");
      console.log("CART RESPONSE:", response.data);

      setCart(response.data.items || []);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      loadCart();
      mounted.current = true;
    }
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      await api.patch(`/cart/update/`, {
        product_id: productId,
        quantity: quantity,
      });

      toast.success("Cart updated");
      loadCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update cart");
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.patch(`/cart/update/`, {
        product_id: productId,
        quantity: 0,
      });

      toast.success("Item removed");
      loadCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await api.delete(`/cart/clear/`);
      toast.success("Cart cleared");
      loadCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed to clear cart");
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10 text-xl">Loading your cart...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto py-10 px-6 min-h-[60vh]">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Your Cart
        </h2>

        {cart.length > 0 && (
          <div className="text-right mb-4">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              Clear All Cart
            </button>
          </div>
        )}

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">
            Your cart is empty.
            <Link to="/products" className="text-emerald-500 hover:underline">
              &nbsp;Shop Now
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
                     src={`${import.meta.env.VITE_API_URL || "http://localhost:8000"}${item.product.image}`}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-gray-600">₹{item.product.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition font-bold text-gray-700"
                      >
                        -
                      </button>
                      <span className="px-6 py-2 bg-white font-medium text-gray-800 min-w-[60px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition font-bold text-gray-700"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-600 hover:text-red-800 font-medium transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Total: ₹{totalPrice.toFixed(2)}
                </h3>

                <Link to="/checkout">
                  <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition font-semibold shadow-md hover:shadow-lg">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
