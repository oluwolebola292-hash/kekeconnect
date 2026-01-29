import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const userIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `<div style="background-color: #2563eb; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
})

const riderIcon = L.divIcon({
  className: 'custom-rider-marker',
  html: `<div style="background-color: #10b981; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
    <svg style="width: 18px; height: 18px; color: white;" fill="currentColor" viewBox="0 0 20 20">
      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
})

function Map({ userLocation, riders, selectedRider, activeRide, userType, riderStatus }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    mapInstanceRef.current = L.map(mapRef.current, {
      zoomControl: false
    }).setView([userLocation.lat, userLocation.lng], 15)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current)

    L.control.zoom({ position: 'bottomright' }).addTo(mapInstanceRef.current)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [userLocation])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup(userType === 'customer' ? 'Your Location' : 'You (Rider)')
    
    markersRef.current.push(userMarker)

    if (userType === 'customer') {
      riders.forEach(rider => {
        const marker = L.marker([rider.location.lat, rider.location.lng], { icon: riderIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`
            <div style="font-family: system-ui, -apple-system, sans-serif;">
              <p style="font-weight: 600; margin-bottom: 4px;">${rider.name}</p>
              <p style="font-size: 13px; color: #6b7280;">${rider.vehicle}</p>
              <p style="font-size: 13px; color: #6b7280;">⭐ ${rider.rating} • ${rider.trips} trips</p>
              <p style="font-size: 13px; color: #10b981; font-weight: 500; margin-top: 4px;">${rider.distance} km away • ${rider.eta} min</p>
            </div>
          `)
        
        markersRef.current.push(marker)

        if (selectedRider?.id === rider.id) {
          marker.openPopup()
        }
      })
    }

    if (activeRide) {
      const riderMarker = L.marker(
        [activeRide.rider.location.lat, activeRide.rider.location.lng],
        { icon: riderIcon }
      ).addTo(mapInstanceRef.current)
      
      markersRef.current.push(riderMarker)

      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        [activeRide.rider.location.lat, activeRide.rider.location.lng]
      ])
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [userLocation, riders, selectedRider, activeRide, userType])

  return (
    <div 
      ref={mapRef} 
      className="w-full"
      style={{ height: 'calc(100vh - 60px)' }}
    />
  )
}

export default Map