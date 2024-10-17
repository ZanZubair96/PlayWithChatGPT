import { setAuthToken } from '../services/authService';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const { name, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Client-side validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        try {
            const response = await fetch('http://localhost:5002/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.errors ? data.errors[0].msg : 'An error occurred during signup');
            }

            // Securely store the token
            securelyStoreToken(data.token);

            setSuccessMessage('Signup successful! Redirecting...');
            console.log('Signup successful', data);

            // Redirect after a short delay
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);

        } catch (err) {
            setError(err.message);
            console.error('Signup error:', err);
        }
    };

    // Function to securely store the token
    const securelyStoreToken = (token) => {
        // In a real-world scenario, consider using a more secure storage method
        // For demonstration, we're using localStorage
        setAuthToken(data.token);
    };

    return (
        <div className="signup-container">
            <form onSubmit={onSubmit} className="signup-form">
                <h2>Sign Up</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    minLength="8"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    minLength="8"
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;