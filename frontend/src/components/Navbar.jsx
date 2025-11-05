import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-blue-200 transition"
        >
          MyShop
        </Link>

        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-white border-b-2 border-white pb-1"
                    : "hover:text-blue-200"
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
            className="relative text-white hover:text-blue-200 transition"
          >
            <i className="fa-solid fa-cart-shopping text-xl"></i>
            <span className="absolute -top-2 -right-3 bg-white text-blue-700 text-xs font-bold px-1.5 py-0.5 rounded-full">
              0
            </span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm">Hi, <b>{user.username}</b></span>
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
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
