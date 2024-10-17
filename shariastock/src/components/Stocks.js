import React, { useState, useEffect } from 'react';
import { apiRequest } from '../services/apiService';

const Stocks = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const data = await apiRequest('http://localhost:5002/api/stocks');
                setStocks(data);
            } catch (error) {
                console.error('Failed to fetch stocks:', error);
            }
        };

        fetchStocks();
    }, []);

    return (
        <div>
            <h1>Available Stocks</h1>
            {stocks.length === 0 ? (
                <p>No stocks available at the moment.</p>
            ) : (
                <ul>
                    {stocks.map(stock => (
                        <li key={stock.id}>
                            {stock.name} - ${stock.currentPrice}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Stocks;