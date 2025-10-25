export default function EnergyInsightContent() {
  const energyProjects = [
    {
      id: 1,
      title: "Join a Community Energy Project",
      description: "AI-recommended: Invest in a local renewable energy project and earn 8-12% returns while supporting your community! 🌱",
      buttonText: "Find Projects",
      image: "🌱",
      carbonImpact: "2,500 kg CO₂ saved/year",
      savings: "$300-500/year",
      emojis: ["🌱", "🏘️", "💰", "🌍"]
    },
    {
      id: 2,
      title: "Switch to Solar Power",
      description: "AI Analysis: Based on your energy usage, switching to solar can save you up to $500 per year with 6-year payback! ☀️",
      buttonText: "Explore Solar Options",
      image: "☀️",
      carbonImpact: "3,200 kg CO₂ saved/year",
      savings: "$400-600/year",
      emojis: ["☀️", "⚡", "💚", "🏠"]
    },
    {
      id: 3,
      title: "Optimize Your Energy Usage",
      description: "AI Insights: Get personalized tips on reducing your energy consumption by 25% and maximizing efficiency! 💡",
      buttonText: "Get Tips",
      image: "💡",
      carbonImpact: "800 kg CO₂ saved/year",
      savings: "$150-250/year",
      emojis: ["💡", "🔧", "📊", "⚡"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Energy Insights Header */}
      <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          AI Energy Insights 
          <span className="ml-2 text-2xl">🤖</span>
        </h2>
        <p className="text-gray-600">
          Personalized recommendations based on your energy profile and local data! 📊
        </p>
      </div>

      {energyProjects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between">
            {/* Left Side - Content */}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold text-gray-800 mr-2">{project.title}</h3>
                <div className="flex">
                  {project.emojis.map((emoji, index) => (
                    <span key={index} className="text-lg mr-1">{emoji}</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              {/* Impact Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center text-green-600">
                  <span className="mr-1">🌱</span>
                  <span className="font-medium">{project.carbonImpact}</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <span className="mr-1">💰</span>
                  <span className="font-medium">{project.savings}</span>
                </div>
              </div>
              
              <button className="bg-[#D4AF37] text-[#1A202C] px-6 py-2 rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
                {project.buttonText}
              </button>
            </div>

            {/* Right Side - Image */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center text-4xl ml-6">
              {project.image}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
