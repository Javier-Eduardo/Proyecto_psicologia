// src/components/Dashboard.js
import React from 'react'; // Importamos React
import { useAuth } from '../context/AuthContext'; // Importamos el contexto de autenticación

const Dashboard = () => {
    const { user, logout } = useAuth(); // Usamos el contexto de autenticación

    return (
        <div>
            <h2>Bienvenido, {user ? user.name : 'Invitado'}</h2> {/* Muestra el nombre del usuario autenticado */}
            {user && (
                <button onClick={logout}>Cerrar Sesión</button> // Botón para cerrar sesión
            )}
        </div>
    );
};

export default Dashboard; // Exportamos el componente