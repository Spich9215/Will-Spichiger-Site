// client/src/components/Map.tsx
import React, { useEffect, useRef } from 'react';

// GLOBAL variable to strictly control script appending.
// This ensures that even if Map component unmounts/remounts quickly (e.g., React Strict Mode),
// the script is only ever added to the DOM once.
let isGoogleMapsScriptAppendedToDOM = false;

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapInstanceRef = useRef<google.maps.Map | null>(null); // Stores the ONE map instance

  const initMapAndLoadRoutes = async () => {
    console.log("initMapAndLoadRoutes: Function started.");

    if (!mapRef.current) {
      console.error("initMapAndLoadRoutes: mapRef.current is null. Map container div not found or not rendered yet.");
      return;
    }

    // Ensure Google Maps API is ready BEFORE trying to create map/objects
    if (!window.google || !window.google.maps) {
        console.error("initMapAndLoadRoutes: window.google.maps is NOT available when initMapAndLoadRoutes was called.");
        return; // CRITICAL: Exit if API not ready
    }

    // Initialize the map ONLY if it hasn't been created before.
    // This is crucial for map persistence and correct object attachment.
    if (!googleMapInstanceRef.current) {
      console.log("initMapAndLoadRoutes: Creating new Google Maps Map instance.");
      try {
        googleMapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: -35.334, lng: -72.416 },
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

    const map = googleMapInstanceRef.current; // Get the active map instance
    if (!map) {
        console.error("initMapAndLoadRoutes: Map instance is null after initialization attempt. Cannot proceed with loading routes.");
        return;
    }
    console.log("initMapAndLoadRoutes: Map instance ready for drawing routes.");

    // --- GPX Route Loading and Drawing Logic (No changes needed here as it's correctly logging parsing) ---
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
          // This is where the crucial map instance is passed.
          // It MUST be a valid google.maps.Map object from the *successful* initialization.
          new window.google.maps.Polyline({
            path: coords,
            map: map, // <-- THIS 'map' MUST BE VALID!
            strokeColor: color || '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 3,
          });
          console.log(`initMapAndLoadRoutes: Polyline drawn for label: "${label}" from file: "${file}".`);

          if (label) {
            new window.google.maps.Marker({
              position: coords[0],
              map: map, // <-- THIS 'map' MUST BE VALID!
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
    console.log("Map.tsx useEffect: Effect initiated.");
    const scriptId = 'google-maps-api-script';

    // FIRST check our custom flag. If true, script has been appended.
    // SECOND check if window.google is ready.
    // THIRD check if the script element is already in the DOM (redundant check, but safe).
    if (!isGoogleMapsScriptAppendedToDOM && (!window.google || !document.getElementById(scriptId))) {
      console.log("Map.tsx useEffect: Google Maps script not detected or not yet appended. Proceeding to append.");
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_Maps_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Map.tsx useEffect: Google Maps script loaded via its 'onload' event.");
        // Only trigger initMapAndLoadRoutes IF window.google.maps is actually ready
        if (window.google && window.google.maps) {
            isGoogleMapsScriptAppendedToDOM = true; // Set flag ONLY on successful load via onload
            initMapAndLoadRoutes();
        } else {
            console.error("Map.tsx useEffect: Google Maps script onload fired, but window.google.maps is still not available. This is unexpected.");
        }
      };
      script.onerror = (e) => console.error("Map.tsx useEffect: Google Maps script failed to load:", e);
      document.body.appendChild(script);
    } else {
      // This branch is for subsequent renders/mounts, or if it was loaded externally.
      // We still want to try to init map and load routes, but without re-appending script.
      console.log("Map.tsx useEffect: Google Maps script already appended or fully loaded. Calling initMapAndLoadRoutes directly.");
      initMapAndLoadRoutes();
    }

    return () => {
        console.log("Map.tsx useEffect: Cleanup function called.");
        // The cleanup function should ideally *not* remove the script unless you have a very specific SPA need.
        // Removing it here would cause re-downloads/errors if the component remounts immediately.
    };
  }, []); // Empty dependency array: ensures this effect runs only once on component mount

  return <div ref={mapRef} style={{ width: '75%', height: '100vh' }} />;
};

export default Map;