export default function ListGeneratorContent() {
  const energyListings = [
    {
      id: 1,
      energyType: "Solar",
      pricePerKwh: "22 KES",
      availableKwh: "8.5",
      image: "☀️" // Placeholder for solar panels image
    },
    {
      id: 2,
      energyType: "Solar", 
      pricePerKwh: "22 KES",
      availableKwh: "8.5",
      image: "☀️" // Placeholder for solar panels image
    }
  ];

  return (
    <div className="space-y-6">
      {energyListings.map((listing, index) => (
        <div key={listing.id} className="bg-blue-100 rounded-lg p-6 flex items-center justify-between relative">
          {/* Left Side - Image */}
          <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center text-2xl mr-6">
            {listing.image}
          </div>

          {/* Center - Energy Details */}
          <div className="flex-1">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600">Energy Type:</span>
                <span className="ml-2 text-sm font-bold text-gray-800">{listing.energyType}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600">Price per kWh:</span>
                <span className="ml-2 text-sm font-bold text-gray-800">{listing.pricePerKwh}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600">Available kWh:</span>
                <span className="ml-2 text-sm font-bold text-gray-800">{listing.availableKwh}</span>
              </div>
            </div>
          </div>

          {/* Right Side - More Button */}
          <button className="bg-[#D4AF37] text-[#1A202C] px-6 py-2 rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
            More
          </button>

        </div>
      ))}
    </div>
  );
}
