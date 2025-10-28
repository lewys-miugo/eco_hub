"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // ✅ Check login state when component mounts and listen for storage changes
  useEffect(() => {
    const checkLoginState = () => {
      const token = localStorage.getItem("access_token");
      const user = localStorage.getItem("user");
      // User is logged in if they have either a token or user data
      setIsLoggedIn(!!token || !!user);
    };

    // Check on mount
    checkLoginState();

    // Listen for storage changes (e.g., login from another tab)
    window.addEventListener('storage', checkLoginState);

    // Cleanup
    return () => {
      window.removeEventListener('storage', checkLoginState);
    };
  }, []);

  // ✅ Logout handler — calls Flask API
  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // No token, just clear state and redirect
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      window.location.href = "/auth";
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Logout success:", data);
      } else {
        const data = await res.json();
        console.error("Logout API failed:", data);
      }
    } catch (error) {
      console.error("Logout API error:", error);
      // Continue with logout even if API call fails
    } finally {
      // Always clear local storage and update state
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setLoading(false);
      window.location.href = "/"; // redirect to login page
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-[#163473] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 p-1">
              <img src="./eco_hub_logo.png" alt="Eco Hub Logo" className="h-10" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-indigo-400 px-3 py-2 text-sm font-medium">Home</a>
            <a href="/dashboard" className="text-white hover:text-indigo-400 px-3 py-2 text-sm font-medium">Dashboard</a>
            <a href="/marketplace" className="text-white hover:text-indigo-400 px-3 py-2 text-sm font-medium">Marketplace</a>
            <a href="/advisor" className="text-white hover:text-indigo-400 px-3 py-2 text-sm font-medium">Advisor</a>
            <a href="/suppliers" className="text-white hover:text-indigo-400 px-3 py-2 text-sm font-medium">Listings</a>

            {/* ✅ Conditional Auth Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                disabled={loading}
                className="bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md text-sm font-bold transition-colors cursor-pointer"
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <a
                href="/auth"
                className="bg-[#D2AB17] text-black hover:bg-yellow-400 px-4 py-2 rounded-md text-sm font-bold transition-colors"
              >
                SignUp
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a href="/" className="text-gray-200 hover:text-indigo-400 block py-2 text-base font-medium">Home</a>
            <a href="/dashboard" className="text-gray-200 hover:text-indigo-400 block py-2 text-base font-medium">Dashboard</a>
            <a href="/marketplace" className="text-gray-200 hover:text-indigo-400 block py-2 text-base font-medium">Marketplace</a>
            <a href="/advisor" className="text-gray-200 hover:text-indigo-400 block py-2 text-base font-medium">Advisor</a>
            <a href="/suppliers" className="text-gray-200 hover:text-indigo-400 block py-2 text-base font-medium">Suppliers</a>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md text-base font-bold transition-colors"
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <a
                href="/auth"
                className="w-fit mx-2 bg-[#D4AF37] text-[#163473] hover:bg-[#B8941F] px-4 py-2 rounded-md text-base font-bold transition-colors"
              >
                SignUp
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
