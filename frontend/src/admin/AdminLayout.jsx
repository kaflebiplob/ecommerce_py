import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-[220px] bg-gray-900 text-white p-6 shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-semibold border-b border-gray-700 pb-3">
          <Link onClick={() => setOpen(false)} to="/">
            Admin Panel
          </Link>
        </h2>

        <ul className="mt-6 space-y-4 text-gray-300">
           <li>
            <Link onClick={() => setOpen(false)} to="/admin">
              Dashboard
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} to="/admin/users">
              Users
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} to="/admin/products">
              Products
            </Link>
          </li>
           <li>
            <Link onClick={() => setOpen(false)} to="/admin/categories">
              Category
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} to="/admin/orders">
              Orders
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} to="/admin/reviews">
              Reviews
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} to="/admin/discounts">
              Discounts
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} to="/admin/user-address">
              Address
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} to="/admin/payments">
              Payments
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} to="/admin/support-ticket">
              Support Ticket
            </Link>
          </li>
        </ul>
      </div>

      <div className="hidden md:block w-[220px] bg-gray-900 text-white p-6 shadow-lg h-full">
        <h2 className="text-xl font-semibold border-b border-gray-700 pb-3">
          <Link to="/admin">Admin Panel</Link>
        </h2>

        <ul className="mt-6 space-y-4 text-gray-300">
           {/* <li>
            <Link to="dashboard" className="block hover:text-white">
              Dashboard
            </Link>
          </li> */}
           <li>
            <Link to="users" className="block hover:text-white">
              Users
            </Link>
          </li>
          <li>
            <Link to="products" className="block hover:text-white">
              Products
            </Link>
          </li>
            <li>
            <Link to="categories" className="block hover:text-white">
              Category
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
            <Link to="user-address" className="block hover:text-white">
              Address
            </Link>
          </li>
          <li>
            <Link to="payments" className="block hover:text-white">
              Payments
            </Link>
          </li>
          <li>
            <Link to="support-ticket" className="block hover:text-white">
              Support Ticket
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="h-[70px] border-b bg-white flex items-center px-6 shadow-sm">
          <button className="mr-4 md:hidden" onClick={() => setOpen(true)}>
            <Menu size={26} />
          </button>
          <AdminNavbar />
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="bg-white rounded-2xl shadow p-8 min-h-[80vh]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
