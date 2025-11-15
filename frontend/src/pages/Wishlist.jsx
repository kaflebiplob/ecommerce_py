import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto  py-10 px-6">
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
            {wishlist.map((item) => {
              <div
                className="bg-white runded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
                key={item.id}
              >
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                    {item.description}
                  </p>
                  <span className="text-emerald-500 mt-2 text-lg font-bold mt3 ">
                    {" "}
                    ₹{item.price}
                  </span>
                </Link>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="mt-4 bg-red-500 text-white py-2 rounded-lg  hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>;
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
