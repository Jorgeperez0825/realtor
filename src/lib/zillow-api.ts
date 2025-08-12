// API Configuration - Using environment variables for security
const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'zillow-com1.p.rapidapi.com';

// Validate API key is present
if (!RAPIDAPI_KEY) {
  console.error('❌ RAPIDAPI_KEY is missing from environment variables');
}

export interface ZillowProperty {
  zpid: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  livingArea: number;
  propertyType: string;
  homeStatus: string;
  photoCount: number;
  photos: string[];
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  zipcode: string;
  yearBuilt?: number;
  lotSize?: number;
  priceHistory?: Array<{
    date: string;
    price: number;
    event: string;
  }>;
}

export interface SearchFilters {
  location: string;
  listingType?: 'forSale' | 'forRent' | 'sold';
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minSquareFeet?: number;
  maxSquareFeet?: number;
  minLotSize?: number;
  maxLotSize?: number;
  minYearBuilt?: number;
  maxYearBuilt?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'bedrooms' | 'bathrooms' | 'sqft' | 'lot_size';
  
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
  hasView?: 'mountain' | 'city' | 'water' | 'park' | '';
  
  // Rental specific
  availableFrom?: string; // Date string for rental properties
}

export interface SearchResponse {
  results: ZillowProperty[];
  totalResultCount: number;
  currentPage: number;
  totalPages: number;
}

class ZillowAPI {
  private baseURL = 'https://zillow-com1.p.rapidapi.com';

  private async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    const url = new URL(endpoint, this.baseURL);
    
