// src/HistoryPage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import back icon from react-icons

function HistoryPage() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const storedFoodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
    setFoodItems(storedFoodItems);
  }, []);

  return (
    <div>
      <header>
        <Link to="/" className="back-button">
          <FaArrowLeft size={24} />
        </Link>
      </header>
      <h1>Food History</h1>
      {foodItems.length === 0 ? (
        <p>No food items recorded yet.</p>
      ) : (
        foodItems
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((item, index) => (
            <div key={index}>
              <p>{item.date}: {item.food}</p>
            </div>
          ))
      )}
    </div>
  );
}

export default HistoryPage;
