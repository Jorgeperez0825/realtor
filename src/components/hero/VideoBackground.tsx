'use client';

import { useState, useEffect, useRef } from 'react';

export default function VideoBackground() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Force video to play and stay playing
      const playVideo = async () => {
        try {
          video.currentTime = 0;
          await video.play();
        } catch (error) {
          console.log('Video play failed:', error);
          setVideoError(true);
        }
      };

      // Ensure video keeps playing
      const handlePause = () => {
        if (!videoError) {
          setTimeout(() => {
            video.play().catch(() => setVideoError(true));
          }, 100);
        }
      };

      const handleEnded = () => {
        if (!videoError) {
          video.currentTime = 0;
          video.play().catch(() => setVideoError(true));
        }
      };

      const handleCanPlay = () => {
        if (!videoError && video.paused) {
          video.play().catch(() => setVideoError(true));
        }
      };

      // Set up event listeners
      video.addEventListener('pause', handlePause);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleCanPlay);
      
      // Start playing
      playVideo();

      // Interval to ensure video keeps playing
      const playInterval = setInterval(() => {
        if (!videoError && video.paused) {
          video.play().catch(() => setVideoError(true));
        }
      }, 1000);

      // Cleanup
      return () => {
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleCanPlay);
        clearInterval(playInterval);
      };
    }
  }, [videoError]);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div className="absolute inset-0 z-0">
      {/* Gradient Background - Always visible as fallback when there's an error */}
      <div className={`absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 ${videoError ? 'opacity-100' : 'opacity-30'}`}></div>
      
      {/* Real Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="w-full h-full object-cover opacity-100"
        onError={handleVideoError}
        style={{ pointerEvents: 'none' }}
      >
        <source src="/hero-video-new.mov" type="video/quicktime" />
        <source src="/hero-video-new.mov" type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
    </div>
  );
}