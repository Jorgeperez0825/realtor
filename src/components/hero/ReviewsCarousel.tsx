'use client';

import { useEffect } from 'react';

const reviews = [
  {
    id: 1,
    name: "Michael T.",
    location: "New York",
    rating: 5,
    text: "Outstanding service! My Orlando property exceeded all expectations."
  },
  {
    id: 2,
    name: "Sarah M.",
    location: "Los Angeles", 
    rating: 5,
    text: "Seamless experience from across the country. Excellent returns!"
  },
  {
    id: 3,
    name: "David C.",
    location: "Toronto",
    rating: 5,
    text: "Professional team guided me through my first US investment."
  },
  {
    id: 4,
    name: "Emma J.",
    location: "London",
    rating: 5,
    text: "Perfect for international investors. Beyond expectations!"
  },
  {
    id: 5,
    name: "Carlos R.",
    location: "Miami",
    rating: 5,
    text: "Disney area property stays booked year-round. Great choice!"
  },
  {
    id: 6,
    name: "Jennifer W.",
    location: "Chicago",
    rating: 5,
    text: "Incredible returns and professional management. Highly recommended!"
  }
];

export default function ReviewsCarousel() {
  return (
    <div className="w-full overflow-hidden">
      {/* Continuous Scrolling Carousel */}
      <div className="flex animate-scroll">
        {/* First set of reviews */}
        {reviews.map((review) => (
          <div key={`first-${review.id}`} className="flex-shrink-0 w-80 mx-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-full transition-all duration-300 hover:bg-white/15 hover:scale-105">
              {/* Stars */}
              <div className="flex justify-center mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Review Text */}
              <p className="text-white text-sm leading-relaxed mb-4 text-center min-h-[60px]">
                "{review.text}"
              </p>
              
              {/* Author Info */}
              <div className="text-center">
                <div className="text-white font-semibold text-base">{review.name}</div>
                <div className="text-gray-300 text-sm">{review.location}</div>
              </div>
              

            </div>
          </div>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {reviews.map((review) => (
          <div key={`second-${review.id}`} className="flex-shrink-0 w-80 mx-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 h-full transition-all duration-300 hover:bg-white/15 hover:scale-105">
              {/* Stars */}
              <div className="flex justify-center mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Review Text */}
              <p className="text-white text-sm leading-relaxed mb-4 text-center min-h-[60px]">
                "{review.text}"
              </p>
              
              {/* Author Info */}
              <div className="text-center">
                <div className="text-white font-semibold text-base">{review.name}</div>
                <div className="text-gray-300 text-sm">{review.location}</div>
              </div>
              

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}