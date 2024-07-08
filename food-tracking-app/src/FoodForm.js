// src/FoodForm.js

import React, { useState } from 'react';

function FoodForm({ onAddFood }) {
  const [food, setFood] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (food && date) {
      onAddFood({ food, date });
      setFood('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Food Item"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Add Food</button>
    </form>
  );
}

export default FoodForm;
