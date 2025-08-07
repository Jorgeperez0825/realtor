import VideoBackground from './VideoBackground';
import HeroTitle from './HeroTitle';
import HeroSubtitle from './HeroSubtitle';
import FeatureTags from './FeatureTags';
import CTAButtons from './CTAButtons';
import Stats from './Stats';
import ScrollIndicator from './ScrollIndicator';
import ReviewsCarousel from './ReviewsCarousel';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background Component */}
      <VideoBackground />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-40 pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <div className="mb-16">
            {/* Main Heading Component */}
            <HeroTitle />

            {/* Subtitle Component */}
            <HeroSubtitle />

            {/* Feature Tags Component */}
            <FeatureTags />

            {/* CTA Buttons Component */}
            <div className="mt-8">
              <CTAButtons />
            </div>

            {/* Stats Component */}
            <Stats />
          </div>
        </div>

        {/* Scroll Indicator Component */}
        <ScrollIndicator />
      </div>

      {/* Reviews Carousel - Fixed at bottom */}
      <div className="absolute bottom-8 left-0 right-0 z-20 px-6">
        <ReviewsCarousel />
      </div>
    </div>
  );
}