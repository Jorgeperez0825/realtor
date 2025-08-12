'use client';

export default function CTAButtons() {
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
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <button 
        onClick={scrollToExploreProperties}
        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
      >
        <span className="relative z-10">Buy/Rent</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
      
      <button 
        onClick={() => openWhatsApp('Hi! I\'m interested in property management services. Can you help me?')}
        className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full text-lg border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105"
      >
        Manage Properties
      </button>
    </div>
  );
}