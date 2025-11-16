import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiHeart, FiStar } from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  const [rating, setRating] = useState(0); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`products/${id}/`);
        setProduct(response.data);

        setRating(response.data.rating || 0);
      } catch (error) {
        console.error("Failed to fetch the product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="text-center text-gray-600 mt-20 text-lg">
        Product not found
      </div>
    );
  }

  const toggleWishlist = () => {
    setWishlist(!wishlist);
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div className="flex justify-center relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md h-96 object-cover rounded-2xl shadow"
            />

            <button
              onClick={toggleWishlist}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <FiHeart
                className={`text-2xl ${
                  wishlist ? "text-red-500" : "text-gray-400"
                }`}
              />
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`text-2xl cursor-pointer ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}

              <span className="text-gray-700 ml-2">{rating}/5</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 text-base">
              {product.description}
            </p>

            <p className="text-2xl font-semibold text-emerald-500 mb-6">
              ₹{product.price}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>

              <span className="text-lg font-medium">{quantity}</span>

              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <Link
              to="/cart"
              className="bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </Link>

            <div className="mt-8">
              <Link
                to="/products"
                className="text-sm text-gray-600 hover:text-blue-600 transition"
              >
                ← Back to Products
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
