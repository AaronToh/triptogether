import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Discover.css'; // Add styles here or inline

function Discover({ user }) {
  const [trips, setTrips] = useState([]); // State to store trips
  const [message, setMessage] = useState(''); // State to store feedback messages

  // Fetch trips from the backend
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/trips'); // Replace with your API URL
        setTrips(response.data);
      } catch (err) {
        console.error('Error fetching trips:', err);
      }
    };

    fetchTrips();
  }, []);

  // Handle join button click
  const handleJoinTrip = async (tripId) => {
    try {
      const response = await axios.post(`http://localhost:5001/api/trips/${tripId}/join`, {
        userId: user._id,
      });
      setMessage(response.data.message || 'Successfully joined the trip!');
    } catch (err) {
      console.error('Error joining trip:', err);
      setMessage('Failed to join the trip. Please try again.');
    }
  };

  return (
    <div className="discover-container">
      <h1>Discover Trips</h1>
      {message && <div className="message">{message}</div>}
      {trips.length > 0 ? (
        <div className="trip-list">
          {trips.map((trip) => (
            <div className="trip-card" key={trip._id}>
              <h2>{trip.location}</h2>
              <p>
                <strong>Start Date:</strong> {new Date(trip.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong> {new Date(trip.endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Vacancy:</strong> {trip.vacancy}
              </p>
              <button
                onClick={() => handleJoinTrip(trip._id)}
                disabled={trip.vacancy <= 0}
              >
                {trip.vacancy > 0 ? 'Join' : 'Full'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No trips available at the moment.</p>
      )}
    </div>
  );
}

export default Discover;

