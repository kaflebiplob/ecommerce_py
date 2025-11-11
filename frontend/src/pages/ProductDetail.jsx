import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

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
  if (!product)
    return (
      <div className="text-center text-gray-500 mt-10">
        Product not found 
      </div>
    );

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl shadow"
        />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-6">
            ₹{product.price}
          </p>

          <Link to="/cart" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </Link>

          <div className="mt-6">
            <Link
              to="/products"
              className="text-blue-500 hover:underline text-sm"
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
