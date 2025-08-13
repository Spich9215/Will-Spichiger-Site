// client/src/components/Travel.tsx
import React from 'react';
import Map from './Map'; // Import the Map component

const Travel: React.FC = () => {
  return (
    <div className="page-content">
      <h2>My Travel Adventures 🌍</h2>
      <p>Here's a look at some of my cycling trips and other adventures plotted on a map!</p>
      <div className="map-container"> {/* Optional: A wrapper for your map */}
        <Map />
      </div>
      {/* You can add more travel-related content or trip details here */}
    </div>
  );
};

export default Travel;