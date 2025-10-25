"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', path: '#', key: 'home', isDeadLink: true },
    { name: 'Dashboard', path: '#', key: 'dashboard', isDeadLink: true },
    { name: 'Marketplace', path: '#', key: 'marketplace', isDeadLink: true },
    { name: 'Advisor', path: '/advisor', key: 'advisor', isDeadLink: false },
    { name: 'Listings', path: '#', key: 'listings', isDeadLink: true },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-[#163473] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center p-1">
              {/* <span className="text-2xl font-bold text-white">Eco Hub</span> */}
              <a href="/">
              <img src="./eco_hub_logo.png" />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
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
              href="suppliers"
              className="text-white hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Listings
            </a>
            <a href="/auth" className="bg-[#D2AB17] text-black hover:bg-yellow-400 px-4 py-2 rounded-md text-sm font-bold transition-colors">
              Login
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="sr-only">
                {isMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              )}
            </button>
          </div>
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
                href="#"
                className="text-gray-200 hover:text-indigo-400 block px-3 py-2 text-base font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-indigo-400 block px-3 py-2 text-base font-medium transition-colors"
              >
                Services
              </a>
              <a
                href="#"
                className="text-gray-200 hover:text-indigo-400 block px-3 py-2 text-base font-medium transition-colors"
              >
                Contact
              </a>
              <a
                href="/auth"
                className="text-gray-200 hover:text-indigo-400 block px-3 py-2 text-base font-medium transition-colors"
              >
                Login
              </a>
            </div>
            <button className="px-4 py-2 bg-[#D4AF37] text-[#163473] text-base font-medium rounded-md hover:bg-[#B8941F] transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}