export default function SectionTitle() {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400">
          Client Reviews
        </span>
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
        Discover what our clients say about their Orlando real estate investment experience
      </p>
      
      {/* Decorative line */}
      <div className="flex justify-center mt-8">
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>
    </div>
  );
}