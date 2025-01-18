import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Discover from './pages/Discover';
import MyTrips from './pages/MyTrips';
import Login from './pages/Login';
import Register from './pages/Register';
import AddTrip from './pages/AddTrip';

function App() {
  // State to track the logged-in user
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Discover user={user}/>} />
          <Route path="/mytrips" element={<MyTrips user={user}/>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addtrip" element={<AddTrip user={user}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
