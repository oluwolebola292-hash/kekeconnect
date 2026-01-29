import { useState } from 'react'

function RideRequest({ rider, onRequest, onCancel }) {
  const [destination, setDestination] = useState('')
  const [estimatedDistance, setEstimatedDistance] = useState(2.5)

  const handleSubmit = (e) => {
    e.preventDefault()
    onRequest(rider, {
      address: destination,
      distance: estimatedDistance
    })
  }

  const baseFare = 100
  const perKm = 50
  const estimatedFare = baseFare + (estimatedDistance * perKm)

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Request Ride</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {rider.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{rider.name}</p>
          <p className="text-sm text-gray-500">{rider.vehicle} • ⭐ {rider.rating}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Where are you going?
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination address"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Distance: {estimatedDistance} km
          </label>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={estimatedDistance}
            onChange={(e) => setEstimatedDistance(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Base Fare</span>
            <span className="text-sm font-medium text-gray-900">₦{baseFare}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Distance ({estimatedDistance} km)</span>
            <span className="text-sm font-medium text-gray-900">₦{estimatedDistance * perKm}</span>
          </div>
          <div className="border-t border-blue-200 pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Total Fare</span>
              <span className="text-xl font-bold text-blue-600">₦{estimatedFare}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
        >
          Request Ride
        </button>
      </form>
    </div>
  )
}

export default RideRequest