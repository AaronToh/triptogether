import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('user'); // Clear user from localStorage
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>Trip Explorer</h1>
      <ul>
        <li><Link to="/">Discover</Link></li>
        <li><Link to="/mytrips">My Trips</Link></li>
        {user ? (
          <>
            <li><Link to="/addtrip">Add Trip</Link></li>
            <li>Welcome, {user.username}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