    // Add parameters to URL
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value.toString());
      }
    });

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    };

    try {
      console.log('🌐 Making request to:', url.toString());
      console.log('🔑 Using API Key:', RAPIDAPI_KEY.substring(0, 10) + '...');
      console.log('📋 Request params:', params);
      
      const response = await fetch(url.toString(), options);
      
      console.log('📊 Response status:', response.status);
      console.log('📊 Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ API Response received, data keys:', Object.keys(data));
      return data;
    } catch (error) {
      console.error('💥 Zillow API Error:', error);
      throw error;
    }
  }

  async searchProperties(filters: SearchFilters): Promise<SearchResponse> {
    const params: Record<string, any> = {
      location: filters.location || 'Orlando, FL',
    };

    // Basic filters - using correct Zillow API parameter names
    if (filters.listingType) {
      // Map our values to Zillow API values
      if (filters.listingType === 'forSale') params.status_type = 'ForSale';
      else if (filters.listingType === 'forRent') params.status_type = 'ForRent';
      else if (filters.listingType === 'sold') params.status_type = 'RecentlySold';
    }
    
    if (filters.minPrice) params.price_min = filters.minPrice;
    if (filters.maxPrice) params.price_max = filters.maxPrice;
    if (filters.bedrooms) params.beds_min = filters.bedrooms;
    if (filters.bathrooms) params.baths_min = filters.bathrooms;
    
    if (filters.propertyType && filters.propertyType !== '') {
      // Map property types to Zillow API values
      const propertyTypeMap: Record<string, string> = {
        'house': 'Houses',
        'condo': 'Condos',
        'townhouse': 'Townhomes',
        'apartment': 'Apartments',
        'multi-family': 'MultiFamily',
        'manufactured': 'Manufactured',
        'lot': 'Lots'
      };
      const mappedType = propertyTypeMap[filters.propertyType.toLowerCase()] || filters.propertyType;
      params.home_type = mappedType;
    }
    
    if (filters.sortBy) params.sort_by = filters.sortBy;

    // Size filters
    if (filters.minSquareFeet) params.sqft_min = filters.minSquareFeet;
    if (filters.maxSquareFeet) params.sqft_max = filters.maxSquareFeet;
    if (filters.minLotSize) params.lot_size_min = filters.minLotSize;
    if (filters.maxLotSize) params.lot_size_max = filters.maxLotSize;
    if (filters.minYearBuilt) params.year_built_min = filters.minYearBuilt;
    if (filters.maxYearBuilt) params.year_built_max = filters.maxYearBuilt;

    // Amenity filters
    if (filters.hasPool) params.has_pool = 'true';
    if (filters.hasAirConditioning) params.has_ac = 'true';
    if (filters.onWaterfront) params.waterfront = 'true';
    if (filters.hasParking) params.parking = 'true';
    if (filters.hasLaundry) params.laundry = 'true';

    // Pet policy filters
    if (filters.allowsCats) params.cats_allowed = 'true';
    if (filters.allowsSmallDogs) params.small_dogs_allowed = 'true';
    if (filters.allowsLargeDogs) params.large_dogs_allowed = 'true';

    // View filters
    if (filters.hasView && filters.hasView !== '') params.view = filters.hasView;

    // Rental specific
    if (filters.availableFrom) params.available_from = filters.availableFrom;

    console.log('🌐 Making Zillow API request with params:', params);
    console.log('📋 Original filters received:', filters);

    try {
      let data;
      
      // Try different endpoints based on what's available in the Zillow API
      try {
        console.log('🔍 Trying /propertyExtendedSearch endpoint...');
        data = await this.makeRequest('/propertyExtendedSearch', params);
      } catch (error) {
        console.log('❌ /propertyExtendedSearch failed, trying /search...');
        try {
          data = await this.makeRequest('/search', params);
        } catch (error2) {
          console.log('❌ /search failed, trying /searchByAddress...');
          data = await this.makeRequest('/searchByAddress', params);
        }
      }
      
      console.log('📡 Raw API response structure:', {
        keys: Object.keys(data),
        hasProps: !!data.props,
        hasResults: !!data.results,
        hasSearchResults: !!data.searchResults,
        hasListResults: !!data.searchResults?.listResults,
        propsLength: data.props?.length || 0,
        resultsLength: data.results?.length || 0,
        listResultsLength: data.searchResults?.listResults?.length || 0
      });
      console.log('📡 Full API response:', data);
      
      // Handle different possible response structures from Zillow API
      let results: any[] = [];
      let totalCount = 0;
      
      if (data.props && Array.isArray(data.props)) {
        results = data.props;
        totalCount = data.totalResultCount || data.props.length;
      } else if (data.results && Array.isArray(data.results)) {
        results = data.results;
        totalCount = data.totalResultCount || data.results.length;
      } else if (data.searchResults && data.searchResults.listResults) {
        results = data.searchResults.listResults;
        totalCount = data.searchResults.totalResultCount || results.length;
      } else if (Array.isArray(data)) {
        results = data;
        totalCount = data.length;
      }
      
      // Transform the response to match our interface
      const response = {
        results: this.transformProperties(results),
        totalResultCount: totalCount,
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || Math.ceil(totalCount / 40) || 1
      };
      
      console.log(`🔄 Transformed response: ${response.results.length} properties found`);
      return response;
    } catch (error) {
      console.error('💥 API Request failed:', error);
      console.error('Error details:', error);
      throw error;
    }
  }

  async getPropertyDetails(zpid: string): Promise<ZillowProperty | null> {
    try {
      const data = await this.makeRequest('/property', { zpid });
      return this.transformProperty(data);
    } catch (error) {
      console.error('Error fetching property details:', error);
      return null;
    }
  }

  private transformProperties(properties: any[]): ZillowProperty[] {
    return properties.map(prop => this.transformProperty(prop)).filter(Boolean) as ZillowProperty[];
  }

  private transformProperty(prop: any): ZillowProperty | null {
    if (!prop) return null;

    // Debug: Log the property data to see what we're getting
    console.log('Raw property data:', prop);

    // Extract photos from various possible locations in the API response
    let photos: string[] = [];
    if (prop.photos && Array.isArray(prop.photos)) {
      photos = prop.photos;
    } else if (prop.imgSrc) {
      photos = [prop.imgSrc];
    } else if (prop.photo) {
      photos = [prop.photo];
    } else if (prop.image) {
      photos = [prop.image];
    } else if (prop.images && Array.isArray(prop.images)) {
      photos = prop.images;
    }

    // Filter out invalid URLs and add protocol if missing
    photos = photos
      .filter(url => url && typeof url === 'string')
      .map(url => {
        if (url.startsWith('//')) {
          return 'https:' + url;
        } else if (!url.startsWith('http')) {
          return 'https://' + url;
        }
        return url;
      });

    console.log('Processed photos:', photos);

    return {
      zpid: prop.zpid?.toString() || Math.random().toString(),
      address: prop.address || prop.streetAddress || 'Address not available',
      price: prop.price || prop.unformattedPrice || prop.rentZestimate || 0,
      bedrooms: prop.bedrooms || prop.beds || 0,
      bathrooms: prop.bathrooms || prop.baths || 0,
      livingArea: prop.livingArea || prop.area || prop.sqft || 0,
      propertyType: prop.propertyType || prop.homeType || prop.propertySubType || 'Unknown',
      homeStatus: prop.homeStatus || prop.statusType || 'FOR_SALE',
      photoCount: photos.length,
      photos: photos,
      latitude: prop.latitude || prop.lat || 0,
      longitude: prop.longitude || prop.lng || 0,
      city: prop.city || '',
      state: prop.state || '',
      zipcode: prop.zipcode || prop.zip || '',
      yearBuilt: prop.yearBuilt,
      lotSize: prop.lotSize,
      priceHistory: prop.priceHistory || []
    };
  }

  // Mock data for development/fallback
  getMockProperties(): ZillowProperty[] {
    return [
      {
        zpid: '1',
        address: '123 Orlando Blvd, Orlando, FL 32801',
        price: 450000,
        bedrooms: 3,
        bathrooms: 2,
        livingArea: 1800,
        propertyType: 'House',
        homeStatus: 'FOR_SALE',
        photoCount: 15,
        photos: [
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=center'
        ],
        latitude: 28.5383,
        longitude: -81.3792,
        city: 'Orlando',
        state: 'FL',
        zipcode: '32801',
        yearBuilt: 2018,
        lotSize: 8000
      },
      {
        zpid: '2',
        address: '456 Lake Mary Dr, Lake Mary, FL 32746',
        price: 650000,
        bedrooms: 4,
        bathrooms: 3,
        livingArea: 2400,
        propertyType: 'House',
        homeStatus: 'FOR_SALE',
        photoCount: 20,
        photos: [
          'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=center'
        ],
        latitude: 28.7589,
        longitude: -81.3178,
        city: 'Lake Mary',
        state: 'FL',
        zipcode: '32746',
        yearBuilt: 2020,
        lotSize: 12000
      },
      {
        zpid: '3',
        address: '789 Winter Park Ave, Winter Park, FL 32789',
        price: 850000,
        bedrooms: 4,
        bathrooms: 4,
        livingArea: 3200,
        propertyType: 'House',
        homeStatus: 'FOR_SALE',
        photoCount: 25,
        photos: [
          'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop&crop=center'
        ],
        latitude: 28.5999,
        longitude: -81.3394,
        city: 'Winter Park',
        state: 'FL',
        zipcode: '32789',
        yearBuilt: 2019,
        lotSize: 15000
      },
      {
        zpid: '4',
        address: '321 Downtown Orlando, Orlando, FL 32801',
        price: 750000,
        bedrooms: 2,
        bathrooms: 2,
        livingArea: 1200,
        propertyType: 'Condo',
        homeStatus: 'FOR_SALE',
        photoCount: 18,
        photos: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&crop=center'
        ],
        latitude: 28.5383,
        longitude: -81.3792,
        city: 'Orlando',
        state: 'FL',
        zipcode: '32801',
        yearBuilt: 2021,
        lotSize: 0
      },
      {
        zpid: '5',
        address: '654 Luxury Lane, Windermere, FL 34786',
        price: 1200000,
        bedrooms: 5,
        bathrooms: 4,
        livingArea: 4500,
        propertyType: 'Villa',
        homeStatus: 'FOR_SALE',
        photoCount: 30,
        photos: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop&crop=center'
        ],
        latitude: 28.4994,
        longitude: -81.5322,
        city: 'Windermere',
        state: 'FL',
        zipcode: '34786',
        yearBuilt: 2022,
        lotSize: 25000
      },
      {
        zpid: '6',
        address: '987 Waterfront Way, Lake Nona, FL 32827',
        price: 950000,
        bedrooms: 4,
        bathrooms: 3,
        livingArea: 3000,
        propertyType: 'House',
        homeStatus: 'FOR_SALE',
        photoCount: 22,
        photos: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&crop=center'
        ],
        latitude: 28.3772,
        longitude: -81.2014,
        city: 'Lake Nona',
        state: 'FL',
        zipcode: '32827',
        yearBuilt: 2020,
        lotSize: 10000
      },
      {
        zpid: '7',
        address: '555 Townhouse Terrace, Celebration, FL 34747',
        price: 580000,
        bedrooms: 3,
        bathrooms: 2.5,
        livingArea: 2100,
        propertyType: 'Townhouse',
        homeStatus: 'FOR_SALE',
        photoCount: 16,
        photos: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop&crop=center'
        ],
        latitude: 28.3248,
        longitude: -81.5320,
        city: 'Celebration',
        state: 'FL',
        zipcode: '34747',
        yearBuilt: 2017,
        lotSize: 3000
      },
      {
        zpid: '8',
        address: '888 Apartment Ave, Orlando, FL 32803',
        price: 320000,
        bedrooms: 1,
        bathrooms: 1,
        livingArea: 850,
        propertyType: 'Apartment',
        homeStatus: 'FOR_SALE',
        photoCount: 12,
        photos: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop&crop=center'
        ],
        latitude: 28.5421,
        longitude: -81.3790,
        city: 'Orlando',
        state: 'FL',
        zipcode: '32803',
        yearBuilt: 2015,
        lotSize: 0
      }
    ];
  }
}

export const zillowAPI = new ZillowAPI();
