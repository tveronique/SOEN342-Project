import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(null);

    // Use effect to set the role from local storage on initial load
    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        if (storedRole) {
            setRole(storedRole);
        }
    }, []); // This will only run once when the component mounts

    const login = (role) => {
        setRole(role);
        localStorage.setItem('role', role);
    };

    const logout = () => {
        setRole(null);
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};