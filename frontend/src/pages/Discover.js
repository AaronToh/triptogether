import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Discover.css';

function Discover({ user }) {
  const [trips, setTrips] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/trips');
        let fetchedTrips = response.data;

        // If user is logged in, filter out trips they have already joined
        if (user) {
          fetchedTrips = fetchedTrips.filter(
            (trip) => !trip.participants || !trip.participants.includes(user._id)
          );
        }

        setTrips(fetchedTrips);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setMessage('Failed to load trips. Please try again later.');
      }
    };

    fetchTrips();
  }, [user]);

  const handleJoinTrip = async (tripId) => {
    if (!user) {
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }

    // Immediately remove the trip from the list (optimistic update)
    const updatedTrips = trips.filter((trip) => trip._id !== tripId);
    setTrips(updatedTrips);

    try {
      const response = await axios.post(`http://localhost:5001/api/trips/${tripId}/join`, {
        userId: user._id,
      });
      setMessage(response.data.message || 'Successfully joined the trip!');
    } catch (err) {
      console.error('Error joining trip:', err);
      setMessage('Failed to join the trip.');
      // Optionally refetch trips in case of failure
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
                disabled={trip.vacancy <= 0}
                className={trip.vacancy > 0 ? 'join-button' : 'full-button'}
              >
                {trip.vacancy > 0 ? 'Join Trip' : 'Trip Full'}
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
