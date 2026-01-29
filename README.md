# Keke Rider Tracker

A GPS-enabled ride-hailing platform connecting Keke (tricycle/auto-rickshaw) riders with customers in real-time.

## Features

### For Customers
- Real-time GPS tracking of nearby available riders
- Interactive map showing rider locations
- Distance and ETA calculations
- Fare estimation based on distance
- Live ride status tracking (waiting, accepted, arriving, on trip, completed)
- Direct communication with rider

### For Riders
- Dashboard to manage availability (online/offline)
- Real-time earnings and trip statistics
- Trip counter and rating display
- GPS location sharing when online

## Framework

- React 19.x
- Vite 6.x
- Leaflet (interactive maps)
- Tailwind CSS (styling)

## Preview

Configured to run on `0.0.0.0:8080` for k8s HTTPRoute access.

## Development

```bash
npm install
npm run dev
```

Server will be available at:
- Local: http://localhost:8080
- Network: http://0.0.0.0:8080
- k8s: http://*.nodeops.app (or your HTTPRoute domain)

## Build

```bash
npm run build
npm run preview
```

## Theme

Clean Light theme with professional transportation service design:
- Primary: Blue (#2563eb) for trust and reliability
- Accent: Green (#10b981) for available/active status
- Warm gray backgrounds for subtle contrast
- Modern, minimal UI optimized for mobile use

## How It Works

1. Choose user type (Customer or Rider)
2. Allow GPS location access
3. **Customers**: View nearby available riders on map, select rider, enter destination, request ride
4. **Riders**: Toggle online/offline status, view dashboard with earnings and stats
5. Real-time ride tracking from request to completion
6. Fare calculation: ₦100 base fare + ₦50 per kilometer

## GPS Features

- Automatic user location detection
- Real-time rider position updates
- Distance and ETA calculations
- Interactive map with custom markers
- Route visualization between pickup and destination