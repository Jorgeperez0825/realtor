'use client';

import { useState, useEffect } from 'react';
import VideoBackground from '../hero/VideoBackground';
import WordGame from './WordGame';

export default function InteractiveSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <VideoBackground />
      
      {/* Interactive Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeInUp">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Explore Our
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extrabold tracking-tight">
              Properties
            </span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            Discover premium Orlando real estate opportunities through our interactive property showcase
          </p>
        </div>

        {/* Word Game Component */}
        <WordGame />
      </div>
    </section>
  );
}