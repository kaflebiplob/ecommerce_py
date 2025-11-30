import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiHeart, FiStar } from "react-icons/fi";
import dummyImage from "../assets/dummy.png";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);
  const [rating, setRating] = useState(0);

  const handleAddToCart = async () => {
    try {
      const response = await api.post("/cart/add/", {
        product_id: product.id,
        quantity: quantity,
      });

      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`products/${id}/`);
        setProduct(response.data);

        const reviewResponse = await api.get(`/reviews/?product_id=${id}`);
        if (reviewResponse.data?.length > 0) {
          setRating(reviewResponse.data[0].rating);
        }

        // fetch wishlist
        const wishlistRes = await api.get("/wishlist/");
        const foundItem = wishlistRes.data.find(
          (item) => item.product.id === parseInt(id)
        );

        if (foundItem) {
          setWishlist(true);
          setWishlistId(foundItem.id);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
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

  const incrementQuantity = () => {
    if (product.stock && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleRating = async (newRating) => {
    try {
      await api.post("/reviews/", {
        product_id: product.id,
        rating: newRating,
      });
      setRating(newRating);
      toast.success("Rating submitted!");
    } catch {
      toast.error("Failed to give rating");
    }
  };

  const toggleWishlist = async () => {
    try {
      if (!wishlist) {
        const res = await api.post("/wishlist/", { product_id: product.id });
        setWishlist(true);
        setWishlistId(res.data.id);
        toast.success("Added to wishlist");
      } else {
        await api.delete(`/wishlist/${wishlistId}/`);
        setWishlist(false);
        setWishlistId(null);
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      toast.error("Wishlist error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center">
            <img
              src={product.image || dummyImage}
              alt={product.name}
              className="w-full max-w-md h-96 object-cover rounded-2xl shadow"
            />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  onClick={() => handleRating(i + 1)}
                  className={`text-2xl cursor-pointer ${
                    i < rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-700 ml-2">{rating}/5</span>
            </div>

            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              {product.description}
            </p>

            <p className="text-2xl md:text-3xl font-semibold text-emerald-500 mb-6">
              ₹{product.price}
            </p>

            {product.stock ? (
              <p className="text-sm text-gray-500 mb-4">
                {product.stock} item{product.stock > 1 ? "s" : ""} in stock
              </p>
            ) : (
              <p className="text-sm text-red-500 mb-4">Out of stock</p>
            )}

            {product.stock > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={decrementQuantity}
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  className={`px-3 py-1 rounded ${
                    quantity < product.stock
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            )}

            <div className="flex items-center gap-4 mt-6">
              {product.stock > 0 && (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="inline-block px-5 py-2 rounded text-white bg-black hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={toggleWishlist}
                    className="p-3 rounded-full hover:bg-gray-100"
                  >
                    <FiHeart
                      className={`text-xl ${
                        wishlist ? "text-red-500 fill-red-500" : "text-gray-600"
                      }`}
                    />
                  </button>
                </>
              )}
            </div>

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
