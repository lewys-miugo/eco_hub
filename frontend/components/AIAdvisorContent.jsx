export default function AIAdvisorContent() {
  return (
    <div className="space-y-8">
      {/* Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carbon Saved Card */}
        <div className="bg-blue-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Carbon Saved</h3>
          <p className="text-3xl font-bold text-gray-800">2,847Kg</p>
        </div>

        {/* Energy Generated Card */}
        <div className="bg-blue-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Energy Generated</h3>
          <p className="text-3xl font-bold text-gray-800">2,847Kg</p>
        </div>

        {/* Cost Saving Card */}
        <div className="bg-blue-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Cost saving</h3>
          <p className="text-3xl font-bold text-gray-800">2,847Kg</p>
        </div>
      </div>

      {/* Information Box */}
      <div className="bg-blue-100 rounded-lg p-6">
        <p className="text-gray-800">
          High solar efficiency expected for the next 3 days. Optimal conditions for the energy generation based on Open-metro weather data
        </p>
      </div>
    </div>
  );
}
