const mongoose = require('mongoose');

// Define the Trip schema
const tripSchema = new mongoose.Schema({
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to the User who created the trip
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  vacancy: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);