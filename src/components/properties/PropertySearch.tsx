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
  TruckIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { zillowAPI, ZillowProperty } from '@/lib/zillow-api';
import PropertyResults from './PropertyResults';

interface SearchFilters {
  location: string;
  listingType: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minSquareFeet: string;
  maxSquareFeet: string;
  minLotSize: string;
  maxLotSize: string;
  minYearBuilt: string;
  maxYearBuilt: string;
  sortBy: string;
  
  // Amenities
  hasPool: boolean;
  hasAirConditioning: boolean;
  onWaterfront: boolean;
  hasParking: boolean;
  hasLaundry: boolean;
  
  // Pet Policy
  allowsCats: boolean;
  allowsSmallDogs: boolean;
  allowsLargeDogs: boolean;
  
  // Views
  hasView: string;
  
  // Rental specific
  availableFrom: string;
}

interface PropertySearchProps {
  onSearchStateChange?: (hasSearched: boolean) => void;
  resetTrigger?: boolean;
}

export default function PropertySearch({ onSearchStateChange, resetTrigger }: PropertySearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
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
      handleReset();
    }
  }, [resetTrigger]);

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

      const searchParams = {
        location: filters.location || 'Orlando, FL',
        listingType: filters.listingType || undefined,
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
        sortBy: filters.sortBy || undefined,
        
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
        hasView: filters.hasView || undefined,
        
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
      {/* Main Search Bar */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-6 shadow-2xl border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Location Search */}
          <div className="relative">
            <label className="block text-sm font-medium text-white/80 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Orlando, FL"
                value={filters.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Listing Type */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Listing Type
            </label>
            <div className="relative">
              <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filters.listingType}
                onChange={(e) => handleInputChange('listingType', e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
              >
                {listingTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Property Type
            </label>
            <div className="relative">
              <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filters.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Price Range
            </label>
            <div className="relative">
              <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filters.minPrice}
                onChange={(e) => handleInputChange('minPrice', e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              Search
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

      {/* Quick Search Tags */}
      <div className="flex flex-wrap gap-3 justify-center">
        <span className="text-white/60 text-sm font-medium">Popular searches:</span>
        {['Orlando Downtown', 'Luxury Condos', 'Family Homes', 'Investment Properties', 'Waterfront'].map((tag) => (
          <button
            key={tag}
            onClick={() => handleQuickSearch(tag)}
            className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm hover:bg-white/20 transition-all duration-200 border border-white/20"
          >
            {tag}
          </button>
        ))}
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
