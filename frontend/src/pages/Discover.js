// src/pages/Discover.js
// src/pages/Discover.js
import React, { useEffect, useState } from 'react';
import { fetchTrips } from '../services/tripService';

const Discover = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await fetchTrips();
        setTrips(data);
      } catch (err) {
        setError('Failed to load trips');
      } finally {
        setLoading(false);
      }
    };

    loadTrips();
  }, []);

  if (loading) return <p>Loading trips...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Discover Trips</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {trips.map((trip) => (
          <div
            key={trip._id}
            style={{
              border: '1px solid #ddd',
              margin: '10px',
              padding: '10px',
              width: '300px',
            }}
          >
            <h2>{trip.location}</h2>
            <p><strong>Posted by:</strong> {trip.username}</p>
            <p><strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}</p>
            <p><strong>Budget:</strong> ${trip.budget}</p>
            <p><strong>Vacancy:</strong> {trip.vacancy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
