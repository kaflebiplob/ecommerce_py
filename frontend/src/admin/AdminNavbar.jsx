import React, { useState, useEffect, useRef } from "react";
import { FiBell, FiSearch, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const AdminNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { setGlobalSearch } = useSearch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between w-full gap-3 sm:gap-4">
      {/* Search */}
      <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-full px-3 sm:px-4 py-2 flex-1 sm:flex-initial sm:w-[300px] max-w-md">
        <FiSearch className="text-gray-500 text-base sm:text-lg shrink-0" />
        <input
          type="text"
          placeholder="Search Products..."
          className="bg-transparent outline-none text-sm text-gray-700 w-full"
          onChange={(e) => setGlobalSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4 sm:gap-6 text-gray-700">
        {/* <FiBell className="text-lg sm:text-xl cursor-pointer hover:text-black transition" /> */}

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-black transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FiUser className="text-lg sm:text-xl" />
            <span className="text-sm font-medium hidden sm:inline">Admin</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
              {/* Profile */}
              {/* <button
                
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <FiSettings className="text-base" />
                <span>Profile</span>
              </button> */}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <FiLogOut className="text-base" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
