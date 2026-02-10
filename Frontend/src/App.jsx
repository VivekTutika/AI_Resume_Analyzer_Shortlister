import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Abstract from './pages/Abstract';
import UploadResume from './pages/UploadResume';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/abstract" element={<Abstract />} />
          <Route path="/find-matches" element={<UploadResume />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;