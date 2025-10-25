export default function ListGeneratorContent() {
  const energyListings = [
    {
      id: 1,
      energyType: "Solar",
      pricePerKwh: "22 KES",
      availableKwh: "8.5",
      image: "sun",
      title: "Premium Solar Energy - Clean & Reliable",
      description: "AI-generated listing: High-efficiency solar panels with 25-year warranty. Perfect for eco-conscious buyers!",
      carbonSaved: "1,200 kg CO₂/month",
      rating: 4.9,
      icons: ["sun", "leaf", "zap", "heart", "star"]
    },
    {
      id: 2,
      energyType: "Wind", 
      pricePerKwh: "18 KES",
      availableKwh: "12.3",
      image: "wind",
      title: "Wind Power - Sustainable & Affordable",
      description: "AI-generated listing: Clean wind energy from local turbines. Great for reducing carbon footprint!",
      carbonSaved: "950 kg CO₂/month",
      rating: 4.7,
      icons: ["wind", "globe", "zap", "heart", "droplet"]
    },
    {
      id: 3,
      energyType: "Hydro",
      pricePerKwh: "15 KES",
      availableKwh: "15.8",
      image: "droplet",
      title: "Hydroelectric Power - Natural & Clean",
      description: "AI-generated listing: Sustainable hydroelectric energy. Consistent supply with minimal environmental impact!",
      carbonSaved: "1,500 kg CO₂/month",
      rating: 4.8,
      icons: ["droplet", "zap", "zap", "globe", "heart"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI List Generator Header */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          AI List Generator 
          <svg className="ml-2 w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </h2>
        <p className="text-gray-600">
          AI-generated energy listings optimized for maximum appeal and environmental impact!
        </p>
      </div>

      {energyListings.map((listing, index) => (
        <div key={listing.id} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between">
            {/* Left Side - Image and Icons */}
            <div className="flex items-start">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center mr-4">
                {listing.image === 'sun' && (
                  <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                {listing.image === 'wind' && (
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
                {listing.image === 'droplet' && (
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                )}
              </div>
              
              {/* Center - Energy Details */}
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-bold text-gray-800 mr-2">{listing.title}</h3>
                  <div className="flex">
                    {listing.icons.map((icon, iconIndex) => (
                      <div key={iconIndex} className="w-4 h-4 mr-1 text-gray-500">
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
                        {icon === 'globe' && (
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
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
                
                <p className="text-sm text-gray-600 mb-3">{listing.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 mr-2">Energy Type:</span>
                    <span className="text-sm font-bold text-gray-800">{listing.energyType}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 mr-2">Price per kWh:</span>
                    <span className="text-sm font-bold text-gray-800">{listing.pricePerKwh}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600 mr-2">Available kWh:</span>
                    <span className="text-sm font-bold text-gray-800">{listing.availableKwh}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75S7 14 17 8z"/>
                    </svg>
                    <span className="text-sm font-medium mr-2">CO₂ Saved:</span>
                    <span className="text-sm font-bold">{listing.carbonSaved}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Rating and Button */}
            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-1">Rating:</span>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-yellow-600 mr-1">{listing.rating}</span>
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <button className="bg-[#D4AF37] text-[#1A202C] px-6 py-2 rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
                More
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
