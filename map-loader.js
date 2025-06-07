// map-loader.js

function loadGoogleMaps() {
    // For local development, this will use your git-ignored config.js file.
    // When deployed, 'config' will be undefined, and it will use the placeholder.
    const apiKey = typeof config !== 'undefined'
      ? config.Maps_API_KEY
      : '__Maps_API_KEY__'; // This is the placeholder for deployment.
  
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initBikeMap`;
    script.async = true;
    document.head.appendChild(script);
  }
  
  // Call the function to start loading the map
  loadGoogleMaps();