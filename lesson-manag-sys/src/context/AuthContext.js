import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem('role') || null);

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