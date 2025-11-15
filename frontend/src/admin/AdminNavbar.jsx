import React from "react";
import { FiBell, FiSearch, FiUser } from "react-icons/fi";

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between w-full">

      {/* Search */}
      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 w-[300px]">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm text-gray-700 w-full"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-6 text-gray-700">
        <FiBell className="text-xl cursor-pointer hover:text-black" />
        
        <div className="flex items-center gap-2 cursor-pointer hover:text-black">
          <FiUser className="text-xl" />
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>

    </div>
  );
};

export default AdminNavbar;
