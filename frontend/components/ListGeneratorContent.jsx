export default function ListGeneratorContent() {
  const energyListings = [
    {
      id: 1,
      energyType: "Solar",
      pricePerKwh: "22 KES",
      availableKwh: "8.5",
      image: "☀️",
      title: "🌱 Premium Solar Energy - Clean & Reliable",
      description: "AI-generated listing: High-efficiency solar panels with 25-year warranty. Perfect for eco-conscious buyers!",
      carbonSaved: "1,200 kg CO₂/month",
      rating: 4.9,
      emojis: ["☀️", "🌱", "⚡", "💚", "🌟"]
    },
    {
      id: 2,
      energyType: "Wind", 
      pricePerKwh: "18 KES",
      availableKwh: "12.3",
      image: "💨",
      title: "💨 Wind Power - Sustainable & Affordable",
      description: "AI-generated listing: Clean wind energy from local turbines. Great for reducing carbon footprint!",
      carbonSaved: "950 kg CO₂/month",
      rating: 4.7,
      emojis: ["💨", "🌍", "⚡", "💚", "🌊"]
    },
    {
      id: 3,
      energyType: "Hydro",
      pricePerKwh: "15 KES",
      availableKwh: "15.8",
      image: "💧",
      title: "💧 Hydroelectric Power - Natural & Clean",
      description: "AI-generated listing: Sustainable hydroelectric energy. Consistent supply with minimal environmental impact!",
      carbonSaved: "1,500 kg CO₂/month",
      rating: 4.8,
      emojis: ["💧", "🌊", "⚡", "🌍", "💚"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI List Generator Header */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          AI List Generator 
          <span className="ml-2 text-2xl">🤖</span>
        </h2>
        <p className="text-gray-600">
          AI-generated energy listings optimized for maximum appeal and environmental impact! 🌱
        </p>
      </div>

      {energyListings.map((listing, index) => (
        <div key={listing.id} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between">
            {/* Left Side - Image and Emojis */}
            <div className="flex items-start">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center text-3xl mr-4">
                {listing.image}
              </div>
              
              {/* Center - Energy Details */}
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-bold text-gray-800 mr-2">{listing.title}</h3>
                  <div className="flex">
                    {listing.emojis.map((emoji, emojiIndex) => (
                      <span key={emojiIndex} className="text-lg mr-1">{emoji}</span>
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
                    <span className="text-sm font-medium mr-2">🌱 CO₂ Saved:</span>
                    <span className="text-sm font-bold">{listing.carbonSaved}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Rating and Button */}
            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-1">Rating:</span>
                <span className="text-sm font-bold text-yellow-600">{listing.rating} ⭐</span>
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
