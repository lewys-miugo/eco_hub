export default function SmartMatchmakerContent() {
  const solutionProviders = [
    {
      id: 1,
      name: "SunPower Solutions",
      distance: "20Km",
      matchPercentage: "94%",
      icon: "☀️",
      hasSpecialIcon: true,
      description: "AI-recommended solar provider with excellent ratings 🌱",
      carbonImpact: "1,200 kg CO₂ saved/month",
      priceRange: "$0.12-0.15/kWh",
      emojis: ["☀️", "🌱", "⚡", "💚"]
    },
    {
      id: 2,
      name: "GreenHouse Energy",
      distance: "15Km", 
      matchPercentage: "98%",
      icon: "🏠",
      hasSpecialIcon: false,
      description: "Perfect match! Local renewable energy specialist 🌍",
      carbonImpact: "1,500 kg CO₂ saved/month",
      priceRange: "$0.10-0.13/kWh",
      emojis: ["🏠", "🌍", "💚", "🌟"]
    },
    {
      id: 3,
      name: "windTech Installations",
      distance: "25Km",
      matchPercentage: "87%",
      icon: "🌪️",
      hasSpecialIcon: false,
      description: "Wind energy expert with competitive pricing 💨",
      carbonImpact: "950 kg CO₂ saved/month",
      priceRange: "$0.14-0.17/kWh",
      emojis: ["🌪️", "💨", "🌊", "⚡"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Matchmaker Header */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          AI Smart Matchmaker 
          <span className="ml-2 text-2xl">🤖</span>
        </h2>
        <p className="text-gray-600">
          Our AI has analyzed your preferences and found the best renewable energy providers in your area! 🌱
        </p>
      </div>

      {/* Solution Provider Cards */}
      {solutionProviders.map((provider) => (
        <div key={provider.id} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between">
            {/* Left Side - Icon and Info */}
            <div className="flex items-start">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center text-2xl mr-4">
                {provider.icon}
              </div>
              
              {/* Company Info */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{provider.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{provider.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1">📍</span>
                    <span>{provider.distance}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-1">💰</span>
                    <span>{provider.priceRange}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="mr-1">🌱</span>
                    <span>{provider.carbonImpact}</span>
                  </div>
                  <div className="flex items-center">
                    {provider.emojis.map((emoji, index) => (
                      <span key={index} className="text-lg mr-1">{emoji}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Match Percentage */}
            <div className="bg-[#D4AF37] text-[#1A202C] px-4 py-2 rounded-lg font-bold text-center">
              <div className="text-sm">AI Match</div>
              <div className="text-xl">{provider.matchPercentage}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
