'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZillowProperty } from '@/lib/zillow-api';
import { HeartIcon, MapPinIcon, HomeIcon, CameraIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import PropertyDetails from './PropertyDetails';

interface PropertyResultsProps {
  properties: ZillowProperty[];
  loading: boolean;
  totalResults: number;
}

export default function PropertyResults({ properties, loading, totalResults }: PropertyResultsProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [selectedProperty, setSelectedProperty] = useState<ZillowProperty | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const toggleFavorite = (zpid: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(zpid)) {
        newFavorites.delete(zpid);
      } else {
        newFavorites.add(zpid);
      }
      return newFavorites;
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatArea = (area: number) => {
    return new Intl.NumberFormat('en-US').format(area);
  };

  const handleImageError = (zpid: string) => {
    setImageErrors(prev => new Set([...prev, zpid]));
  };

  const getPropertyImage = (property: ZillowProperty) => {
    if (imageErrors.has(property.zpid) || !property.photos || property.photos.length === 0) {
      return null;
    }
    return property.photos[0];
  };

  const openPropertyDetails = (property: ZillowProperty) => {
    setSelectedProperty(property);
    setIsDetailsOpen(true);
  };

  const closePropertyDetails = () => {
    setIsDetailsOpen(false);
    setSelectedProperty(null);
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-pulse">
              <div className="bg-white/20 h-48 rounded-xl mb-4"></div>
              <div className="space-y-3">
                <div className="bg-white/20 h-4 rounded w-3/4"></div>
                <div className="bg-white/20 h-4 rounded w-1/2"></div>
                <div className="bg-white/20 h-4 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-8 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
          <HomeIcon className="h-16 w-16 text-white/60 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">No Properties Found</h3>
          <p className="text-white/70">Try adjusting your search criteria to find more properties.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      {/* Results Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-white mb-2">
          {totalResults.toLocaleString()} Properties Found
        </h3>
        <p className="text-white/70">
          Showing {properties.length} of {totalResults} results
        </p>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.zpid}
            className="group bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
          >
            {/* Property Image */}
            <div className="relative h-48 overflow-hidden">
              {getPropertyImage(property) ? (
                <Image
                  src={getPropertyImage(property)!}
                  alt={property.address}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={() => handleImageError(property.zpid)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                  <HomeIcon className="h-16 w-16 text-white/50" />
                  <div className="absolute bottom-2 left-2 right-2 text-center">
                    <span className="text-white/70 text-xs">No image available</span>
                  </div>
                </div>
              )}
              
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(property.zpid)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
              >
                {favorites.has(property.zpid) ? (
                  <HeartSolidIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-white" />
                )}
              </button>

              {/* Photo Count */}
              {property.photoCount > 0 && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                  <CameraIcon className="h-4 w-4 text-white" />
                  <span className="text-white text-sm font-medium">{property.photoCount}</span>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-green-500/80 backdrop-blur-sm">
                <span className="text-white text-xs font-semibold">
                  {property.homeStatus.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-6">
              {/* Price */}
              <div className="mb-3">
                <h4 className="text-2xl font-bold text-white">
                  {formatPrice(property.price)}
                </h4>
              </div>

              {/* Property Info */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <span className="text-white font-semibold">{property.bedrooms}</span>
                  <span className="text-white/70 text-sm">beds</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-white font-semibold">{property.bathrooms}</span>
                  <span className="text-white/70 text-sm">baths</span>
                </div>
                {property.livingArea > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-white font-semibold">{formatArea(property.livingArea)}</span>
                    <span className="text-white/70 text-sm">sqft</span>
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 mb-3">
                <MapPinIcon className="h-4 w-4 text-white/60 mt-1 flex-shrink-0" />
                <p className="text-white/80 text-sm leading-relaxed">
                  {property.address}
                </p>
              </div>

              {/* Property Type & Year */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">{property.propertyType}</span>
                {property.yearBuilt && (
                  <span className="text-white/70">Built {property.yearBuilt}</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button 
                  onClick={() => openPropertyDetails(property)}
                  className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm text-sm"
                >
                  View Details
                </button>
                <button 
                  onClick={() => {
                    const message = `Hi! I'm interested in this property: ${property.address} - ${formatPrice(property.price)}. Can you provide more information?`;
                    const whatsappUrl = `https://wa.me/17864685161?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="bg-gradient-to-r from-green-600/80 to-green-700/80 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm text-sm flex items-center justify-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.487"/>
                  </svg>
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button (if there are more results) */}
      {properties.length < totalResults && (
        <div className="text-center mt-8">
          <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20">
            Load More Properties
          </button>
        </div>
      )}

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          isOpen={isDetailsOpen}
          onClose={closePropertyDetails}
        />
      )}
    </div>
  );
}
