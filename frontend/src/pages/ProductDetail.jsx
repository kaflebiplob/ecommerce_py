import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import Loader from "../components/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`products/${id}/`);
        setProduct(response.data);
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

  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-96 object-cover rounded-2xl shadow"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6 text-base">
            {product.description}
          </p>

          <p className="text-2xl font-semibold text-emerald-500 mb-6">
            ₹{product.price}
          </p>

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
  );
};

export default ProductDetail;
