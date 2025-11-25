import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    // { name: "Wishlist", path: "/wishlist" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 text-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 hover:text-emerald-600 transition"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>
          </button>

          <Link
            to="/"
            className="text-2xl font-semibold tracking-tight text-gray-900 hover:text-emerald-600 transition"
          >
            MyShop
          </Link>
        </div>

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

        {/* Right Side Items */}
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition focus:outline-none"
              >
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center border border-emerald-200">
                  <i className="fa-solid fa-user text-emerald-600 text-sm"></i>
                </div>
                <span className="text-sm font-medium hidden sm:block">
                  {user.username}
                </span>
                <i
                  className={`fa-solid fa-chevron-down text-xs transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                ></i>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <i className="fa-solid fa-user mr-3 text-gray-400"></i>
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <i className="fa-solid fa-box mr-3 text-gray-400"></i>
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <i className="fa-solid fa-heart mr-3 text-gray-400"></i>
                    My Wishlist
                  </Link>

                  {/* Settings Link */}
                  {/* <Link
                    to="/settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <i className="fa-solid fa-cog mr-3 text-gray-400"></i>
                    Settings
                  </Link> */}

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-1"></div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition"
                  >
                    <i className="fa-solid fa-right-from-bracket mr-3"></i>
                    Logout
                  </button>
                </div>
              )}
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

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>
        )}

        {/* Mobile Menu Sidebar */}
        <div
          ref={mobileMenuRef}
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="text-xl font-semibold text-gray-900"
            >
              MyShop
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition ${
                        isActive
                          ? "bg-emerald-50 text-emerald-600 border-l-4 border-emerald-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* User Section in Mobile Menu */}
            {user && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="px-4 mb-4">
                  <p className="text-sm font-medium text-gray-900">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  <i className="fa-solid fa-user mr-3 text-gray-400"></i>
                  My Profile
                </Link>
                
                <Link
                  to="/settings"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  <i className="fa-solid fa-cog mr-3 text-gray-400"></i>
                  Settings
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-gray-50 rounded-lg transition mt-2"
                >
                  <i className="fa-solid fa-right-from-bracket mr-3"></i>
                  Logout
                </button>
              </div>
            )}

            {!user && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block w-full bg-black text-white text-center px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;