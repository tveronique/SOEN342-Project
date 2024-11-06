import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);

    // useEffect to set the role and phoneNumber from localStorage on initial load
    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        const storedPhoneNumber = localStorage.getItem('phoneNumber');
        
        if (storedRole) {
            setRole(storedRole);
        }
        
        if (storedPhoneNumber) {
            setPhoneNumber(storedPhoneNumber);
        }
    }, []); // This will only run once when the component mounts

    const login = (role, phoneNumber) => {
        setRole(role);
        setPhoneNumber(phoneNumber);
        localStorage.setItem('role', role);
        localStorage.setItem('phoneNumber', phoneNumber);
    };

    const logout = () => {
        setRole(null);
        setPhoneNumber(null);
        localStorage.removeItem('role');
        localStorage.removeItem('phoneNumber');
    };

    return (
        <AuthContext.Provider value={{ role, phoneNumber, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
