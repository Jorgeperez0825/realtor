'use client';

import { useState } from 'react';
import VideoBackground from '../hero/VideoBackground';
import PropertySearch from '../properties/PropertySearch';

export default function InteractiveSection() {
  const [hasSearched, setHasSearched] = useState(false);
  const [resetSearch, setResetSearch] = useState(false);

  const handleSearchStateChange = (searched: boolean) => {
    setHasSearched(searched);
    if (resetSearch) {
      setResetSearch(false);
    }
  };

  const handleBackToVideo = () => {
    setHasSearched(false);
    setResetSearch(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20" data-section="explore-properties">
      {/* Video Background - Always present but can be hidden */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${hasSearched ? 'opacity-0' : 'opacity-100'}`}>
        <VideoBackground />
      </div>
      
      {/* Purple Background - Shows when search is active */}
      <div className={`absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 transition-opacity duration-1000 ${hasSearched ? 'opacity-100' : 'opacity-0'}`}>
        {/* Purple gradient background overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        {/* Animated particles or pattern for visual interest */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>
      
      {/* Interactive Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white animate-fadeInUp">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Explore Our
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extrabold tracking-tight">
                Properties
              </span>
            </h2>
            
            {/* Back to Video Button - Only show when search is active */}
            {hasSearched && (
              <button
                onClick={handleBackToVideo}
                className="ml-6 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 group"
                title="Back to video background"
              >
                <svg className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>
          
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light mb-8">
            {hasSearched 
              ? "Browse through our curated property listings with detailed information"
              : "Discover premium Orlando real estate opportunities with our advanced property search"
            }
          </p>
        </div>

        {/* Property Search Component */}
        <PropertySearch 
          onSearchStateChange={handleSearchStateChange} 
          resetTrigger={resetSearch}
        />
        
        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-white/80">Properties Available</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-white/80">Customer Satisfaction</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/80">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}