// server/routes/roles.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Importa la conexión a la base de datos

// Obtener todos los roles
router.get('/', (req, res) => {
    db.query('SELECT * FROM Roles', (err, results) => {
        if (err) {
            console.error('Error al obtener roles:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message }); // Devuelve un error 500 si hay un problema
        }
        res.json(results); // Devuelve la lista de roles en formato JSON
    });
});

// Obtener todos los usuarios
router.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message }); // Devuelve un error 500 si hay un problema
        }
        res.json(results); // Devuelve la lista de usuarios en formato JSON
    });
});

// Asignar un rol a un usuario
router.post('/usuario-rol', (req, res) => {
    const { id_usuario, id_rol } = req.body; // Obtiene el ID del usuario y del rol del cuerpo de la solicitud

    // Verificar que ambos IDs estén presentes
    if (!id_usuario || !id_rol) {
        return res.status(400).json({ error: 'El ID del usuario y el ID del rol son requeridos' }); // Mensaje si falta algún campo
    }

    // Lógica para asignar el rol al usuario en la base de datos
    db.query('INSERT INTO Usuario_Rol (id_usuario, id_rol) VALUES (?, ?)', [id_usuario, id_rol], (err, results) => {
        if (err) {
            console.error('Error al asignar rol al usuario:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message }); // Devuelve un error 500 si hay un problema
        }
        res.status(201).json({ message: 'Rol asignado exitosamente', id_usuario, id_rol }); // Responde con un mensaje de éxito
    });
});

module.exports = router; // Exporta el router para usarlo en otras partes de la aplicación