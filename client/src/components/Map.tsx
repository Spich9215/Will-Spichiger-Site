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

// Cache of parsed coordinates per ride file, so re-renders (e.g. on selection change)
// don't re-fetch/re-parse GPX files that were already loaded.
const coordsCache: Record<string, google.maps.LatLngLiteral[]> = {};

const Map: React.FC<MapProps> = ({ rides, selectedId, onSelectRide }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapInstanceRef = useRef<google.maps.Map | null>(null);
  // Track drawn polylines/markers by ride id so we can restyle on selection
  // and avoid redrawing everything on every render.
  const polylinesRef = useRef<Record<string, google.maps.Polyline>>({});
  const markersRef = useRef<Record<string, google.maps.Marker>>({});
  const onSelectRideRef = useRef(onSelectRide);
  onSelectRideRef.current = onSelectRide;

  const styleForRide = (ride: RideEntry, isSelected: boolean) => ({
    strokeColor: ride.color || '#FF0000',
    strokeOpacity: isSelected ? 1 : 0.8,
    strokeWeight: isSelected ? 6 : 4,
  });

  const loadRoutes = async () => {
    const map = googleMapInstanceRef.current;
    if (!map || !window.google?.maps) return;

    for (const ride of rides) {
      let coords = coordsCache[ride.file];

      if (!coords) {
        try {
          const gpxRes = await fetch(ride.file);
          if (!gpxRes.ok) {
            console.warn(`Failed to fetch GPX "${ride.file}": ${gpxRes.status}`);
            continue;
          }
          const gpxText = await gpxRes.text();
          const xml = new DOMParser().parseFromString(gpxText, 'application/xml');
          if (xml.querySelector('parsererror')) {
            console.error(`XML parse error for "${ride.file}"`);
            continue;
          }
          const trkpts = xml.getElementsByTagName('trkpt');
          const parsed: google.maps.LatLngLiteral[] = [];
          for (let i = 0; i < trkpts.length; i++) {
            const lat = parseFloat(trkpts[i].getAttribute('lat') || '');
            const lng = parseFloat(trkpts[i].getAttribute('lon') || '');
            if (!isNaN(lat) && !isNaN(lng)) parsed.push({ lat, lng });
          }
          coords = parsed;
          coordsCache[ride.file] = coords;
        } catch (e) {
          console.error(`Error loading "${ride.file}":`, e);
          continue;
        }
      }

      if (!coords.length) continue;

      if (!polylinesRef.current[ride.id]) {
        const polyline = new window.google.maps.Polyline({
          path: coords,
          map,
          ...styleForRide(ride, ride.id === selectedId),
        });
        polyline.addListener('click', () => onSelectRideRef.current(ride.id));
        polylinesRef.current[ride.id] = polyline;

        const marker = new window.google.maps.Marker({
          position: coords[0],
          map,
          title: `${ride.date} — ${ride.label}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor: ride.color || '#000000',
            fillOpacity: 1,
            strokeWeight: 0,
          },
        });
        marker.addListener('click', () => onSelectRideRef.current(ride.id));
        markersRef.current[ride.id] = marker;
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
      const coords = selectedRide ? coordsCache[selectedRide.file] : null;
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
