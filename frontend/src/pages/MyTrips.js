import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyTrips({ user }) {
  const [createdTrips, setCreatedTrips] = useState([]);
  const [joinedTrips, setJoinedTrips] = useState([]);
  const [error, setError] = useState('');

  const userId = user._id; // Replace with the logged-in user's ID (use context or a global store in real apps)

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/trips/user/${userId}`);
        setCreatedTrips(response.data.createdTrips);
        setJoinedTrips(response.data.joinedTrips);
      } catch (err) {
        console.error(err);
        setError('Failed to load your trips.');
      }
    };

    fetchTrips();
  }, [userId]);

  return (
    <div style={{ marginTop: '80px', padding: '20px' }}> {/* Adjust margin to fit your navbar */}
      <h2>My Trips</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h3>Created Trips</h3>
        {createdTrips.length > 0 ? (
          <ul>
            {createdTrips.map((trip) => (
              <li key={trip._id}>
                <h4>{trip.location}</h4>
                <p>Start Date: {new Date(trip.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(trip.endDate).toLocaleDateString()}</p>
                <p>Vacancy: {trip.vacancy}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't created any trips yet.</p>
        )}
      </div>

      <div>
        <h3>Joined Trips</h3>
        {joinedTrips.length > 0 ? (
          <ul>
            {joinedTrips.map((trip) => (
              <li key={trip._id}>
                <h4>{trip.location}</h4>
                <p>Start Date: {new Date(trip.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(trip.endDate).toLocaleDateString()}</p>
                <p>Vacancy: {trip.vacancy}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't joined any trips yet.</p>
        )}
      </div>
    </div>
  );
}


export default MyTrips;
