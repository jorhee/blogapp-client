import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);  // Add user state

    // Function to fetch user details
    const fetchUserDetails = async (token) => {
        console.log('Fetching user details with token:', token); // Debugging line
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data && data.user) {
                console.log('User fetched:', data.user);  // Debugging line
                setUser(data.user);  // Set user details in context
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token on load:', token);  // Debugging line
        setIsAuthenticated(!!token); // true if token exists

        if (token) {
            // Fetch user details if token exists
            fetchUserDetails(token);  // Use the function directly
        }
    }, []); // No need to add `fetchUserDetails` here since it's stable

    const login = (token) => {
        console.log('Logging in with token:', token);  
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        fetchUserDetails(token);  // Call the function after login
    };

    const logout = () => {
        console.log('Logging out');  // Debugging line
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);  // Clear user on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};