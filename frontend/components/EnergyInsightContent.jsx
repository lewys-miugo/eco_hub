export default function EnergyInsightContent() {
  const energyProjects = [
    {
      id: 1,
      title: "Join a Community Energy Project",
      description: "Invest in a local renewable energy project and earn returns while supporting your community.",
      buttonText: "Find Projects",
      image: "🌱" // Placeholder for solar panels image
    },
    {
      id: 2,
      title: "Switch to Solar Power",
      description: "Based on your energy usage, switching to solar can save you up to $500 per year.",
      buttonText: "Explore Solar Options",
      image: "☀️" // Placeholder for solar panels image
    },
    {
      id: 3,
      title: "Optimize Your Energy Usage",
      description: "Get tips on reducing your energy consumption and maximizing efficiency in your home.",
      buttonText: "Get Tips",
      image: "💡" // Placeholder for energy saving bulb image
    }
  ];

  return (
    <div className="space-y-8">
      {energyProjects.map((project) => (
        <div key={project.id} className="bg-blue-100 rounded-lg p-6 flex items-center justify-between">
          {/* Left Side - Content */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <button className="bg-[#D4AF37] text-[#1A202C] px-6 py-2 rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
              {project.buttonText}
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center text-4xl ml-6">
            {project.image}
          </div>
        </div>
      ))}
    </div>
  );
}
