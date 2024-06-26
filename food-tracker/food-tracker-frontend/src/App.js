// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css'; // Ensure you import the CSS file

const App = () => {
    const [foods, setFoods] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [newFood, setNewFood] = useState({ name: '', calories: '', date: new Date() });

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            const res = await axios.get('http://localhost:5002/api/foods');
            setFoods(res.data);
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    };

    const addFood = async () => {
        try {
            const res = await axios.post('http://localhost:5002/api/foods', newFood);
            setFoods([...foods, res.data]);
            setNewFood({ name: '', calories: '', date: new Date() });
        } catch (error) {
            console.error('Error adding food:', error);
        }
    };

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    const filterFoodsByDate = (date) => {
        const dateString = date.toISOString().split('T')[0];
        return foods.filter((food) => {
            const foodDateString = new Date(food.date).toISOString().split('T')[0];
            return foodDateString === dateString;
        });
    };

    const foodsForSelectedDate = filterFoodsByDate(selectedDate);
    const foodsForCurrentDate = filterFoodsByDate(new Date());

    return (
        <div className="container">
            <div className="calendar">
                <Calendar onChange={onDateChange} value={selectedDate} />
            </div>
            <div className="App">
                <h1>Food Tracker</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Food name"
                        value={newFood.name}
                        onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Calories"
                        value={newFood.calories}
                        onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
                    />
                    <button onClick={addFood}>Add Food</button>
                </div>
                <h2>Items for Today</h2>
                <ul>
                    {foodsForCurrentDate.length > 0 ? (
                        foodsForCurrentDate.map((food) => (
                            <li key={food._id}>
                                {food.name} - {food.calories} calories at {new Date(food.date).toLocaleTimeString()}
                            </li>
                        ))
                    ) : (
                        <li>No items</li>
                    )}
                </ul>
                <h2>Items for {selectedDate.toLocaleDateString()}</h2>
                <ul>
                    {foodsForSelectedDate.length > 0 ? (
                        foodsForSelectedDate.map((food) => (
                            <li key={food._id}>
                                {food.name} - {food.calories} calories at {new Date(food.date).toLocaleTimeString()}
                            </li>
                        ))
                    ) : (
                        <li>No items</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default App;
