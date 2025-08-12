'use client';

export default function FooterLinks() {
  const scrollToExploreProperties = () => {
    if (typeof window !== 'undefined') {
      const exploreSection = document.querySelector('[data-section="explore-properties"]');
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openWhatsApp = (message: string) => {
    if (typeof window !== 'undefined') {
      const whatsappUrl = `https://wa.me/17864685161?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
      <ul className="space-y-3">
        <li>
          <button 
            onClick={scrollToExploreProperties}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm text-left"
          >
            Buy/Rent
          </button>
        </li>
        <li>
          <button 
            onClick={() => openWhatsApp('Hi! I\'m interested in Airbnb management services. Can you provide more information?')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm text-left"
          >
            Airbnb Management
          </button>
        </li>
        <li>
          <button 
            onClick={() => openWhatsApp('Hi! I\'m interested in using your investment calculator. Can you help me analyze potential properties?')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm text-left"
          >
            Investment Calculator
          </button>
        </li>
        <li>
          <button 
            onClick={() => openWhatsApp('Hi! I\'d like to get a market analysis for Orlando real estate. Can you help me?')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm text-left"
          >
            Market Analysis
          </button>
        </li>
      </ul>
    </div>
  );
}