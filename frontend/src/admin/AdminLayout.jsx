import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block w-[220px] bg-gray-900 text-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold border-b border-gray-700 pb-3">
          <Link to="/">Admin Panel</Link>
        </h2>

        <ul className="mt-6 space-y-4 text-gray-300">
          <li>
            <Link to="products" className="block hover:text-white">
              Products
            </Link>
          </li>
          <li>
            <Link to="orders" className="block hover:text-white">
              Orders
            </Link>
          </li>
          <li>
            <Link to="reviews" className="block hover:text-white">
              Reviews
            </Link>
          </li>
          <li>
            <Link to="discounts" className="block hover:text-white">
              Discounts
            </Link>
          </li>
          <li>
            <Link to="payments" className="block hover:text-white">
              Payments
            </Link>
          </li>
        </ul>
      </div>

      {/*  Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[220px] bg-gray-900 text-white p-6 shadow-lg z-50 transform 
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <h2 className="text-xl font-semibold border-b border-gray-700 pb-3 flex justify-between">
          <Link to="/">Admin Panel</Link>
          <button onClick={() => setOpen(false)}>✖</button>
        </h2>

        <ul
          className="mt-6 space-y-4 text-gray-300"
          onClick={() => setOpen(false)}
        >
          <li>
            <Link to="products" className="block hover:text-white">
              Products
            </Link>
          </li>
          <li>
            <Link to="orders" className="block hover:text-white">
              Orders
            </Link>
          </li>
          <li>
            <Link to="reviews" className="block hover:text-white">
              Reviews
            </Link>
          </li>
          <li>
            <Link to="discounts" className="block hover:text-white">
              Discounts
            </Link>
          </li>
          <li>
            <Link to="payments" className="block hover:text-white">
              Payments
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        {/*  Navbar with mobile menu button */}
        <div className="h-[70px] border-b bg-white flex items-center px-6 shadow-sm">
          {/* Mobile Menu Button */}
          <button className="mr-4 md:hidden" onClick={() => setOpen(true)}>
            <Menu size={26} />
          </button>

          <AdminNavbar />
        </div>

        {/* Main part content */}
        <div className="p-10 flex-1">
          <div className="bg-white rounded-2xl shadow p-8 min-h-[80vh]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
