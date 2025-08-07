import ReviewsCarousel from './ReviewsCarousel';
import SectionTitle from './SectionTitle';

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <SectionTitle />
        
        {/* Reviews Carousel */}
        <ReviewsCarousel />
      </div>
    </section>
  );
}