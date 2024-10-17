import React, { useState, useEffect } from 'react';
import { apiRequest } from '../services/apiService';

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const data = await apiRequest('http://localhost:5002/api/portfolio');
                setPortfolio(data);
            } catch (error) {
                console.error('Failed to fetch portfolio:', error);
            }
        };

        fetchPortfolio();
    }, []);

    return (
        <div>
            <h1>Your Portfolio</h1>
            {portfolio.length === 0 ? (
                <p>You don't have any stocks in your portfolio yet.</p>
            ) : (
                <ul>
                    {portfolio.map(stock => (
                        <li key={stock.id}>
                            {stock.name} - {stock.quantity} shares at ${stock.purchasePrice}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Portfolio;