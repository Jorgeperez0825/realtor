'use client';

export default function FooterSocial() {
  const openWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const whatsappUrl = `https://wa.me/17864685161?text=${encodeURIComponent('Hi! I found your contact through Dream Properties website. I\'m interested in your real estate services.')}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
      
      {/* Contact Info */}
      <div className="space-y-4 mb-6">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
          <p className="text-gray-300 text-xs mb-1">Email</p>
          <p className="text-white text-sm font-medium">info@getdreamproperties.com</p>
        </div>
        
        <button 
          onClick={openWhatsApp}
          className="w-full bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-left"
        >
          <p className="text-gray-300 text-xs mb-1">Phone / WhatsApp</p>
          <p className="text-white text-sm font-medium">+1 (786) 468-5161</p>
        </button>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
          <p className="text-gray-300 text-xs mb-1">Location</p>
          <p className="text-white text-sm font-medium">Florida, USA</p>
        </div>
      </div>
      
      {/* Social Media */}
      <div>
        <p className="text-gray-300 text-sm mb-3">Follow Us</p>
        <div className="flex space-x-3">
          {/* Facebook */}
          <a href="#" className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          
          {/* Instagram */}
          <a href="#" className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-9.469c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-4.15 1.297c-1.748 0-3.169 1.421-3.169 3.169s1.421 3.169 3.169 3.169 3.169-1.421 3.169-3.169-1.421-3.169-3.169-3.169z"/>
            </svg>
          </a>
          
          {/* TikTok */}
          <a href="#" className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </a>
          
          {/* LinkedIn */}
          <a href="#" className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}