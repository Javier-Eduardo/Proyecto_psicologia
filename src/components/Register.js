// src/components/Register.js
import React, { useState } from 'react';
import { registerUser  } from '../api'; // Asegúrate de que la ruta sea correcta

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        telefono: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser (formData);
            console.log('Usuario registrado:', data);
            // Aquí puedes redirigir al usuario a la página de inicio de sesión
        } catch (error) {
            console.error('Error al registrar:', error);
            // Aquí puedes mostrar un mensaje de error al usuario
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
            <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
            <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;