import FooterContent from './FooterContent';
import FooterLinks from './FooterLinks';
import FooterSocial from './FooterSocial';
import FooterBottom from './FooterBottom';

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/90"></div>
      
      {/* Footer Content */}
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <FooterContent />
            
            {/* Quick Links */}
            <FooterLinks />
            
            {/* Services */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Our Services</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                    Property Acquisition
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                    Airbnb Setup & Optimization
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                    Guest Management
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                    Property Maintenance
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact & Social */}
            <FooterSocial />
          </div>
        </div>
        
        {/* Bottom Footer */}
        <FooterBottom />
      </div>
    </footer>
  );
}