import { useState, useEffect } from 'react';
import { getAuthToken, setAuthToken, clearAuthToken } from '../services/authService';
import { refreshToken } from '../services/tokenRefresh';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = getAuthToken();
        if (token) {
            setIsAuthenticated(true);
            scheduleTokenRefresh();
        }
    }, []);

    const scheduleTokenRefresh = () => {
        // Refresh token 5 minutes before it expires
        // Assuming token expiration time is available. Adjust as needed.
        const expiresIn = /* calculate time until token expires */ 3600000; // 1 hour for example
        setTimeout(refreshToken, expiresIn - 300000); // 5 minutes before expiry
    };

    const login = (token) => {
        setAuthToken(token);
        setIsAuthenticated(true);
        scheduleTokenRefresh();
    };

    const logout = () => {
        clearAuthToken();
        setIsAuthenticated(false);
    };

    return { isAuthenticated, login, logout };
};