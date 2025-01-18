const express = require('express');
const Trip = require('../models/Trip');
const router = express.Router();

// Add Trip Route (POST)
router.post('/add', async (req, res) => {
  const { username, location, date, budget, vacancy } = req.body;

  // Validate required fields
  if (!username  || !location || !startDate  || !endDate  || !vacancy) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    // Create a new trip document and save it to the database
    const newTrip = new Trip({
      username,
      location,
      startDate,
      endDate,
      vacancy,
    });

    await newTrip.save();
    res.status(201).json({ message: 'Trip added successfully!', trip: newTrip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;