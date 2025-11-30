import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [hasSavedAddress, setHasSavedAddress] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "cod",
    country: "Nepal",
  });

  const loadUser = async () => {
    console.log("loadUser called");
    try {
      const res = await api.get("/users/");
      console.log(" User API Response:", res.data);

      let currentUser;

      if (Array.isArray(res.data)) {
        console.log("📋 Response is an array with", res.data.length, "users");
        currentUser = res.data[0];
      } else {
        currentUser = res.data;
      }

      console.log("Current user:", currentUser);

      // Since the API doesn't return ID, we'll use username as identifier
      const username = currentUser?.username;
      console.log("Username:", username);

      if (!username) {
        console.error("No username found");
        return null;
      }

      setUserId(username); // Using username as userId
      console.log("User identifier set to:", username);

      const fullName =
        `${currentUser.first_name} ${currentUser.last_name}`.trim() || username;
      setFormData((prev) => ({
        ...prev,
        fullName: fullName,
      }));

      return username;
    } catch (error) {
      console.error("Could not load user:", error);
      return null;
    }
  };

  const loadCart = async () => {
    try {
      const response = await api.get("/cart/");
      setCart(response.data.items || []);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Failed to load cart");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadAddress = async (currentUserIdentifier) => {
    if (!currentUserIdentifier) {
      console.log("No user identifier provided, skipping address load");
      return;
    }

    console.log(
      "🔍 Loading address for user identifier:",
      currentUserIdentifier
    );

    try {
      const res = await api.get("/address/");
      console.log("Address API Response:", res.data);

      const addressList = Array.isArray(res.data)
        ? res.data
        : res.data.results || [];

      console.log("Address list length:", addressList.length);

      addressList.forEach((addr, index) => {
        console.log(`\n--- Address ${index} ---`);
        console.log("Full address:", JSON.stringify(addr, null, 2));
        console.log("User field:", addr.user);
      });

      const userAddress = addressList.find((addr) => {
        if (addr.user === currentUserIdentifier) {
          console.log("Matched by direct comparison");
          return true;
        }
        if (String(addr.user) === String(currentUserIdentifier)) {
          console.log("Matched by string comparison");
          return true;
        }
        if (addr.user?.username === currentUserIdentifier) {
          console.log("Matched by username");
          return true;
        }
        if (addr.username === currentUserIdentifier) {
          console.log(" Matched by address.username");
          return true;
        }
        return false;
      });

      console.log("\n Final matched address:", userAddress);

      if (userAddress) {
        console.log("Address found! Setting form data...");
        setHasSavedAddress(true);

        const newFormData = {
          fullName:
            userAddress.full_name || userAddress.fullName || formData.fullName,
          address:
            userAddress.address_line || userAddress.address || formData.address,
          phone:
            userAddress.phone || userAddress.phone_number || formData.phone,
          city: userAddress.city || formData.city,
          state:
            userAddress.state || userAddress.state_province || formData.state,
          zipCode:
            userAddress.zip_code ||
            userAddress.zipCode ||
            userAddress.postal_code ||
            formData.zipCode,
          paymentMethod: formData.paymentMethod,
          country: formData.country,
        };

        console.log("Setting form data:", newFormData);
        setFormData(newFormData);
        console.log("Form data updated!");
      } else {
        console.log("No address found for user");
        setHasSavedAddress(false);
      }
    } catch (error) {
      console.error("Error loading address:", error);
      setHasSavedAddress(false);
    }
  };

  useEffect(() => {
    console.log("🎬 useEffect for user initialization triggered");
    const initializeUser = async () => {
      console.log("initializeUser function started");
      const id = await loadUser();
      console.log("📦 Received user ID from loadUser:", id);
      if (id) {
        console.log("User ID exists, calling loadAddress");
        await loadAddress(id);
      } else {
        console.log("No user ID returned from loadUser");
      }
    };
    initializeUser();
  }, []);

  useEffect(() => {
    loadCart();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!formData.fullName || !formData.address || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setProcessing(true);

    try {
      // Saving or updating address
      if (hasSavedAddress) {
        // If you have update endpoint, use it here
        // await api.put(`/address/${userId}/`, {
        //   full_name: formData.fullName,
        //   phone: formData.phone,
        //   address_line: formData.address,
        //   city: formData.city,
        //   state: formData.state,
        //   country: "Nepal",
        //   zip_code: formData.zipCode,
        //   user: userId,
        // });
      } else {
        await api.post("/address/", {
          full_name: formData.fullName,
          phone: formData.phone,
          address_line: formData.address,
          city: formData.city,
          state: formData.state,
          country: "Nepal",
          zip_code: formData.zipCode,
          user: userId,
        });
      }

      const response = await api.post("/orders/place-order/", {
        user: userId,
        payment_method: formData.paymentMethod,
        items: cart.map((item) => ({
          product_id: item.product.id,
          stock: item.stock,
        })),
      });

      if (response.status === 201) {
        toast.success("Order placed successfully!");

        try {
          await api.delete("/cart/clear/");
        } catch (clearError) {
          console.log("Cart clear error:", clearError);
        }

        navigate("/");
      }
    } catch (error) {
      console.error("Order error:", error);

      if (error.response?.data) {
        const errorData = error.response.data;

        if (
          errorData.detail?.includes("stock") ||
          errorData.detail?.includes("stock")
        ) {
          toast.error(errorData.detail);
        } else if (errorData.out_of_stock) {
          toast.error(`Sorry, ${errorData.product_name} is out of stock`);
        } else {
          toast.error(errorData.detail || "Failed to place order");
        }
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } finally {
      setProcessing(false);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = totalPrice > 0 ? 50 : 0;
  const finalTotal = totalPrice + shipping;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-emerald-600 mb-4"></i>
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase</p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <i className="fa-solid fa-cart-shopping text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-4">
              Add some products to your cart before checkout.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Shipping Information
                </h2>
                {hasSavedAddress && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Saved Address
                  </span>
                )}
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value="Nepal"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment Method
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                       src={`${import.meta.env.VITE_API_URL || "http://localhost:8000"}${item.product.image}`}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ₹{item.product.price}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ₹{(item.quantity * item.product.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={processing || cart.length === 0}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-lg"
              >
                {processing ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                    Placing Order...
                  </>
                ) : (
                  `Place Order - ₹${finalTotal.toFixed(2)}`
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                ← Back to Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
