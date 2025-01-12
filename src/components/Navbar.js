import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Trip Explorer</h1>
      <ul>
        <li><Link to="/">Discover</Link></li>
        <li><Link to="/mytrips">My Trips</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
