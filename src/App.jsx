import { useState, useEffect } from 'react'
import Map from './components/Map'
import RiderCard from './components/RiderCard'
import RideRequest from './components/RideRequest'
import ActiveRide from './components/ActiveRide'
import Header from './components/Header'
import UserTypeSelector from './components/UserTypeSelector'

function App() {
  const [userType, setUserType] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [riders, setRiders] = useState([])
  const [selectedRider, setSelectedRider] = useState(null)
  const [activeRide, setActiveRide] = useState(null)
  const [riderStatus, setRiderStatus] = useState('offline')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {
          setUserLocation({ lat: 6.5244, lng: 3.3792 })
        }
      )
    } else {
      setUserLocation({ lat: 6.5244, lng: 3.3792 })
    }
  }, [])

  useEffect(() => {
    if (userLocation && userType === 'customer') {
      const mockRiders = [
        {
          id: 1,
          name: 'Chidi Okafor',
          vehicle: 'TVS King',
          rating: 4.8,
          trips: 342,
          location: {
            lat: userLocation.lat + 0.005,
            lng: userLocation.lng + 0.003
          },
          distance: 0.8,
          eta: 3,
          available: true
        },
        {
          id: 2,
          name: 'Ibrahim Musa',
          vehicle: 'Bajaj RE',
          rating: 4.9,
          trips: 521,
          location: {
            lat: userLocation.lat - 0.003,
            lng: userLocation.lng + 0.007
          },
          distance: 1.2,
          eta: 5,
          available: true
        },
        {
          id: 3,
          name: 'Emeka Nwankwo',
          vehicle: 'Piaggio Ape',
          rating: 4.7,
          trips: 289,
          location: {
            lat: userLocation.lat + 0.008,
            lng: userLocation.lng - 0.002
          },
          distance: 0.6,
          eta: 2,
          available: true
        }
      ]
      setRiders(mockRiders)
    }
  }, [userLocation, userType])

  const handleRequestRide = (rider, destination) => {
    setActiveRide({
      rider,
      destination,
      status: 'waiting',
      fare: calculateFare(destination.distance),
      pickupTime: 3
    })
    setSelectedRider(null)
  }

  const handleCancelRide = () => {
    setActiveRide(null)
  }

  const handleRideStatusChange = (newStatus) => {
    setActiveRide(prev => ({ ...prev, status: newStatus }))
    if (newStatus === 'completed') {
      setTimeout(() => setActiveRide(null), 3000)
    }
  }

  const handleGoOnline = () => {
    setRiderStatus('online')
  }

  const handleGoOffline = () => {
    setRiderStatus('offline')
  }

  const calculateFare = (distance) => {
    const basefare = 100
    const perKm = 50
    return basefare + (distance * perKm)
  }

  if (!userType) {
    return <UserTypeSelector onSelectType={setUserType} />
  }

  if (!userLocation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-gray-600">Getting your location...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType={userType} onSwitchType={() => setUserType(null)} />
      
      <div className="relative">
        <Map 
          userLocation={userLocation}
          riders={userType === 'customer' ? riders : []}
          selectedRider={selectedRider}
          activeRide={activeRide}
          userType={userType}
          riderStatus={riderStatus}
        />

        {userType === 'customer' && !activeRide && (
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[50vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Available Riders</h2>
                <span className="text-sm text-gray-500">{riders.length} nearby</span>
              </div>
              
              <div className="space-y-3">
                {riders.map(rider => (
                  <RiderCard
                    key={rider.id}
                    rider={rider}
                    onSelect={() => setSelectedRider(rider)}
                    isSelected={selectedRider?.id === rider.id}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {userType === 'customer' && selectedRider && !activeRide && (
          <RideRequest
            rider={selectedRider}
            onRequest={handleRequestRide}
            onCancel={() => setSelectedRider(null)}
          />
        )}

        {userType === 'customer' && activeRide && (
          <ActiveRide
            ride={activeRide}
            onCancel={handleCancelRide}
            onStatusChange={handleRideStatusChange}
          />
        )}

        {userType === 'rider' && (
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Rider Dashboard</h2>
              <p className="text-sm text-gray-500">Manage your availability and view ride requests</p>
            </div>

            <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-700">Status</p>
                <p className="text-lg font-bold" style={{ color: riderStatus === 'online' ? '#10b981' : '#6b7280' }}>
                  {riderStatus === 'online' ? 'Online' : 'Offline'}
                </p>
              </div>
              <button
                onClick={riderStatus === 'online' ? handleGoOffline : handleGoOnline}
                className="px-6 py-3 rounded-xl font-semibold transition-colors"
                style={{
                  backgroundColor: riderStatus === 'online' ? '#ef4444' : '#10b981',
                  color: 'white'
                }}
              >
                {riderStatus === 'online' ? 'Go Offline' : 'Go Online'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-blue-600 font-medium">Today's Trips</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">12</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-sm text-green-600 font-medium">Earnings</p>
                <p className="text-2xl font-bold text-green-900 mt-1">₦3,400</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl">
                <p className="text-sm text-yellow-600 font-medium">Rating</p>
                <p className="text-2xl font-bold text-yellow-900 mt-1">4.8</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App