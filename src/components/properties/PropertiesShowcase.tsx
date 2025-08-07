import PropertyCard from './PropertyCard';
import ShowcaseTitle from './ShowcaseTitle';

const services = [
  {
    id: 1,
    title: "Property Acquisition",
    description: "Expert guidance in finding and purchasing prime Orlando investment properties",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&crop=center",
    features: ["Market Analysis", "Investment ROI Projections", "Financing Assistance", "Legal Compliance"]
  },
  {
    id: 2,
    title: "Airbnb Setup & Optimization",
    description: "Complete property transformation and listing optimization for maximum bookings",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center",
    features: ["Professional Photography", "Listing Optimization", "Pricing Strategy", "Interior Design"]
  },
  {
    id: 3,
    title: "Guest Management",
    description: "24/7 guest communication and booking management for seamless experiences",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&crop=center", 
    features: ["Automated Messaging", "Check-in Coordination", "Guest Screening", "Review Management"]
  },
  {
    id: 4,
    title: "Property Maintenance",
    description: "Comprehensive cleaning and maintenance services to keep properties guest-ready",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&crop=center",
    features: ["Professional Cleaning", "Maintenance Coordination", "Emergency Repairs", "Quality Inspections"]
  }
];

export default function PropertiesShowcase() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <ShowcaseTitle />
        
        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service) => (
            <PropertyCard 
              key={service.id}
              property={service}
            />
          ))}
        </div>

        {/* Get Started Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300 hover:shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}