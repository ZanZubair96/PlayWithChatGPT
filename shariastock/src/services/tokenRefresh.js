import { getAuthToken, setAuthToken, clearAuthToken } from './authService';

export const refreshToken = async () => {
    try {
        const currentToken = getAuthToken();
        if (!currentToken) {
            throw new Error('No token found');
        }

        const response = await fetch('http://localhost:5002/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        setAuthToken(data.token);
        return data.token;
    } catch (error) {
        console.error('Error refreshing token:', error);
        clearAuthToken(); // Clear the token if refresh fails
        window.location.href = '/login'; // Redirect to login page
        throw error;
    }
};