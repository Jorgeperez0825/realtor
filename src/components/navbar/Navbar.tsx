'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToExploreProperties = () => {
    if (typeof window !== 'undefined') {
      const exploreSection = document.querySelector('[data-section="explore-properties"]');
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const openWhatsApp = (message: string) => {
    if (typeof window !== 'undefined') {
      const whatsappUrl = `https://wa.me/17864685161?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
    setIsMenuOpen(false);
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
            <button 
              onClick={scrollToExploreProperties}
              className="text-white/90 hover:text-white transition-colors text-sm font-medium"
            >
              Buy/Rent
            </button>
            <button 
              onClick={() => openWhatsApp('Hi! I\'m interested in Airbnb management services. Can you provide more information?')}
              className="text-white/90 hover:text-white transition-colors text-sm font-medium"
            >
              Airbnb Management
            </button>
            
            {/* CTA Button */}
            <button 
              onClick={() => openWhatsApp('Hi! I\'m interested in real estate investment opportunities. Can you help me get started?')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
            >
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
              <button
                onClick={scrollToExploreProperties}
                className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-colors"
              >
                Buy/Rent
              </button>
              <button
                onClick={() => openWhatsApp('Hi! I\'m interested in Airbnb management services. Can you provide more information?')}
                className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-md text-sm font-medium transition-colors"
              >
                Airbnb Management
              </button>
              <div className="px-3 py-2">
                <button 
                  onClick={() => openWhatsApp('Hi! I\'m interested in real estate investment opportunities. Can you help me get started?')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
                >
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