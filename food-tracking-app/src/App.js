// src/App.js

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa'; // Import history icon from react-icons
import FoodApp from './FoodApp';
import HistoryPage from './HistoryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/history" className="history-button">
            <FaHistory size={24} />
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<FoodApp />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
