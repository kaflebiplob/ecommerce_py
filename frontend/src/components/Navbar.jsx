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
    <nav className="bg-white border-b border-gray-200 text-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-gray-900 hover:text-emerald-600 transition"
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
                    ? "text-emerald-600 border-b-2 border-emerald-600 pb-1"
                    : "text-gray-700 hover:text-black transition"
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
            className="relative text-gray-700 hover:text-emerald-600 transition"
          >
            <i className="fa-solid fa-cart-shopping text-xl"></i>
            <span className="absolute -top-2 -right-3 bg-emerald-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              0
            </span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">
                Hi, <b>{user.username}</b>
              </span>
              <button
                onClick={logout}
                className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-800 transition"
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
