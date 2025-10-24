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
    <nav className="fixed w-full z-50 bg-[#1A202C] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="shrink-0 flex items-center">
              <div className="h-8 w-8 relative mr-3">
                {/* Sun and Leaf Logo */}
                <div className="w-full h-full bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold text-white">EcoPowerHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeLink === link.key
                    ? 'text-white border-b-2 border-white'
                    : 'text-white hover:text-gray-300'
                } ${link.isDeadLink ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                onClick={(e) => {
                  if (link.isDeadLink) {
                    e.preventDefault();
                    return;
                  }
                  setActiveLink(link.key);
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Profile and Logout */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Profile Icon */}
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
              </div>
            </div>
            {/* Logout Button */}
            <button className="px-4 py-2 bg-[#D4AF37] text-[#1A202C] text-sm font-medium rounded-md hover:bg-[#B8941F] transition-colors">
              Logout
            </button>
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
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1A202C] shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.path}
              className={`block px-3 py-3 rounded-md text-base font-medium border-b border-gray-600 ${
                activeLink === link.key
                  ? 'bg-gray-700 text-white'
                  : 'text-white hover:bg-gray-700 hover:text-gray-300'
              } ${link.isDeadLink ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
              onClick={(e) => {
                if (link.isDeadLink) {
                  e.preventDefault();
                  return;
                }
                setActiveLink(link.key);
                setIsMenuOpen(false);
              }}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center justify-between px-3 py-3 mt-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#D4AF37] text-[#1A202C] text-base font-medium rounded-md hover:bg-[#B8941F] transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
