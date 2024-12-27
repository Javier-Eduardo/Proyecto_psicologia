// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(null);

    const login = (userData, token) => {
        setUser (userData);
        localStorage.setItem('token', token); // Almacena el token en localStorage
    };

    const logout = () => {
        setUser (null);
        localStorage.removeItem('token'); // Elimina el token de localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};