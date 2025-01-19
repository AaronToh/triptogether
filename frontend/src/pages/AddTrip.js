import React, { useState } from 'react';
import { addTrip } from '../api';
import './AddTrip.css';

const AddTrip = ({ user }) => {
  const [tripData, setTripData] = useState({
    location: '',
    startDate: '',
    endDate: '',
    vacancy: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Directly pass the user's ID since the user is already logged in
      const response = await addTrip({ ...tripData, creator: user._id }); 
      setMessage(response.message);
      setTripData({
        location: '',
        startDate: '',
        endDate: '',
        vacancy: '',
      });
    } catch (error) {
      setMessage(error.message || 'An error occurred while adding the trip.');
    }
  };

  return (
    <div className="add-trip">
      <h2>Add a New Trip</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={tripData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={tripData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={tripData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vacancy:</label>
          <input
            type="number"
            name="vacancy"
            value={tripData.vacancy}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
};

export default AddTrip;
