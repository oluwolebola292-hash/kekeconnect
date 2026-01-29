function RiderCard({ rider, onSelect, isSelected }) {
  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
        isSelected 
          ? 'border-blue-600 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {rider.name.charAt(0)}
          </div>
          
          <div>
            <p className="font-semibold text-gray-900">{rider.name}</p>
            <p className="text-sm text-gray-500">{rider.vehicle}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-yellow-600 flex items-center">
                ⭐ {rider.rating}
              </span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">{rider.trips} trips</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-green-600">{rider.distance} km</p>
          <p className="text-xs text-gray-500">{rider.eta} min away</p>
          <div className="mt-2 inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Available
          </div>
        </div>
      </div>
    </button>
  )
}

export default RiderCard