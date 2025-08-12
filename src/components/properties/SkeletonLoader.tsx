'use client';

interface SkeletonLoaderProps {
  variant?: 'card' | 'list' | 'details';
  count?: number;
}

export default function SkeletonLoader({ variant = 'card', count = 1 }: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count }, (_, index) => index);

  if (variant === 'card') {
    return (
      <>
        {skeletons.map((index) => (
          <div 
            key={index} 
            className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 animate-pulse"
          >
            {/* Image Skeleton */}
            <div className="h-56 bg-gradient-to-br from-white/10 to-white/30 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            </div>
            
            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              {/* Title and Location */}
              <div className="space-y-3">
                <div className="h-6 bg-white/20 rounded-lg animate-pulse" style={{ width: '80%' }}></div>
                <div className="h-4 bg-white/15 rounded animate-pulse" style={{ width: '60%' }}></div>
              </div>
              
              {/* Description Lines */}
              <div className="space-y-2">
                <div className="h-3 bg-white/15 rounded animate-pulse"></div>
                <div className="h-3 bg-white/15 rounded animate-pulse" style={{ width: '85%' }}></div>
                <div className="h-3 bg-white/15 rounded animate-pulse" style={{ width: '70%' }}></div>
              </div>
              
              {/* Features Grid */}
              <div className="pt-2">
                <div className="h-4 bg-white/20 rounded mb-3 animate-pulse" style={{ width: '40%' }}></div>
                <div className="grid grid-cols-2 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 bg-white/15 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
              
              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="h-12 bg-white/20 rounded-xl animate-pulse"></div>
                <div className="h-12 bg-white/15 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (variant === 'list') {
    return (
      <>
        {skeletons.map((index) => (
          <div 
            key={index} 
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-pulse"
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-32 h-24 bg-white/20 rounded-lg flex-shrink-0 animate-pulse"></div>
              
              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-white/20 rounded animate-pulse" style={{ width: '70%' }}></div>
                <div className="h-4 bg-white/15 rounded animate-pulse" style={{ width: '50%' }}></div>
                <div className="flex gap-4">
                  <div className="h-3 bg-white/15 rounded animate-pulse w-16"></div>
                  <div className="h-3 bg-white/15 rounded animate-pulse w-16"></div>
                  <div className="h-3 bg-white/15 rounded animate-pulse w-20"></div>
                </div>
              </div>
              
              {/* Price */}
              <div className="text-right space-y-2">
                <div className="h-6 bg-white/20 rounded animate-pulse w-24"></div>
                <div className="h-8 bg-white/15 rounded animate-pulse w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (variant === 'details') {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 animate-pulse">
        {/* Header */}
        <div className="h-32 bg-gradient-to-r from-white/20 to-white/30 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        </div>
        
        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Title Section */}
          <div className="space-y-3">
            <div className="h-8 bg-white/20 rounded animate-pulse" style={{ width: '60%' }}></div>
            <div className="h-5 bg-white/15 rounded animate-pulse" style={{ width: '80%' }}></div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-8 bg-white/20 rounded animate-pulse"></div>
                <div className="h-4 bg-white/15 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-white/15 rounded animate-pulse"></div>
            <div className="h-4 bg-white/15 rounded animate-pulse" style={{ width: '90%' }}></div>
            <div className="h-4 bg-white/15 rounded animate-pulse" style={{ width: '75%' }}></div>
          </div>
          
          {/* Features */}
          <div className="space-y-3">
            <div className="h-5 bg-white/20 rounded animate-pulse" style={{ width: '40%' }}></div>
            <div className="grid grid-cols-2 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-white/15 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <div className="h-12 bg-white/20 rounded-xl animate-pulse flex-1"></div>
            <div className="h-12 bg-white/15 rounded-xl animate-pulse flex-1"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Shimmer animation component for more realistic loading
export function ShimmerEffect() {
  return (
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
  );
}
