import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import dummy from "../assets/dummy.png";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist/");
      setWishlist(res.data);
    } catch (error) {
      toast.error("failed to load wishlist");
      console.log(error);
    }
  };
  useEffect(() => {
    if (!mounted.current) {
      fetchWishlist();
      mounted.current = true;
    }
  }, []);

  const removeFromWishlist = async (wishlistId) => {
    try {
      await api.delete(`/wishlist/${wishlistId}/`);
      setWishlist(wishlist.filter((item) => item.id !== wishlistId));
      toast.success("successfully removed wishlist");
      fetchWishlist();
    } catch (error) {
      toast.error("failed to remove wishlist");
    }
  };

  // if (loading) {
  //   return (
  //     <>
  //       <Navbar />
  //       <div className="text-center mt-20 text-gray-600 text-lg">
  //        <Loader/>
  //       </div>
  //     </>
  //   );
 
  // }
  return (
    <>
      <Navbar />

      <div className="container mx-auto py-10 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Your Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <p className="text-gray-600 text-center">
            Your Wishlist Is Empty.{" "}
            <Link to="/products" className="text-emerald-500 hover:underline">
              Browse Products
            </Link>
          </p>
        ) : (
          <div className="grid col-span-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <div
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
                key={item.id}
              >
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={item.product.image ?? dummy}
                    alt={item.product.name}
                    className="w-full h-52 object-cover rounded-xl mb-4"
                  />

                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.product.name}
                  </h3>

                  <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                    {item.product.description}
                  </p>

                  <span className="text-emerald-500 text-lg font-bold mt-2">
                    ₹{item.product.price}
                  </span>
                </Link>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;
