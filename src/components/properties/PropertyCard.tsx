'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  HeartIcon, 
  EyeIcon, 
  ShareIcon, 
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    description: string;
    image: string;
    features: string[];
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const openWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const message = `Hi! I'm interested in learning more about this property: ${property.title}. Can you provide more details?`;
      const whatsappUrl = `https://wa.me/17864685161?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 dark:border-gray-800">
      {/* Property Image with Enhanced Overlay */}
      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        <Image 
          src={property.image} 
          alt={property.title}
          fill
          className={`object-cover group-hover:scale-110 transition-all duration-700 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Top Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg"
          >
            {isFavorite ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg"
          >
            <ShareIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Premium Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold shadow-lg">
            <StarIcon className="h-3 w-3" />
            <span>Premium</span>
          </div>
        </div>

        {/* Quick View Button - Appears on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full font-semibold text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0">
            <EyeIcon className="h-4 w-4" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Enhanced Property Details */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
            <MapPinIcon className="h-4 w-4" />
            <span>Orlando, FL</span>
          </div>
        </div>

        {/* Description with Better Typography */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
          {property.description}
        </p>

        {/* Enhanced Features Grid */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
          <div className="grid grid-cols-2 gap-2">
            {property.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                <CheckCircleIcon className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                <span className="truncate">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={openWhatsApp}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.487"/>
            </svg>
            <span>Contact</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-[1.02] text-sm">
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            <span>Details</span>
          </button>
        </div>
      </div>

      {/* Subtle Border Animation */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-colors duration-300 pointer-events-none" />
    </div>
  );
}