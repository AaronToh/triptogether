import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="sidebar">
      <h1>TripTogether</h1> {/* Updated website title */}
      <ul>
        <li><Link to="/">Discover</Link></li>
        {user && <li><Link to="/mytrips">My Trips</Link></li>} {/* Only show if logged in */}
        {user ? (
          <>
            <li><Link to="/addtrip">Add Trip</Link></li>
            <li><span>Welcome, {user.username}</span></li>
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
