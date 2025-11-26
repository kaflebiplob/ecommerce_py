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

      <div className="container mx-auto py-10 px-6">
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
                      src={`http://localhost:8000${item.product.image}`}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-gray-600">₹{item.product.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product.id, Number(e.target.value))
                      }
                      className="w-16 border rounded-lg p-1 text-center"
                    />

                    <button
                      onClick={() => removeItem(item.product.id)}
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
                Total: ₹{totalPrice.toFixed(2)}
              </h3>

              <Link to="/checkout">
                <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
