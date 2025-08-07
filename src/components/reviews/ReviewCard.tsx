interface ReviewCardProps {
  review: {
    id: number;
    name: string;
    location: string;
    rating: number;
    text: string;
    propertyType: string;
    investment: string;
    roi: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white/20 dark:border-gray-700/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
        {/* Quote Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>
        </div>

        {/* Review Text */}
        <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-8 text-center font-light italic">
          &ldquo;{review.text}&rdquo;
        </blockquote>

        {/* Rating */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-1">
            {renderStars(review.rating)}
          </div>
        </div>

        {/* Reviewer Info */}
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {review.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 font-light">
            {review.location}
          </p>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-600/30">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Property Type</p>
              <p className="font-semibold text-gray-900 dark:text-white">{review.propertyType}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Investment</p>
              <p className="font-semibold text-gray-900 dark:text-white">{review.investment}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">ROI</p>
              <p className="font-semibold text-green-600 dark:text-green-400">{review.roi}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}