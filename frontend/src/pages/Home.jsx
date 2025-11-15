import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products/");
        const data = response.data;

        console.log("API Base URL:", import.meta.env.VITE_API_URL);
        console.log("API Response:", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
    <Navbar/>

    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Welcome to <span className="text-emerald-500">MyShop</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8">
          Discover modern products, smart deals, and fast delivery.
        </p>
        <Link
          to="/products"
          className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-emerald-500 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-10">
          Featured Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">No Products Available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                    {product.description}
                  </p>
                </Link>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-emerald-600 font-semibold text-lg">
                    ₹{product.price}
                  </span>
                  <Link
                    to="/cart"
                    className="bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
    <Footer/>
  </>
  );
};

export default Home;
