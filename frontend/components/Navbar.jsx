"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-[#163466] shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-white">Eco Hub</span>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-white hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="/dashboard"
              className="text-white hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/marketplace"
              className="text-white hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Marketplace
            </a>
            <a
              href="#"
              className="text-white hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Advisor
            </a>
            <a
              href="/suppliers"
              className="text-white hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Listings
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-200 hover:text-indigo-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              <a
                href="#"
                className="text-gray-200 hover:text-indigo-400 block px-3 py-2 text-base font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="/dashboard"
                className="text-gray-200 hover:text-indigo-400 block px-3 py-2 text-base font-medium transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/marketplace"
                className="text-gray-200 hover:text-indigo-400 block px-3 py-2 text-base font-medium transition-colors"
              >
                Marketplace
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-indigo-400 block px-3 py-2 text-base font-medium transition-colors"
              >
                Advisor
              </a>
              <a
                href="/suppliers"
                className="text-gray-200 hover:text-indigo-400 block px-3 py-2 text-base font-medium transition-colors"
              >
                Listings
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
