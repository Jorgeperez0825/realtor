'use client';

import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  HomeIcon, 
  CurrencyDollarIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  SwatchIcon,
  HeartIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { zillowAPI, ZillowProperty, SearchFilters } from '@/lib/zillow-api';
import PropertyResults from './PropertyResults';

interface PropertySearchProps {
  onSearchStateChange?: (hasSearched: boolean) => void;
  resetTrigger?: boolean;
}

// Local state interface for form handling (separate from SearchFilters to avoid type conflicts)
interface LocalSearchFilters {
  location: string;
  listingType?: string;
  propertyType?: string;
  bedrooms?: string;
  bathrooms?: string;
  minPrice?: string;
  maxPrice?: string;
  minSquareFeet?: string;
  maxSquareFeet?: string;
  minLotSize?: string;
  maxLotSize?: string;
  minYearBuilt?: string;
  maxYearBuilt?: string;
  sortBy?: string;
  
  // Amenities
  hasPool?: boolean;
  hasAirConditioning?: boolean;
  onWaterfront?: boolean;
  hasParking?: boolean;
  hasLaundry?: boolean;
  
  // Pet Policy
  allowsCats?: boolean;
  allowsSmallDogs?: boolean;
  allowsLargeDogs?: boolean;
  
  // Views
  hasView?: string;
  
  // Rental specific
  availableFrom?: string;
}

