const express = require('express');
const mongoose = require('mongoose');
mongoose.set("debug", true);

const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log(process.env.MONGO_URI)

    console.log('MongoDB connected')
  })
  .catch(err => {
    console.log("URI:",process.env.MONGO_URI)
    console.error('MongoDB connection error:', err)
  });

// Routes
const tripRoutes = require('./routes/tripRoutes');
app.use('/api/trips', tripRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
