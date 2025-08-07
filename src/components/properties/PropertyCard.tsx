'use client';

import Image from 'next/image';

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
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Property Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <Image 
          src={property.image} 
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center hidden">
          <div className="text-white text-center">
            <div className="text-4xl mb-2">🏡</div>
            <div className="text-sm">Luxury Property</div>
          </div>
        </div>

      </div>

      {/* Property Details */}
      <div className="p-4">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {property.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-2 flex-shrink-0"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:scale-105 transition-transform duration-300 text-sm">
          Learn More
        </button>
      </div>
    </div>
  );
}