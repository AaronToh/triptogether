import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Discover from './pages/Discover';
import MyTrips from './pages/MyTrips';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/mytrips" element={<MyTrips />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
