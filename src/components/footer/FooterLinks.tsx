export default function FooterLinks() {
  return (
    <div>
      <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
      <ul className="space-y-3">
        <li>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
            Buy/Sell
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
            Airbnb Management
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
            Your Portfolio
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
            Investment Calculator
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
            Market Analysis
          </a>
        </li>
      </ul>
    </div>
  );
}