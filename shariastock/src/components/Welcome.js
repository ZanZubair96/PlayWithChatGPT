import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Welcome.css';

const Welcome = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5002/api/auth', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                logout();
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate, logout]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="welcome-container">
            <h1>Welcome to ShariaStock</h1>
            <p>Hello, {userData.name}!</p>
            <div className="welcome-content">
                <p>You've successfully logged in to your account.</p>
                <p>Here you can start exploring halal investment opportunities and manage your portfolio.</p>
            </div>
            <div className="welcome-actions">
                <button onClick={() => navigate('/portfolio')}>View Portfolio</button>
                <button onClick={() => navigate('/stocks')}>Explore Stocks</button>
                <button onClick={logout} className="logout-btn">Logout</button>
            </div>
        </div>
    );
};

export default Welcome;