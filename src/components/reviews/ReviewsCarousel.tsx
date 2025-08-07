'use client';

import { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';

const reviews = [
  {
    id: 1,
    name: "Michael Thompson",
    location: "New York, NY",
    rating: 5,
    text: "Outstanding service from start to finish. They helped me find the perfect vacation rental property in Orlando and the ROI has exceeded all expectations. The property management is seamless.",
    propertyType: "Vacation Rental",
    investment: "$450K",
    roi: "18% annually"
  },
  {
    id: 2,
    name: "Sarah Martinez",
    location: "Los Angeles, CA",
    rating: 5,
    text: "I was skeptical about investing in Orlando real estate from across the country, but their team made everything effortless. My Airbnb property is consistently booked and generating excellent returns.",
    propertyType: "Luxury Villa",
    investment: "$620K",
    roi: "22% annually"
  },
  {
    id: 3,
    name: "David Chen",
    location: "Toronto, Canada",
    rating: 5,
    text: "Professional, knowledgeable, and trustworthy. They guided me through every step of purchasing my first investment property in the US. The results speak for themselves.",
    propertyType: "Resort Property",
    investment: "$380K",
    roi: "16% annually"
  },
  {
    id: 4,
    name: "Emma Johnson",
    location: "London, UK",
    rating: 5,
    text: "Exceptional experience working with this team. They understand the international investor needs and made the entire process smooth. My Orlando property is performing beyond expectations.",
    propertyType: "Investment Home",
    investment: "$520K",
    roi: "20% annually"
  },
  {
    id: 5,
    name: "Carlos Rodriguez",
    location: "Miami, FL",
    rating: 5,
    text: "Best decision I made was working with them. Their market knowledge and property management services are top-notch. My Disney area property stays booked year-round.",
    propertyType: "Disney Area Villa",
    investment: "$480K",
    roi: "19% annually"
  }
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="w-full flex-shrink-0 px-4">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      >
        <svg className="w-6 h-6 mx-auto text-gray-600 dark:text-gray-300 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      >
        <svg className="w-6 h-6 mx-auto text-gray-600 dark:text-gray-300 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-3 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 max-w-md mx-auto">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-700"
            style={{ width: `${((currentIndex + 1) / reviews.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}