import { getAuthToken, clearAuthToken } from './authService';
import { refreshToken } from './tokenRefresh';

export const apiRequest = async (url, options = {}) => {
    const token = getAuthToken();
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    try {
        let response = await fetch(url, options);

        if (response.status === 401) {
            // Token might be expired, try to refresh
            try {
                const newToken = await refreshToken();
                if (newToken) {
                    // Retry the request with the new token
                    options.headers['Authorization'] = `Bearer ${newToken}`;
                    response = await fetch(url, options);
                } else {
                    throw new Error('Token refresh failed');
                }
            } catch (refreshError) {
                clearAuthToken();
                window.location.href = '/login';
                throw refreshError;
            }
        }

        if (!response.ok) {
            throw new Error('API request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
};