import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Discover.css';

function Discover({ user }) {
  const [trips, setTrips] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/trips');
        setTrips(response.data);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setMessage('Failed to load trips. Please try again later.');
      }
    };

    fetchTrips();
  }, []);

  const handleJoinTrip = async (tripId) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/trips/${tripId}/join`, {
        userId: user._id,
      });
      setMessage(response.data.message || 'Successfully joined the trip!');
      // Update the trips list to reflect the change
      setTrips(trips.map(trip => 
        trip._id === tripId ? { ...trip, vacancy: trip.vacancy - 1 } : trip
      ));
    } catch (err) {
      console.error('Error joining trip:', err);
      setMessage('Failed to join the trip. Please try again.');
    }
  };

  return (
    <div className="discover-container">
      <h1>Discover Amazing Trips</h1>
      {message && <div className="message">{message}</div>}
      {trips.length > 0 ? (
        <div className="trip-list">
          {trips.map((trip) => (
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
              <button
                onClick={() => handleJoinTrip(trip._id)}
                disabled={trip.vacancy <= 0 || !user}
                className={trip.vacancy > 0 ? 'join-button' : 'full-button'}
              >
                {trip.vacancy > 0 ? (user ? 'Join Trip' : 'Login to Join') : 'Trip Full'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-trips">No trips available at the moment. Check back soon!</p>
      )}
    </div>
  );
}

export default Discover;

