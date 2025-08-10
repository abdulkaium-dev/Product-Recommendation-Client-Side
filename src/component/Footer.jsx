import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  // Put your logo URL here, or leave null/empty if none
  const logoUrl = null; // e.g. "/logo.png" or null

  return (
    <footer className="bg-gray-900 dark:bg-gray-900 text-white dark:text-gray-200 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo & Name */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            {logoUrl && (
              <img
                src={logoUrl}
                alt="MyWebsite Logo"
                className="h-10 w-12 object-contain"
              />
            )}
            <span className="text-2xl font-bold tracking-wide text-white dark:text-indigo-400">
              ProductRecommender
            </span>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-300">
            Empowering users with smart digital experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white dark:text-indigo-300">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-300">
            <li>
              <Link to="/" className="hover:text-white dark:hover:text-indigo-400 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white dark:hover:text-indigo-400 transition-colors duration-300">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white dark:hover:text-indigo-400 transition-colors duration-300">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white dark:hover:text-indigo-400 transition-colors duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white dark:text-indigo-300">
            Contact
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-300">Email: info@mywebsite.com</p>
          <p className="text-sm text-gray-400 dark:text-gray-300">Phone: +880 1234-567890</p>
          <p className="text-sm text-gray-400 dark:text-gray-300">Location: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white dark:text-indigo-300">
            Follow Us
          </h3>
          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-blue-300 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 dark:border-gray-600 mt-10 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
}
