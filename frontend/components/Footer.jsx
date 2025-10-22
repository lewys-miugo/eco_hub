import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#163466] border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-600 dark:text-gray-400">
                  Terms of Services
                </span>
              </li>
              <li>
                <span className="text-gray-600 dark:text-gray-400">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="text-gray-600 dark:text-gray-400">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
