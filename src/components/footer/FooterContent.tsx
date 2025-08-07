export default function FooterContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Dream
        </span>
        <span className="block text-white">
          Properties
        </span>
      </h2>
      <p className="text-gray-300 text-sm leading-relaxed mb-6">
        Transforming Florida's real estate landscape through innovative technology and personalized service excellence for short-term rental investments.
      </p>
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">Available 24/7</span>
        </div>
        <p className="text-gray-300 text-xs mt-2">
          Ready to help with your Florida investment needs
        </p>
      </div>
    </div>
  );
}