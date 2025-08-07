'use client';

import { useState } from 'react';

export default function VideoBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(true); // Show fallback
  };

  return (
    <div className="absolute inset-0 z-0">
      {/* Gradient Background - Always visible as fallback */}
      <div className={`absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'}`}></div>
      
      {/* Real Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'}`}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
      >
        <source src="/hero-video.mov" type="video/quicktime" />
        <source src="/hero-video.mov" type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
    </div>
  );
}