export default function PropertySearch({ onSearchStateChange, resetTrigger }: PropertySearchProps) {
  const [filters, setFilters] = useState<LocalSearchFilters>({
    location: '',
    listingType: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    minSquareFeet: '',
    maxSquareFeet: '',
    minLotSize: '',
    maxLotSize: '',
    minYearBuilt: '',
    maxYearBuilt: '',
    sortBy: '',
    
    // Amenities
    hasPool: false,
    hasAirConditioning: false,
    onWaterfront: false,
    hasParking: false,
    hasLaundry: false,
    
    // Pet Policy
    allowsCats: false,
    allowsSmallDogs: false,
    allowsLargeDogs: false,
    
    // Views
    hasView: '',
    
    // Rental specific
    availableFrom: ''
  });

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [properties, setProperties] = useState<ZillowProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle reset trigger from parent component
  useEffect(() => {
    if (resetTrigger) {
      setFilters({
        location: '',
        listingType: '',
        propertyType: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: '',
        minSquareFeet: '',
        maxSquareFeet: '',
        minLotSize: '',
        maxLotSize: '',
        minYearBuilt: '',
        maxYearBuilt: '',
        sortBy: '',
        hasPool: false,
        hasAirConditioning: false,
        onWaterfront: false,
        hasParking: false,
        hasLaundry: false,
        allowsCats: false,
        allowsSmallDogs: false,
        allowsLargeDogs: false,
        hasView: '',
        availableFrom: ''
      });
      setProperties([]);
      setTotalResults(0);
      setHasSearched(false);
      onSearchStateChange?.(false);
    }
  }, [resetTrigger, onSearchStateChange]);

  const listingTypes = [
    { value: '', label: 'All Listings' },
    { value: 'forSale', label: 'For Sale' },
    { value: 'forRent', label: 'For Rent' },
    { value: 'sold', label: 'Recently Sold' }
  ];

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'land', label: 'Land' },
    { value: 'mobile', label: 'Mobile Home' }
  ];

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-200000', label: 'Under $200K' },
    { value: '200000-400000', label: '$200K - $400K' },
    { value: '400000-600000', label: '$400K - $600K' },
    { value: '600000-800000', label: '$600K - $800K' },
    { value: '800000-1000000', label: '$800K - $1M' },
    { value: '1000000-2000000', label: '$1M - $2M' },
    { value: '2000000+', label: '$2M+' }
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' }
  ];

  const squareFeetRanges = [
    { value: '', label: 'Any Size' },
    { value: '0-1000', label: 'Under 1,000 sq ft' },
    { value: '1000-1500', label: '1,000 - 1,500 sq ft' },
    { value: '1500-2000', label: '1,500 - 2,000 sq ft' },
    { value: '2000-3000', label: '2,000 - 3,000 sq ft' },
    { value: '3000-4000', label: '3,000 - 4,000 sq ft' },
    { value: '4000+', label: '4,000+ sq ft' }
  ];

  const lotSizeRanges = [
    { value: '', label: 'Any Lot Size' },
    { value: '0-5000', label: 'Under 5,000 sq ft' },
    { value: '5000-10000', label: '5,000 - 10,000 sq ft' },
    { value: '10000-21780', label: '10,000 sq ft - 0.5 acre' },
    { value: '21780-43560', label: '0.5 - 1 acre' },
    { value: '43560+', label: '1+ acres' }
  ];

  const yearBuiltRanges = [
    { value: '', label: 'Any Year' },
    { value: '2020-2024', label: '2020 - 2024' },
    { value: '2010-2019', label: '2010 - 2019' },
    { value: '2000-2009', label: '2000 - 2009' },
    { value: '1990-1999', label: '1990 - 1999' },
    { value: '1980-1989', label: '1980 - 1989' },
    { value: '0-1979', label: 'Before 1980' }
  ];

  const viewOptions = [
    { value: '', label: 'Any View' },
    { value: 'water', label: 'Water View' },
    { value: 'mountain', label: 'Mountain View' },
    { value: 'city', label: 'City View' },
    { value: 'park', label: 'Park View' }
  ];

  const sortOptions = [
    { value: '', label: 'Best Match' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'sqft', label: 'Square Feet' },
    { value: 'lot_size', label: 'Lot Size' }
  ];

  const handleInputChange = (field: keyof SearchFilters, value: string | boolean) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = async () => {
    if (!filters.location.trim()) {
      // Use default location if none provided
      setFilters(prev => ({ ...prev, location: 'Orlando, FL' }));
    }

    setLoading(true);
    setHasSearched(true);
    
    // Notify parent component about search state change
    onSearchStateChange?.(true);

    try {
      // Parse price ranges
      let minPrice: number | undefined;
      let maxPrice: number | undefined;

      if (filters.minPrice) {
        if (filters.minPrice.includes('-')) {
          const [min, max] = filters.minPrice.split('-').map(p => parseInt(p));
          minPrice = min;
          maxPrice = max;
        } else if (filters.minPrice.includes('+')) {
          minPrice = parseInt(filters.minPrice.replace('+', ''));
        }
      }

      // Parse all filters properly
      let minSquareFeet: number | undefined;
      let maxSquareFeet: number | undefined;
      if (filters.minSquareFeet && filters.minSquareFeet.includes('-')) {
        const [min, max] = filters.minSquareFeet.split('-').map(p => parseInt(p));
        minSquareFeet = min;
        maxSquareFeet = max;
      } else if (filters.minSquareFeet && filters.minSquareFeet.includes('+')) {
        minSquareFeet = parseInt(filters.minSquareFeet.replace('+', ''));
      }

      let minLotSize: number | undefined;
      let maxLotSize: number | undefined;
      if (filters.minLotSize && filters.minLotSize.includes('-')) {
        const [min, max] = filters.minLotSize.split('-').map(p => parseInt(p));
        minLotSize = min;
        maxLotSize = max;
      } else if (filters.minLotSize && filters.minLotSize.includes('+')) {
        minLotSize = parseInt(filters.minLotSize.replace('+', ''));
      }

      let minYearBuilt: number | undefined;
      let maxYearBuilt: number | undefined;
      if (filters.minYearBuilt && filters.minYearBuilt.includes('-')) {
        const [min, max] = filters.minYearBuilt.split('-').map(p => parseInt(p));
        minYearBuilt = min;
        maxYearBuilt = max;
      } else if (filters.minYearBuilt && filters.minYearBuilt.includes('+')) {
        minYearBuilt = parseInt(filters.minYearBuilt.replace('+', ''));
      }

      const searchParams: SearchFilters = {
        location: filters.location || 'Orlando, FL',
        listingType: (filters.listingType === 'forSale' || filters.listingType === 'forRent' || filters.listingType === 'sold') 
          ? filters.listingType 
          : undefined,
        propertyType: filters.propertyType || undefined,
        minPrice,
        maxPrice,
        bedrooms: filters.bedrooms ? parseInt(filters.bedrooms) : undefined,
        bathrooms: filters.bathrooms ? parseInt(filters.bathrooms) : undefined,
        minSquareFeet,
        maxSquareFeet,
        minLotSize,
        maxLotSize,
        minYearBuilt,
        maxYearBuilt,
        sortBy: (filters.sortBy === 'price_asc' || filters.sortBy === 'price_desc' || filters.sortBy === 'newest' || 
                 filters.sortBy === 'bedrooms' || filters.sortBy === 'bathrooms' || filters.sortBy === 'sqft' || 
                 filters.sortBy === 'lot_size') 
          ? filters.sortBy 
          : undefined,
        
        // Amenities
        hasPool: filters.hasPool || undefined,
        hasAirConditioning: filters.hasAirConditioning || undefined,
        onWaterfront: filters.onWaterfront || undefined,
        hasParking: filters.hasParking || undefined,
        hasLaundry: filters.hasLaundry || undefined,
        
        // Pet Policy
        allowsCats: filters.allowsCats || undefined,
        allowsSmallDogs: filters.allowsSmallDogs || undefined,
        allowsLargeDogs: filters.allowsLargeDogs || undefined,
        
        // Views
        hasView: (filters.hasView === 'mountain' || filters.hasView === 'city' || filters.hasView === 'water' || 
                  filters.hasView === 'park') 
          ? filters.hasView 
          : undefined,
        
        // Rental specific
        availableFrom: filters.availableFrom || undefined,
      };

      console.log('Searching with params:', searchParams);

      try {
        console.log('🔍 Calling Zillow API with params:', searchParams);
        const response = await zillowAPI.searchProperties(searchParams);
        console.log('✅ API Response received:', response);
        
        if (response.results && response.results.length > 0) {
          setProperties(response.results);
          setTotalResults(response.totalResultCount);
          console.log(`📊 Found ${response.results.length} properties from API`);
        } else {
          setProperties([]);
          setTotalResults(0);
          console.log('❌ No properties found from API');
        }
      } catch (error) {
        console.error('❌ Zillow API Error:', error);
        setProperties([]);
        setTotalResults(0);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      location: '',
      listingType: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minSquareFeet: '',
      maxSquareFeet: '',
      minLotSize: '',
      maxLotSize: '',
      minYearBuilt: '',
      maxYearBuilt: '',
      sortBy: '',
      
      // Amenities
      hasPool: false,
      hasAirConditioning: false,
      onWaterfront: false,
      hasParking: false,
      hasLaundry: false,
      
      // Pet Policy
      allowsCats: false,
      allowsSmallDogs: false,
      allowsLargeDogs: false,
      
      // Views
      hasView: '',
      
      // Rental specific
      availableFrom: ''
    });
    setProperties([]);
    setTotalResults(0);
    setHasSearched(false);
    
    // Notify parent component about search state change
    onSearchStateChange?.(false);
  };

  const handleQuickSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, location: searchTerm }));
    // Automatically trigger search after setting location
    setTimeout(() => handleSearch(), 100);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Enhanced Main Search Bar */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
          {/* Enhanced Location Search */}
          <div className="relative">
            <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              Location
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter city, neighborhood, or ZIP code"
                value={filters.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 font-medium shadow-sm hover:shadow-md transition-all duration-200"
              />
              {filters.location && (
                <button
                  onClick={() => handleInputChange('location', '')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Listing Type */}
          <div>
            <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <BuildingOfficeIcon className="h-4 w-4" />
              Listing Type
            </label>
            <div className="relative">
              <BuildingOfficeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filters.listingType}
                onChange={(e) => handleInputChange('listingType', e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                {listingTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced Property Type */}
          <div>
            <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Property Type
            </label>
            <div className="relative">
              <HomeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filters.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced Price Range */}
          <div>
            <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <CurrencyDollarIcon className="h-4 w-4" />
              Price Range
            </label>
            <div className="relative">
              <CurrencyDollarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filters.minPrice}
                onChange={(e) => handleInputChange('minPrice', e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced Search Button */}
          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 disabled:scale-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-w-[140px]"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            {isAdvancedOpen ? 'Hide' : 'Show'} Advanced Filters
          </button>
          
          <button
            onClick={handleReset}
            className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            Reset All
          </button>
        </div>

        {/* Advanced Filters */}
        {isAdvancedOpen && (
          <div className="mt-6 pt-6 border-t border-white/20 space-y-6">
            
            {/* Basic Property Details */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <HomeIcon className="h-5 w-5" />
                Property Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
                  >
                    {bedroomOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Bathrooms
                  </label>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
                  >
                    {bedroomOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Square Feet */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Square Feet
                  </label>
                  <select
                    value={filters.minSquareFeet}
                    onChange={(e) => handleInputChange('minSquareFeet', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
                  >
                    {squareFeetRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lot Size */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Lot Size
                  </label>
                  <select
                    value={filters.minLotSize}
                    onChange={(e) => handleInputChange('minLotSize', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
                  >
                    {lotSizeRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Year Built and Sort */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CalendarDaysIcon className="h-5 w-5" />
                Year Built & Sorting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Year Built */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Year Built
                  </label>
                  <select
                    value={filters.minYearBuilt}
                    onChange={(e) => handleInputChange('minYearBuilt', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
                  >
                    {yearBuiltRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleInputChange('sortBy', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <SwatchIcon className="h-5 w-5" />
                Amenities & Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Pool */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasPool}
                    onChange={(e) => handleInputChange('hasPool', e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white/90 text-sm">Pool</span>
                </label>

                {/* Air Conditioning */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasAirConditioning}
                    onChange={(e) => handleInputChange('hasAirConditioning', e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white/90 text-sm">A/C</span>
                </label>

                {/* Waterfront */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.onWaterfront}
                    onChange={(e) => handleInputChange('onWaterfront', e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white/90 text-sm">Waterfront</span>
                </label>

                {/* Parking */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasParking}
                    onChange={(e) => handleInputChange('hasParking', e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white/90 text-sm">Parking</span>
                </label>

                {/* Laundry */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasLaundry}
                    onChange={(e) => handleInputChange('hasLaundry', e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white/90 text-sm">Laundry</span>
                </label>
              </div>
            </div>

            {/* Pet Policy */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <HeartIcon className="h-5 w-5" />
                Pet Policy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Cats */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.allowsCats}
                    onChange={(e) => handleInputChange('allowsCats', e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white/90">Cats Allowed</span>
                </label>

                {/* Small Dogs */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.allowsSmallDogs}
                    onChange={(e) => handleInputChange('allowsSmallDogs', e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white/90">Small Dogs</span>
                </label>

                {/* Large Dogs */}
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.allowsLargeDogs}
                    onChange={(e) => handleInputChange('allowsLargeDogs', e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-white/90">Large Dogs</span>
                </label>
              </div>
            </div>

            {/* Views & Availability */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <EyeIcon className="h-5 w-5" />
                Views & Availability
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Views */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Property View
                  </label>
                  <select
                    value={filters.hasView}
                    onChange={(e) => handleInputChange('hasView', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
                  >
                    {viewOptions.map((view) => (
                      <option key={view.value} value={view.value}>
                        {view.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Available From (for rentals) */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Available From
                  </label>
                  <input
                    type="date"
                    value={filters.availableFrom}
                    onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Enhanced Quick Search Tags */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="text-center mb-4">
          <span className="text-white/70 text-sm font-semibold">Popular Searches</span>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { label: 'Orlando Downtown', icon: '🏙️' },
            { label: 'Luxury Condos', icon: '✨' },
            { label: 'Family Homes', icon: '🏡' },
            { label: 'Investment Properties', icon: '💰' },
            { label: 'Waterfront', icon: '🌊' },
            { label: 'New Construction', icon: '🔨' }
          ].map((tag) => (
            <button
              key={tag.label}
              onClick={() => handleQuickSearch(tag.label)}
              className="group flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/30 hover:scale-105 shadow-sm hover:shadow-md"
            >
              <span className="group-hover:scale-110 transition-transform duration-200">{tag.icon}</span>
              <span>{tag.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Property Results */}
      {hasSearched && (
        <PropertyResults 
          properties={properties}
          loading={loading}
          totalResults={totalResults}
        />
      )}
    </div>
  );
}
