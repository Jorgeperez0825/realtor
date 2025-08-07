import ServiceCard from './ServiceCard';
import SectionTitle from './SectionTitle';

const services = [
  {
    title: "Property Sales",
    description: "Expert guidance in acquiring prime Orlando properties with high Airbnb potential.",
    features: [
      "Market analysis & selection",
      "Investment ROI projections",
      "Financing assistance"
    ],
    gradient: "from-blue-500 to-purple-600"
  },
  {
    title: "Airbnb Setup",
    description: "Complete property transformation and listing optimization for maximum bookings.",
    features: [
      "Professional staging & photos",
      "Listing optimization",
      "Pricing strategy setup"
    ],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Guest Management",
    description: "24/7 guest communication and booking management for seamless experiences.",
    features: [
      "Automated guest messaging",
      "Check-in/out coordination",
      "Review management"
    ],
    gradient: "from-blue-600 to-purple-500"
  },
  {
    title: "Property Care",
    description: "Comprehensive maintenance and cleaning services to keep properties guest-ready.",
    features: [
      "Professional cleaning service",
      "Maintenance coordination",
      "Quality inspections"
    ],
    gradient: "from-purple-600 to-pink-600"
  }
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <SectionTitle />
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}