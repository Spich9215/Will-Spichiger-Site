// client/src/components/Map.tsx
import React, { useEffect, useRef } from 'react';
import type { RideEntry } from '../types/rides';

// GLOBAL variable: Set to true IMMEDIATELY when script is appended to DOM.
// This is the critical change to prevent multiple appends in React Strict Mode.
// It acts as a gatekeeper for the *DOM append operation*.
let isGoogleMapsScriptAppendedToDOM = false;

interface MapProps {
  rides: RideEntry[];
  selectedId: string | null;
  onSelectRide: (id: string) => void;
}

type RideCoordsById = Record<string, google.maps.LatLngLiteral[]>;

// ride-coords.json is pre-parsed at build time (see scripts/build-ride-coords.mjs)
// from the raw GPX files, keyed by ride id. Fetching this single cached file
// instead of 30+ individual GPX files (and parsing their XML in the browser)
// is what makes the Travel page's map load quickly. Module-level so every
// Map instance shares one fetch instead of re-requesting it.
let rideCoordsPromise: Promise<RideCoordsById> | null = null;
const fetchRideCoords = (): Promise<RideCoordsById> => {
  if (!rideCoordsPromise) {
    rideCoordsPromise = fetch('/ride-coords.json').then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch ride-coords.json: HTTP ${res.status}`);
      return res.json();
    });
  }
  return rideCoordsPromise;
};

const Map: React.FC<MapProps> = ({ rides, selectedId, onSelectRide }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapInstanceRef = useRef<google.maps.Map | null>(null);
  // Track drawn polylines by ride id so we can restyle on selection and
  // avoid redrawing everything on every render.
  const polylinesRef = useRef<Record<string, google.maps.Polyline>>({});
  const rideCoordsRef = useRef<RideCoordsById>({});
  const onSelectRideRef = useRef(onSelectRide);
  onSelectRideRef.current = onSelectRide;
  // Tracks whether we've already framed the map to the full trip on load, so
  // we don't keep re-fitting (and undoing a user's selection zoom) on rerenders.
  const hasFitInitialViewRef = useRef(false);

  const styleForRide = (ride: RideEntry, isSelected: boolean) => ({
    strokeColor: ride.color || '#FF0000',
    strokeOpacity: isSelected ? 1 : 0.8,
    strokeWeight: isSelected ? 6 : 4,
  });

  const loadRoutes = async () => {
    const map = googleMapInstanceRef.current;
    if (!map || !window.google?.maps) return;

    let rideCoords: RideCoordsById;
    try {
      rideCoords = await fetchRideCoords();
      rideCoordsRef.current = rideCoords;
    } catch (e) {
      console.error('Error loading ride-coords.json:', e);
      return;
    }

    for (const ride of rides) {
      const coords = rideCoords[ride.id];
      if (!coords || !coords.length) continue;

      if (!polylinesRef.current[ride.id]) {
        const polyline = new window.google.maps.Polyline({
          path: coords,
          map,
          ...styleForRide(ride, ride.id === selectedId),
        });
        polyline.addListener('click', () => onSelectRideRef.current(ride.id));
        polylinesRef.current[ride.id] = polyline;
      }
    }

    // Frame the whole Santiago-to-Bariloche trip on first load, instead of
    // relying on a guessed center/zoom that may crop either end of the route.
    if (!hasFitInitialViewRef.current && rides.length) {
      const allCoords = rides.flatMap((ride) => rideCoords[ride.id] || []);
      if (allCoords.length) {
        const bounds = new window.google.maps.LatLngBounds();
        allCoords.forEach((c) => bounds.extend(c));
        map.fitBounds(bounds, 50);
        hasFitInitialViewRef.current = true;
      }
    }
  };

  const initMap = () => {
    if (!mapRef.current || !window.google?.maps) return;
    if (!googleMapInstanceRef.current) {
      googleMapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: -37.5, lng: -70 },
        zoom: 6,
        mapTypeId: window.google.maps.MapTypeId.TERRAIN,
      });
    }
    loadRoutes();
  };

  useEffect(() => {
    const scriptId = 'google-maps-api-script';
    if (!isGoogleMapsScriptAppendedToDOM && (!window.google?.maps || !document.getElementById(scriptId))) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_Maps_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      script.onerror = (e) => console.error('Google Maps script failed to load:', e);
      document.body.appendChild(script);
      isGoogleMapsScriptAppendedToDOM = true;
    } else {
      initMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rides]);

  // Restyle polylines whenever the selected ride changes, and pan/zoom to it.
  useEffect(() => {
    rides.forEach((ride) => {
      const polyline = polylinesRef.current[ride.id];
      if (polyline) {
        polyline.setOptions(styleForRide(ride, ride.id === selectedId));
        if (ride.id === selectedId) {
          polyline.setMap(null);
          polyline.setMap(googleMapInstanceRef.current);
        }
      }
    });

    if (selectedId) {
      const selectedRide = rides.find((r) => r.id === selectedId);
      const coords = selectedRide ? rideCoordsRef.current[selectedRide.id] : null;
      const map = googleMapInstanceRef.current;
      if (coords && coords.length && map && window.google?.maps) {
        const bounds = new window.google.maps.LatLngBounds();
        coords.forEach((c: google.maps.LatLngLiteral) => bounds.extend(c));
        map.fitBounds(bounds, 60);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: '480px' }} />;
};

export default Map;
