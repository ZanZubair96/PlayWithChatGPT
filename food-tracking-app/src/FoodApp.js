// src/FoodApp.js

import React, { useState, useEffect } from 'react';
import FoodForm from './FoodForm';
import FoodList from './FoodList';

function FoodApp() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const storedFoodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
    setFoodItems(storedFoodItems);
  }, []);

  const addFoodItem = (item) => {
    const updatedFoodItems = [...foodItems, item];
    setFoodItems(updatedFoodItems);
    localStorage.setItem('foodItems', JSON.stringify(updatedFoodItems));
  };

  return (
    <div>
      <h1>Food Tracking App</h1>
      <FoodForm onAddFood={addFoodItem} />
      <FoodList foodItems={foodItems} />
    </div>
  );
}

export default FoodApp;
