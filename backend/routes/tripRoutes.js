const express = require('express');
const Trip = require('../models/Trip');
const router = express.Router();

// Add Trip Route (POST)
router.post('/add', async (req, res) => {
    const { location, startDate, endDate, vacancy, creator } = req.body;

    if (!creator) {
      return res.status(401).json({ message: 'Creator is required!' });
    }
  
    if (!location || !startDate || !endDate || !vacancy) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
  
    try {
      // Create a new trip document linked to the authenticated user
      const newTrip = new Trip({
        creator: creator,
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
