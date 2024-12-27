// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

const ProtectedRoute = ({ element }) => {
    const { token } = useAuth(); // Obtén el token del contexto

    return token ? element : <Navigate to="/" />; // Redirige si no hay token
};

export default ProtectedRoute;