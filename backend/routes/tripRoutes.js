const express = require('express');
const Trip = require('../models/Trip');
const User = require('../models/User');
const router = express.Router();

// Fetch all trips (GET)
router.get('/', async (req, res) => {
    try {
      // Fetch all trips from the database
      const trips = await Trip.find().populate('creator', 'username email'); // Optionally populate creator details
      res.status(200).json(trips);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch trips. Please try again.' });
    }
  });

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
  

// Join a trip and update participants
router.post('/:id/join', async (req, res) => {
    const { id } = req.params; // Trip ID from URL
    const { userId } = req.body; // User ID from request body
  
    try {
      // Find the trip
      const trip = await Trip.findById(id);
      if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
      }

      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if there are available vacancies
      if (trip.vacancy <= 0) {
        return res.status(400).json({ message: 'No vacancy available for this trip.' });
      }
  
      // Check if the user is already a participant
      if (trip.participants.includes(userId)) {
        return res.status(400).json({ message: 'User has already joined this trip.' });
      }
  
      // Add user to participants
      trip.participants.push(userId);

      // Add trip ID to user's trips array
      user.trips.push(id);
      await user.save();
  
      // Decrease the trip vacancy by 1
      trip.vacancy -= 1;
  
      await trip.save();
  
      res.status(200).json({ message: 'Successfully joined the trip!', trip });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to join the trip. Please try again.' });
    }
  });

// Fetch trips for a user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find trips created by the user or joined by the user
      const createdTrips = await Trip.find({ creator: userId });
      const joinedTrips = await Trip.find({ participants: userId });
  
      res.status(200).json({ createdTrips, joinedTrips });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch trips for the user.' });
    }
  });

module.exports = router;
