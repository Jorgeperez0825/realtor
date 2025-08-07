'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              {/* Dream Properties Logo */}
              <Image 
                src="/logo.png" 
                alt="Dream Properties Logo" 
                width={32}
                height={32}
                className="rounded-lg object-contain"
              />
              <span className="text-white font-semibold text-lg">
                Dream Properties
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/properties" 
              className="text-white/90 hover:text-white transition-colors text-sm font-medium"
            >
              Buy/Sell
            </Link>
            <Link 
              href="/airbnb-management" 
              className="text-white/90 hover:text-white transition-colors text-sm font-medium"
            >
              Airbnb Management
            </Link>
            <Link 
              href="/portfolio" 
              className="text-white/90 hover:text-white transition-colors text-sm font-medium"
            >
              Your Portfolio
            </Link>
            
            {/* CTA Button */}
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform">
              Start Investing
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-md rounded-lg mt-2">
              <Link
                href="/properties"
                className="block px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Buy/Sell
              </Link>
              <Link
                href="/airbnb-management"
                className="block px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Airbnb Management
              </Link>
              <Link
                href="/portfolio"
                className="block px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Your Portfolio
              </Link>
              <div className="px-3 py-2">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform">
                  Start Investing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}