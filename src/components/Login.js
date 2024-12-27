// src/components/Login.js
import React, { useState } from 'react';
import { loginUser  } from '../api'; // Asegúrate de que la ruta sea correcta
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth(); // Obtén la función de login del contexto
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser (credentials);
            console.log('Usuario autenticado:', data);
            login({ email: data.email }, data.token); // Almacena el usuario y el token
            navigate('/dashboard'); // Redirige al dashboard
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            // Aquí puedes mostrar un mensaje de error al usuario
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default Login;