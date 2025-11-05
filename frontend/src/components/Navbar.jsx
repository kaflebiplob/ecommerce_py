import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Shop", path: "/products" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Orders", path: "/orders" },
  ];
  return (
    <nav className="bg-white sticky shadow top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Logo
        </Link>

        <ul className="hidden md:flex space-x-6 text-gray-700">
          {navItems.map((item) => (
            <li key={item.name} className="">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "text-blue-600" : "hover:text-blue-600"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="relative inline-flex items-center text-gray-600  hover:text-blue-600"
          >
            <i className="fa-solid fa-cart-shoppingtext-lx"></i>
            <span className="absolute -top-2 right-2 bg-blue-600 text-white text-xs px-1 rounded-full">
              0
            </span>
          </Link>
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-700">Hi, {user.username}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
