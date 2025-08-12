'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ZillowProperty, zillowAPI } from '@/lib/zillow-api';
import { 
  XMarkIcon,
  MapPinIcon, 
  HomeIcon, 
  CalendarDaysIcon,
  BuildingOfficeIcon,
  SwatchIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface PropertyDetailsProps {
  property: ZillowProperty;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyDetails({ property, isOpen, onClose }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [detailedProperty, setDetailedProperty] = useState<ZillowProperty>(property);
  const [, setLoading] = useState(false);

  // Fetch additional details when modal opens
  useEffect(() => {
    if (isOpen && property.zpid) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const details = await zillowAPI.getPropertyDetails(property.zpid);
          if (details) {
            setDetailedProperty(details);
          }
        } catch (error) {
          console.error('Error fetching property details:', error);
        } finally {
          setLoading(false);
        }
      };

      // Only fetch if we don't have enough details already
      if (!property.priceHistory || property.priceHistory.length === 0) {
        fetchDetails();
      }
    }
  }, [isOpen, property.zpid, property.priceHistory]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentImageIndex(0);
      setDetailedProperty(property);
    }
  }, [isOpen, property]);

  if (!isOpen) return null;

  const displayProperty = detailedProperty;

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

  const nextImage = () => {
    if (displayProperty.photos.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % displayProperty.photos.length);
    }
  };

  const prevImage = () => {
    if (displayProperty.photos.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + displayProperty.photos.length) % displayProperty.photos.length);
    }
  };

  const propertyFeatures = [
    { icon: HomeIcon, label: 'Property Type', value: displayProperty.propertyType },
    { icon: CalendarDaysIcon, label: 'Year Built', value: displayProperty.yearBuilt || 'N/A' },
    { icon: BuildingOfficeIcon, label: 'Living Area', value: displayProperty.livingArea ? `${formatArea(displayProperty.livingArea)} sq ft` : 'N/A' },
    { icon: SwatchIcon, label: 'Lot Size', value: displayProperty.lotSize ? `${formatArea(displayProperty.lotSize)} sq ft` : 'N/A' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white relative">
            <div className="flex items-center justify-between">
                          <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">{formatPrice(displayProperty.price)}</h1>
              <div className="flex items-center gap-2 text-blue-100">
                <MapPinIcon className="h-4 w-4" />
                <span>
                  {typeof displayProperty.address === 'string' 
                    ? displayProperty.address 
                    : `${displayProperty.address?.streetAddress || ''}, ${displayProperty.address?.city || ''}, ${displayProperty.address?.state || ''} ${displayProperty.address?.zipcode || ''}`
                  }
                </span>
              </div>
            </div>
              
              <div className="flex items-center gap-3">
                {/* Favorite Button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-400" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                </button>

                {/* Share Button */}
                <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                  <ShareIcon className="h-6 w-6" />
                </button>

                {/* Print Button */}
                <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                  <PrinterIcon className="h-6 w-6" />
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            
            {/* Left Column - Images and Gallery */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Main Image Gallery */}
              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                  {displayProperty.photos && displayProperty.photos.length > 0 ? (
                    <Image
                      src={displayProperty.photos[currentImageIndex]}
                      alt={`Property ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <HomeIcon className="h-24 w-24 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Navigation Arrows */}
                  {displayProperty.photos && displayProperty.photos.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeftIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                    {currentImageIndex + 1} / {displayProperty.photos?.length || 1}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {displayProperty.photos && displayProperty.photos.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {displayProperty.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex 
                            ? 'border-blue-500' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={photo}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Description */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  Beautiful {displayProperty.propertyType.toLowerCase()} located in the heart of {displayProperty.city}. 
                  This {displayProperty.bedrooms}-bedroom, {displayProperty.bathrooms}-bathroom property offers 
                  {displayProperty.livingArea ? ` ${formatArea(displayProperty.livingArea)} square feet` : ''} of comfortable living space
                  {displayProperty.yearBuilt ? ` and was built in ${displayProperty.yearBuilt}` : ''}.
                  {displayProperty.lotSize ? ` The property sits on a ${formatArea(displayProperty.lotSize)} square foot lot.` : ''}
                  Perfect for families or investors looking for a prime location with easy access to local amenities, 
                  schools, and transportation.
                </p>
              </div>
            </div>

            {/* Right Column - Property Details */}
            <div className="space-y-6">
              
              {/* Quick Stats */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{displayProperty.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{displayProperty.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  {displayProperty.livingArea > 0 && (
                    <div className="text-center p-4 bg-green-50 rounded-lg col-span-2">
                      <div className="text-2xl font-bold text-green-600">{formatArea(displayProperty.livingArea)}</div>
                      <div className="text-sm text-gray-600">Square Feet</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Property Features */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Features</h3>
                <div className="space-y-3">
                  {propertyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <feature.icon className="h-5 w-5 text-gray-500" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{feature.label}</div>
                        <div className="text-sm text-gray-600">{feature.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Address</div>
                      <div className="text-sm text-gray-600">
                        {typeof displayProperty.address === 'string' 
                          ? displayProperty.address 
                          : `${displayProperty.address?.streetAddress || ''}, ${displayProperty.address?.city || ''}, ${displayProperty.address?.state || ''} ${displayProperty.address?.zipcode || ''}`
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BuildingOfficeIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">City, State</div>
                      <div className="text-sm text-gray-600">{displayProperty.city}, {displayProperty.state}</div>
                    </div>
                  </div>
                  {displayProperty.zipcode && (
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">ZIP Code</div>
                        <div className="text-sm text-gray-600">{displayProperty.zipcode}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price History */}
              {displayProperty.priceHistory && displayProperty.priceHistory.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price History</h3>
                  <div className="space-y-3">
                    {displayProperty.priceHistory.slice(0, 3).map((history, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{history.event}</div>
                          <div className="text-sm text-gray-600">{history.date}</div>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {formatPrice(history.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact/Action Buttons */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested?</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      const address = typeof displayProperty.address === 'string' 
                        ? displayProperty.address 
                        : `${displayProperty.address?.streetAddress || ''}, ${displayProperty.address?.city || ''}, ${displayProperty.address?.state || ''}`;
                      const message = `Hi! I'm interested in this property: ${address} - ${formatPrice(displayProperty.price)}. Can you provide more information?`;
                      const whatsappUrl = `https://wa.me/17864685161?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.487"/>
                    </svg>
                    Contact via WhatsApp
                  </button>
                  <button 
                    onClick={() => {
                      const address = typeof displayProperty.address === 'string' 
                        ? displayProperty.address 
                        : `${displayProperty.address?.streetAddress || ''}, ${displayProperty.address?.city || ''}, ${displayProperty.address?.state || ''}`;
                      const message = `Hi! I'd like to schedule a tour for this property: ${address} - ${formatPrice(displayProperty.price)}. When would be a good time?`;
                      const whatsappUrl = `https://wa.me/17864685161?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 9l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Schedule Tour
                  </button>
                  <button 
                    onClick={() => {
                      const address = typeof displayProperty.address === 'string' 
                        ? displayProperty.address 
                        : `${displayProperty.address?.streetAddress || ''}, ${displayProperty.address?.city || ''}, ${displayProperty.address?.state || ''}`;
                      const message = `Hi! I'm interested in getting mortgage information for this property: ${address} - ${formatPrice(displayProperty.price)}. Can you help me with financing options?`;
                      const whatsappUrl = `https://wa.me/17864685161?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Get Mortgage Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
