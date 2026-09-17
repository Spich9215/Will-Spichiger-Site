// client/src/components/Travel.tsx
import React, { useEffect, useState, useMemo } from 'react';
import Map from './Map';
import type { RideEntry } from '../types/rides';

const formatDate = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
};

const Travel: React.FC = () => {
  const [rides, setRides] = useState<RideEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/gpxFiles.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: RideEntry[]) => setRides(data))
      .catch((err) => setLoadError(String(err)));
  }, []);

  const selectedRide = useMemo(
    () => rides.find((r) => r.id === selectedId) || null,
    [rides, selectedId]
  );

  return (
    <div className="page-content">
      <h2>Santiago, Chile to San Carlos de Bariloche, Argentina</h2>
      <p>January – March 2024 &middot; {rides.length} days tracked</p>

      {loadError && <p style={{ color: '#c0392b' }}>Could not load ride data: {loadError}</p>}

      <div
        className="travel-layout"
        style={{ display: 'flex', gap: '1rem', alignItems: 'stretch', flexWrap: 'wrap' }}
      >
        <div
          className="ride-list"
          style={{
            width: '280px',
            maxHeight: '600px',
            overflowY: 'auto',
            border: '1px solid #333',
            borderRadius: '6px',
            padding: '0.5rem',
            flexShrink: 0,
          }}
        >
          {rides.map((ride) => (
            <button
              key={ride.id}
              onClick={() => setSelectedId(ride.id === selectedId ? null : ride.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: ride.id === selectedId ? 'rgba(65,28,107,0.25)' : 'transparent',
                border: 'none',
                borderLeft: `4px solid ${ride.color}`,
                padding: '0.5rem 0.6rem',
                marginBottom: '0.25rem',
                cursor: 'pointer',
                color: 'inherit',
                borderRadius: '4px',
              }}
            >
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                {formatDate(ride.date)}
                {ride.inferred && ' · inferred'}
              </div>
              <div style={{ fontSize: '0.95rem' }}>
                {ride.label}
                {ride.videoUrl && ' 🎥'}
              </div>
            </button>
          ))}
        </div>

        <div style={{ flex: '1 1 480px', minWidth: '320px', height: '600px' }}>
          <Map rides={rides} selectedId={selectedId} onSelectRide={setSelectedId} />
        </div>
      </div>

      {selectedRide && (
        <div className="ride-detail" style={{ marginTop: '1rem' }}>
          <h3>
            {formatDate(selectedRide.date)} — {selectedRide.label}
          </h3>
          {selectedRide.inferred && (
            <p style={{ fontSize: '0.85rem', opacity: 0.75 }}>
              This route wasn't tracked in Komoot — it's inferred from phone location history.
            </p>
          )}
          {selectedRide.videoUrl ? (
            <video
              key={selectedRide.videoUrl}
              controls
              style={{ width: '100%', maxWidth: '900px', borderRadius: '6px' }}
              src={selectedRide.videoUrl}
            />
          ) : (
            <p style={{ opacity: 0.7 }}>No video linked for this day yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Travel;
