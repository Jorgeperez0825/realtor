'use client';

import { useState, useEffect } from 'react';

const propertyTypes = [
  {
    id: 'luxury',
    word: 'LUXURY',
    description: 'Premium properties with exceptional amenities and prime locations',
    color: 'from-purple-500 to-pink-500',
    features: ['Exclusive resort communities', 'High-end finishes and amenities', 'Prime Disney World proximity'],
    videoPlaceholder: 'Luxury Properties Showcase'
  },
  {
    id: 'vacation',
    word: 'VACATION',
    description: 'Perfect properties for short-term rental investments',
    color: 'from-blue-500 to-cyan-500',
    features: ['Optimal Airbnb potential', 'Family-friendly layouts', 'Resort-style amenities'],
    videoPlaceholder: 'Vacation Rental Properties'
  },
  {
    id: 'investment',
    word: 'INVESTMENT',
    description: 'Strategic properties designed for maximum returns',
    color: 'from-green-500 to-teal-500',
    features: ['Proven ROI performance', 'Growing market areas', 'Professional management ready'],
    videoPlaceholder: 'Investment Property Portfolio'
  },
  {
    id: 'resort',
    word: 'RESORT',
    description: 'Exclusive resort community properties with world-class amenities',
    color: 'from-orange-500 to-red-500',
    features: ['Championship golf courses', 'Resort-style pools and spas', 'Concierge services available'],
    videoPlaceholder: 'Resort Community Properties'
  }
];

export default function WordGame() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedType) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % propertyTypes.length);
          setIsAnimating(false);
        }, 300);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [selectedType]);

  const handleWordClick = (typeId: string) => {
    setSelectedType(typeId);
    const index = propertyTypes.findIndex(type => type.id === typeId);
    setCurrentWordIndex(index);
  };

  const resetGame = () => {
    setSelectedType(null);
  };

  const currentType = propertyTypes[currentWordIndex];

  return (
    <div className="space-y-8">
      {/* Interactive Word Display */}
      <div className="relative">
        <div className={`transition-all duration-500 ${isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
          <div className={`inline-block px-8 py-4 rounded-2xl bg-gradient-to-r ${currentType.color} text-white text-3xl md:text-4xl font-bold tracking-wider shadow-2xl`}>
            {currentType.word}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-lg text-gray-200 mt-4 transition-all duration-500">
          {currentType.description}
        </p>
      </div>

      {/* Property Type Selection Buttons */}
      {!selectedType && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {propertyTypes.map((type, index) => (
            <button
              key={type.id}
              onClick={() => handleWordClick(type.id)}
              className={`p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                index === currentWordIndex 
                  ? 'border-white bg-white/20 text-white shadow-2xl' 
                  : 'border-white/30 bg-white/10 text-gray-200 hover:border-white/50 hover:bg-white/20'
              }`}
            >
              <div className="font-bold text-sm tracking-wide">{type.word}</div>
            </button>
          ))}
        </div>
      )}

      {/* Selected Property Details */}
      {selectedType && (
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 animate-fadeInUp shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
            {currentType.word} Properties
          </h3>
          <p className="text-gray-200 text-lg mb-8 font-light leading-relaxed">
            {currentType.description}
          </p>
          
          {/* Video Placeholder */}
          <div className="mb-8">
            <div className="aspect-video bg-black/40 rounded-2xl border-2 border-dashed border-white/30 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <div className="text-5xl mb-3">🎬</div>
                <div className="text-white font-semibold text-lg">{currentType.videoPlaceholder}</div>
                <div className="text-gray-300 text-sm mt-2 font-light">Video Coming Soon</div>
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {currentType.features.map((feature, index) => (
              <div key={index} className="flex items-start text-white bg-white/5 rounded-xl p-4">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentType.color} mr-4 mt-1 flex-shrink-0`}></div>
                <span className="text-base leading-relaxed font-light">{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r ${currentType.color} text-white shadow-xl hover:shadow-2xl`}>
              View {currentType.word} Properties
            </button>
            <button 
              onClick={resetGame}
              className="px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 bg-white/20 text-white border border-white/30 hover:bg-white/30 shadow-lg"
            >
              Explore Other Types
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!selectedType && (
        <div className="text-center">
          <p className="text-gray-300 text-sm font-light tracking-wide">
            Click on any property type to discover exclusive features and upcoming showcases
          </p>
        </div>
      )}
    </div>
  );
}