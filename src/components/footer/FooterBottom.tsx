export default function FooterBottom() {
  return (
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 Dream Properties. All rights reserved.
            </p>
          </div>
          
          {/* Legal Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <p className="text-gray-300 text-xs text-center leading-relaxed">
              <span className="text-white font-medium">Disclaimer:</span> All investment returns are estimates based on historical data. 
              Past performance does not guarantee future results. Please consult with financial advisors before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}