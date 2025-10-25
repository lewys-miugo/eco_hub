export default function SmartMatchmakerContent() {
  const solutionProviders = [
    {
      id: 1,
      name: "SunPower Solutions",
      distance: "20Km",
      matchPercentage: "94%",
      icon: "sun",
      hasSpecialIcon: true,
      description: "AI-recommended solar provider with excellent ratings",
      carbonImpact: "1,200 kg CO₂ saved/month",
      priceRange: "$0.12-0.15/kWh",
      icons: ["sun", "leaf", "zap", "heart"]
    },
    {
      id: 2,
      name: "GreenHouse Energy",
      distance: "15Km", 
      matchPercentage: "98%",
      icon: "home",
      hasSpecialIcon: false,
      description: "Perfect match! Local renewable energy specialist",
      carbonImpact: "1,500 kg CO₂ saved/month",
      priceRange: "$0.10-0.13/kWh",
      icons: ["home", "globe", "heart", "star"]
    },
    {
      id: 3,
      name: "windTech Installations",
      distance: "25Km",
      matchPercentage: "87%",
      icon: "wind",
      hasSpecialIcon: false,
      description: "Wind energy expert with competitive pricing",
      carbonImpact: "950 kg CO₂ saved/month",
      priceRange: "$0.14-0.17/kWh",
      icons: ["wind", "zap", "droplet", "zap"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Matchmaker Header */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          AI Smart Matchmaker 
          <svg className="ml-2 w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </h2>
        <p className="text-gray-600">
          Our AI has analyzed your preferences and found the best renewable energy providers in your area!
        </p>
      </div>

      {/* Solution Provider Cards */}
      {solutionProviders.map((provider) => (
        <div key={provider.id} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between">
            {/* Left Side - Icon and Info */}
            <div className="flex items-start">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center mr-4">
                {provider.icon === 'sun' && (
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                {provider.icon === 'home' && (
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )}
                {provider.icon === 'wind' && (
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              
              {/* Company Info */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{provider.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{provider.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{provider.distance}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span>{provider.priceRange}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75S7 14 17 8z"/>
                    </svg>
                    <span>{provider.carbonImpact}</span>
                  </div>
                  <div className="flex items-center">
                    {provider.icons.map((icon, index) => (
                      <div key={index} className="w-4 h-4 mr-1 text-gray-500">
                        {icon === 'sun' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                        {icon === 'leaf' && (
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75S7 14 17 8z"/>
                          </svg>
                        )}
                        {icon === 'zap' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                        {icon === 'heart' && (
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        )}
                        {icon === 'home' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        )}
                        {icon === 'globe' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        )}
                        {icon === 'star' && (
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        )}
                        {icon === 'wind' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                        {icon === 'droplet' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        )}
                      </div>
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
