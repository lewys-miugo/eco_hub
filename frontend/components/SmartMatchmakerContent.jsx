export default function SmartMatchmakerContent() {
  const solutionProviders = [
    {
      id: 1,
      name: "SunPower Solutions",
      distance: "20Km",
      matchPercentage: "94%",
      icon: "☀️",
      hasSpecialIcon: true
    },
    {
      id: 2,
      name: "GreenHouse Energy",
      distance: "15Km", 
      matchPercentage: "98%",
      icon: "🏠",
      hasSpecialIcon: false
    },
    {
      id: 3,
      name: "windTech Installations",
      distance: "25Km",
      matchPercentage: "87%",
      icon: "🌪️",
      hasSpecialIcon: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Solution Provider Cards */}
      {solutionProviders.map((provider) => (
        <div key={provider.id} className="bg-blue-100 rounded-lg p-6 flex items-center justify-between">
          {/* Left Side - Icon */}
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl mr-4">
              {provider.icon}
            </div>
            
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-800">{provider.name}</h3>
              <div className="flex items-center text-gray-600">
                <span className="text-sm">📍 {provider.distance}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Match Percentage */}
          <div className="bg-[#D4AF37] text-[#1A202C] px-4 py-2 rounded-lg font-bold">
            {provider.matchPercentage} Match
          </div>
        </div>
      ))}
    </div>
  );
}
