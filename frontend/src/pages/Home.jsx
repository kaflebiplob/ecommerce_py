import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import Loader from "../components/Loader"; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("products/");
        const data = response.data;
        console.log("API Base URL:", import.meta.env.VITE_API_URL);

        console.log("Api response",response.data);

        if(Array.isArray(data)){
          setProducts(data);
        }else{
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch Products", error);
        // setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    
  }, []);
  if (loading) return <Loader />;
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to<span className="text-yellow-300">MyShop</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Discover the latest products with amazing deals with fast delivery.
        </p>
        <Link
          to="/products"
          className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-yellow-300 transition"
        >
          {" "}
          Shop Now
        </Link>
      </section>
      <section className="container mx-auto py-16px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Featured Products
        </h2>
        {products.length === 0 ? (
          <p className=" text-center text-gray-600">No Products Available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product) => (
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
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
