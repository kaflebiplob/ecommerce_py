import React, { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products/");
        const data = response.data;
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if (loading) return <Loader />;
  return (
    <section className="container mx-auto py-16px-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Our Products
      </h2>
      {products.length === 0 ? (
        <p className=" text-center text-gray-600">No Products Available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
              key={product.id}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-bold text-lg">
                    ₹{product.price}
                  </span>
                  <Link to="/cart" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                    Add to Cart
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Product;
