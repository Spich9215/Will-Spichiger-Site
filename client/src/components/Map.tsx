// client/src/components/Map.tsx
import React, { useEffect, useRef } from 'react';

// GLOBAL variable: Set to true IMMEDIATELY when script is appended to DOM.
// This is the critical change to prevent multiple appends in React Strict Mode.
// It acts as a gatekeeper for the *DOM append operation*.
let isGoogleMapsScriptAppendedToDOM = false;

const Map: React.FC = () => { // Keeping your original component name 'Map'
  const mapRef = useRef<HTMLDivElement>(null);
  // useRef to store the Google Maps Map instance. This ensures it's created once
  // and persists across re-renders, allowing polylines/markers to attach to the same map.
  const googleMapInstanceRef = useRef<google.maps.Map | null>(null);

  const initMapAndLoadRoutes = async () => {
    console.log("initMapAndLoadRoutes: Function started. window.google.maps status:", !!(window.google && window.google.maps));

    // Ensure the map container div is available
    if (!mapRef.current) {
      console.error("initMapAndLoadRoutes: mapRef.current is null. Map container div not found or not rendered yet.");
      return;
    }

    // Critical check: Ensure Google Maps API (window.google.maps) is fully loaded.
    // This is a safety check for unexpected race conditions after the script's onload fires.
    if (!window.google || !window.google.maps) {
        console.error("initMapAndLoadRoutes: Called but window.google.maps is NOT available when initMapAndLoadRoutes was called. Script might not be fully ready.");
        return; // Exit if API is not ready
    }

    // Initialize the Google Map instance ONLY if it hasn't been created before
    if (!googleMapInstanceRef.current) {
      console.log("initMapAndLoadRoutes: Creating new Google Maps Map instance.");
      try {
        googleMapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: -35.334, lng: -72.416 }, // Example starting location
          zoom: 9,
          mapTypeId: window.google.maps.MapTypeId.TERRAIN // Your desired terrain default
        });
        console.log("initMapAndLoadRoutes: Google Map instance initialized successfully.");
      } catch (e) {
        console.error("initMapAndLoadRoutes: Error creating Google Map instance:", e);
        return; // Cannot proceed if map creation fails
      }
    } else {
      console.log("initMapAndLoadRoutes: Google Map instance already exists, reusing it.");
    }

    // Get the current map instance to work with
    const map = googleMapInstanceRef.current;
    if (!map) {
        console.error("initMapAndLoadRoutes: Map instance is unexpectedly null after initialization attempt. Cannot proceed with loading routes.");
        return; // Critical error, cannot draw routes without a map
    }
    console.log("initMapAndLoadRoutes: Map instance ready for drawing routes.");

    // --- GPX Route Loading and Drawing Logic (remains unchanged) ---
    try {
      console.log("initMapAndLoadRoutes: Attempting to fetch /gpxFiles.json...");
      const res = await fetch('/gpxFiles.json');
      if (!res.ok) {
        throw new Error(`Failed to fetch gpxFiles.json: HTTP status ${res.status} - ${res.statusText}`);
      }
      const routes = await res.json();
      console.log("initMapAndLoadRoutes: GPX routes config loaded:", routes);

      if (!Array.isArray(routes) || routes.length === 0) {
        console.warn("initMapAndLoadRoutes: No valid routes array or empty array found in gpxFiles.json. Nothing to draw.");
        return;
      }

      for (const { file, color, label } of routes) {
        const gpxUrl = file;
        console.log(`initMapAndLoadRoutes: Processing GPX file: "${gpxUrl}", label: "${label || 'N/A'}", color: "${color || 'N/A'}"`);

        const gpxRes = await fetch(gpxUrl);
        if (!gpxRes.ok) {
          console.warn(`initMapAndLoadRoutes: Failed to fetch GPX file "${gpxUrl}": HTTP status ${gpxRes.status} - ${gpxRes.statusText}. Skipping this route.`);
          continue;
        }
        const gpxText = await gpxRes.text();
        console.log(`initMapAndLoadRoutes: GPX file "${gpxUrl}" fetched. Text length: ${gpxText.length}.`);

        const parser = new DOMParser();
        const xml = parser.parseFromString(gpxText, 'application/xml');

        const errorNode = xml.querySelector('parsererror');
        if (errorNode) {
            console.error(`initMapAndLoadRoutes: XML parsing error for "${gpxUrl}":`, errorNode.textContent);
            continue;
        }

        const trkpts = xml.getElementsByTagName('trkpt');
        console.log(`initMapAndLoadRoutes: Found ${trkpts.length} track points in "${gpxUrl}".`);

        const coords: google.maps.LatLngLiteral[] = [];
        for (let i = 0; i < trkpts.length; i++) {
          const latStr = trkpts[i].getAttribute('lat');
          const lngStr = trkpts[i].getAttribute('lon');

          if (latStr === null || lngStr === null) {
              console.warn(`initMapAndLoadRoutes: Missing 'lat' or 'lon' attribute in "${gpxUrl}" at track point index ${i}. Skipping this track point.`);
              continue;
          }

          const lat = parseFloat(latStr);
          const lng = parseFloat(lngStr);

          if (!isNaN(lat) && !isNaN(lng)) {
             coords.push({ lat, lng });
          } else {
              console.warn(`initMapAndLoadRoutes: Invalid 'lat' or 'lng' value in "${gpxUrl}" at track point index ${i} (lat: "${latStr}", lng: "${lngStr}"). Skipping this track point.`);
          }
        }
        console.log(`initMapAndLoadRoutes: Processed ${coords.length} valid coordinates for "${gpxUrl}".`);

        if (coords.length > 0) {
          new window.google.maps.Polyline({
            path: coords,
            map: map,
            strokeColor: color || '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 3,
          });
          console.log(`initMapAndLoadRoutes: Polyline drawn for label: "${label}" from file: "${file}".`);

          if (label) {
            new window.google.maps.Marker({
              position: coords[0],
              map: map,
              title: label,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 5,
                fillColor: color || '#000000',
                fillOpacity: 1,
                strokeWeight: 0,
              },
            });
            console.log(`initMapAndLoadRoutes: Marker added for label: "${label}" from file: "${file}".`);
          }
        } else {
            console.warn(`initMapAndLoadRoutes: No valid coordinates found after parsing for "${gpxUrl}". Cannot draw polyline or marker for this route.`);
        }
      }
      console.log("initMapAndLoadRoutes: All GPX routes processing complete.");

    } catch (error) {
      console.error("initMapAndLoadRoutes: Fatal error during GPX route loading or drawing process:", error);
    }
  };

  useEffect(() => {
    console.log("Map.tsx useEffect: Effect initiated. isGoogleMapsScriptAppendedToDOM:", isGoogleMapsScriptAppendedToDOM, "window.google:", !!window.google);
    const scriptId = 'google-maps-api-script';

    // Condition to append the script:
    // 1. Our global flag says it hasn't been appended yet.
    // 2. AND (window.google.maps is NOT fully available OR the script element is NOT yet in the DOM)
    if (!isGoogleMapsScriptAppendedToDOM && (!window.google?.maps || !document.getElementById(scriptId))) {
      console.log("Map.tsx useEffect: Google Maps script not detected or not yet appended. Proceeding to append.");
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_Maps_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Map.tsx useEffect: Google Maps script loaded via its 'onload' event. Now calling initMapAndLoadRoutes.");
        // We only call initMapAndLoadRoutes here; the `isGoogleMapsScriptAppendedToDOM` flag
        // was set *immediately after appending* to prevent re-append.
        initMapAndLoadRoutes();
      };
      script.onerror = (e) => console.error("Map.tsx useEffect: Google Maps script failed to load:", e);
      document.body.appendChild(script);
      // >>> CRITICAL CHANGE IS HERE: Set the flag immediately after appending. <<<
      isGoogleMapsScriptAppendedToDOM = true;
      console.log("Map.tsx useEffect: isGoogleMapsScriptAppendedToDOM set to true immediately after append operation.");
    } else {
      // This branch is for subsequent renders/mounts, or if it was loaded externally.
      // We still want to try to init map and load routes, but without re-appending script.
      console.log("Map.tsx useEffect: Google Maps script already appended or fully loaded. Calling initMapAndLoadRoutes directly.");
      initMapAndLoadRoutes();
    }

    return () => {
        console.log("Map.tsx useEffect: Cleanup function called.");
        // This cleanup should NOT remove the script element or reset the flag,
        // as it would cause re-appending on next mount in Strict Mode.
    };
  }, []); // Empty dependency array: ensures this effect runs only once on component mount

  return <div ref={mapRef} style={{ width: '75%', height: '100vh' }} />;
};

export default Map;