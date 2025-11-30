import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 mt-10">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">MyShop</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Discover quality products, fast delivery, and the best shopping
            experience — all in one place.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/about-us" className="hover:text-emerald-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/support" className="hover:text-emerald-400 transition">
                Support
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-emerald-400 transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-sm mb-3 text-gray-400">
            Subscribe to get the latest deals and updates.
          </p>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded border border-gray-500 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button className="bg-emerald-600 px-4 text-white rounded hover:bg-emerald-500 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center border-t border-gray-700 py-4 text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-emerald-400">MyShop</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
