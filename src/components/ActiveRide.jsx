import { useEffect, useState } from 'react'

function ActiveRide({ ride, onCancel, onStatusChange }) {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (ride.status === 'waiting') {
      const timeout = setTimeout(() => {
        onStatusChange('accepted')
      }, 3000)
      return () => clearTimeout(timeout)
    }

    if (ride.status === 'accepted') {
      const timeout = setTimeout(() => {
        onStatusChange('arriving')
      }, 5000)
      return () => clearTimeout(timeout)
    }

    if (ride.status === 'arriving') {
      const timeout = setTimeout(() => {
        onStatusChange('ontrip')
      }, 8000)
      return () => clearTimeout(timeout)
    }
  }, [ride.status, onStatusChange])

  const getStatusInfo = () => {
    switch (ride.status) {
      case 'waiting':
        return {
          title: 'Finding Rider...',
          subtitle: 'Please wait while we connect you',
          color: 'text-yellow-600',
          bg: 'bg-yellow-50'
        }
      case 'accepted':
        return {
          title: 'Ride Accepted!',
          subtitle: `${ride.rider.name} is on the way`,
          color: 'text-green-600',
          bg: 'bg-green-50'
        }
      case 'arriving':
        return {
          title: 'Rider Arriving',
          subtitle: `${ride.pickupTime} minutes away`,
          color: 'text-blue-600',
          bg: 'bg-blue-50'
        }
      case 'ontrip':
        return {
          title: 'On Trip',
          subtitle: 'Enjoy your ride',
          color: 'text-purple-600',
          bg: 'bg-purple-50'
        }
      case 'completed':
        return {
          title: 'Trip Completed',
          subtitle: 'Thanks for riding with us!',
          color: 'text-green-600',
          bg: 'bg-green-50'
        }
      default:
        return {
          title: 'Unknown',
          subtitle: '',
          color: 'text-gray-600',
          bg: 'bg-gray-50'
        }
    }
  }

  const statusInfo = getStatusInfo()
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6">
      <div className={`${statusInfo.bg} p-4 rounded-xl mb-6`}>
        <div className="flex items-center justify-between mb-2">
          <h2 className={`text-xl font-bold ${statusInfo.color}`}>{statusInfo.title}</h2>
          {ride.status === 'ontrip' && (
            <span className="text-sm font-medium text-gray-600">{formatTime(timer)}</span>
          )}
        </div>
        <p className="text-sm text-gray-600">{statusInfo.subtitle}</p>
      </div>

      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
          {ride.rider.name.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{ride.rider.name}</p>
          <p className="text-sm text-gray-500">{ride.rider.vehicle}</p>
          <div className="flex items-center space-x-1 mt-1">
            <span className="text-sm text-yellow-600">⭐ {ride.rider.rating}</span>
          </div>
        </div>
        <a
          href={`tel:+234`}
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Pickup Location</p>
            <p className="text-sm text-gray-500">Your current location</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">Destination</p>
            <p className="text-sm text-gray-500">{ride.destination.address}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl mb-6">
        <span className="text-sm font-medium text-gray-700">Total Fare</span>
        <span className="text-2xl font-bold text-blue-600">₦{ride.fare}</span>
      </div>

      {ride.status === 'ontrip' && (
        <button
          onClick={() => onStatusChange('completed')}
          className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors mb-3"
        >
          Complete Trip
        </button>
      )}

      {ride.status !== 'ontrip' && ride.status !== 'completed' && (
        <button
          onClick={onCancel}
          className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
        >
          Cancel Ride
        </button>
      )}
    </div>
  )
}

export default ActiveRide