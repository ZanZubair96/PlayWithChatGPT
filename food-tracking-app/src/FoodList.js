// src/FoodList.js

import React from 'react';

function FoodList({ foodItems }) {
  return (
    <div>
      {foodItems.length === 0 ? (
        <p>No food items added yet.</p>
      ) : (
        foodItems.map((item, index) => (
          <div key={index}>
            <p>{item.date}: {item.food}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default FoodList;
