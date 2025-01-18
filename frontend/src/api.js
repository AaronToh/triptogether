import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5001/api', // Replace with your backend base URL
});

// Handle user registration
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error.response?.data?.message || error.message);
    throw error.response?.data?.message || 'Registration failed';
  }
};

// Handle user login
export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data?.message || error.message);
    throw error.response?.data?.message || 'Login failed';
  }
};

// Handle user logout (client-side only for now)
export const logoutUser = () => {
  try {
    localStorage.removeItem('user'); // Clear user data from localStorage
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error.message);
  }
};

export const addTrip = async (tripData) => {
    try {
      const response = await API.post('/trips/add', tripData); // Send tripData directly
      return response.data;
    } catch (error) {
      console.error('Error during trip addition:', error.response?.data?.message || error.message);
      throw error.response?.data?.message || 'Trip addition failed';
    }
  };
  
  // Fetch all trips
export const fetchTrips = async () => {
    try {
      const response = await API.get('/trips');
      return response.data;
    } catch (error) {
      console.error('Error during trip fetching:', error.response?.data?.message || error.message);
      throw error.response?.data?.message || 'Trip fetching failed';
    }
  };

  // Join a trip
export const joinTrip = async (tripId, userId) => {
    try {
      const response = await API.post(`/trips/${tripId}/join`, { userId });
      return response.data;
    } catch (error) {
      console.error('Error during joining trip:', error.response?.data?.message || error.message);
      throw error.response?.data?.message || 'Joining trip failed';
    }
  };