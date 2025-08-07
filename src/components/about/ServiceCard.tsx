interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    features: string[];
    gradient: string;
  };
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <div className="group h-full">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
        {/* Title with gradient accent */}
        <div className="mb-4">
          <div className={`w-12 h-1 bg-gradient-to-r ${service.gradient} rounded-full mb-3`}></div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed flex-grow">
          {service.description}
        </p>

        {/* Features List */}
        <div className="space-y-3 mb-6">
          {service.features.map((feature, featureIndex) => (
            <div 
              key={featureIndex}
              className="flex items-start space-x-3"
            >
              <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full flex-shrink-0 mt-2`}></div>
              <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className={`w-full py-3 px-4 bg-gradient-to-r ${service.gradient} text-white font-medium rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg text-sm mt-auto`}>
          Learn More
        </button>
      </div>
    </div>
  );
}