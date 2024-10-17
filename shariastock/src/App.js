import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import Portfolio from './components/Portfolio';
import Stocks from './components/Stocks';

// PrivateRoute component definition
const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    const { isAuthenticated, login, logout } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
                path="/welcome" 
                element={
                    <PrivateRoute>
                        <Welcome logout={logout} />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/portfolio" 
                element={
                    <PrivateRoute>
                        <Portfolio />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/stocks" 
                element={
                    <PrivateRoute>
                        <Stocks />
                    </PrivateRoute>
                } 
            />
        </Routes>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <AppRoutes />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;