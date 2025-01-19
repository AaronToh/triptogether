import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Discover.css'; // Reuse the same styling

function MyTrips({ user }) {
  const [createdTrips, setCreatedTrips] = useState([]);
  const [joinedTrips, setJoinedTrips] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/trips/user/${user._id}`);
        setCreatedTrips(response.data.createdTrips);
        setJoinedTrips(response.data.joinedTrips);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError('Failed to load your trips.');
      }
    };

    fetchTrips();
  }, [user]);

  return (
    <div className="discover-container">
      <h1>My Trips</h1>
      {error && <div className="message" style={{ background: '#ffebee', color: '#d32f2f' }}>{error}</div>}

      <div>
        <h2>Created Trips</h2>
        {createdTrips.length > 0 ? (
          <div className="trip-list">
            {createdTrips.map((trip) => (
              <div className="trip-card" key={trip._id}>
                <h2>{trip.location}</h2>
                <p className="trip-date">
                  <span className="icon">🗓</span>
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </p>
                <p className="trip-vacancy">
                  <span className="icon">👥</span>
                  {trip.vacancy} {trip.vacancy === 1 ? 'spot' : 'spots'} left
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-trips">You haven’t created any trips yet.</p>
        )}
      </div>

      <div>
        <h2>Joined Trips</h2>
        {joinedTrips.length > 0 ? (
          <div className="trip-list">
            {joinedTrips.map((trip) => (
              <div className="trip-card" key={trip._id}>
                <h2>{trip.location}</h2>
                <p className="trip-date">
                  <span className="icon">🗓</span>
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </p>
                <p className="trip-vacancy">
                  <span className="icon">👥</span>
                  {trip.vacancy} {trip.vacancy === 1 ? 'spot' : 'spots'} left
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-trips">You haven’t joined any trips yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
