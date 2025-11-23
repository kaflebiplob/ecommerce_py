import React, { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import  dummyImage from "../assets/dummy.png";

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
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const featuredProducts = products.filter(
    (p) => p.status === true && p.is_featured === true
  );

  const activeProducts = products.filter((p) => p.status === true);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        <section className="container mx-auto py-16 px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
             Featured Products
          </h2>

          {featuredProducts.length === 0 ? (
            <p className="text-center text-gray-600 mb-12">
              No Featured Products Available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
              {featuredProducts.map((product) => (
                <div
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
                  key={product.id}
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image || dummyImage}
                      alt={product.name}
                      className="w-full h-52 object-cover rounded-xl mb-4"
                    />

                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {product.description?.slice(0, 60)}...

                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-emerald-500 font-bold text-lg">
                        ₹{product.price}
                      </span>
                      <Link
                        to="/cart"
                        className="bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800"
                      >
                        Add to Cart
                      </Link>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
             All Products
          </h2>

          {activeProducts.length === 0 ? (
            <p className="text-center text-gray-600">
              No Active Products Available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {activeProducts.map((product) => (
                <div
                  className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
                  key={product.id}
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image || dummyImage}
                      alt={product.name}
                      className="w-full h-52 object-cover rounded-xl mb-4"
                    />

                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-emerald-500 font-bold text-lg">
                        ₹{product.price}
                      </span>
                      <Link
                        to="/cart"
                        className="bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800"
                      >
                        Add to Cart
                      </Link>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Product;
