// client/src/components/Travel.tsx
import React from 'react';
import Map from './Map'; // Import the Map component

const Travel: React.FC = () => {
  return (
    <div className="page-content">
      <h2>Santiago, Chile to San Carlos de Bariloche, Argentina GPX Data </h2>
      <p>January - March 2024</p>
      <div className="map-container"> {/* Optional: A wrapper for your map */}
        <Map />
      </div>
      {/* You can add more travel-related content or trip details here */}
    </div>
  );
};

export default Travel;