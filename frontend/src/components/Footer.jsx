import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray200 mt-10">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Myshop </h2>
          <p className="text-sm">
            Your one-stop shop for the best products online. Quality, trust, and
            fast delivery.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/about-us" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/support" className="hover:text-blue-400">
                Support
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-blue-400">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Stay Updated</h2>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded text-gray-800"
            />
            <button className="bg-blue-600 px-3 rounded hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center border-t border-gray-700 py-4 text-sm">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
