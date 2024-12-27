// server/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Importa la conexión a la base de datos

// Obtener todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message }); // Devuelve un error 500 si hay un problema
        }
        res.json(results); // Devuelve los resultados en formato JSON
    });
});

// Agregar un nuevo usuario
router.post('/', (req, res) => {
    const { nombre, apellido, email, password, telefono } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' }); // Mensaje si falta algún campo
    }

    // Aquí podrías agregar lógica para verificar si el email ya está en uso

    db.query('INSERT INTO usuarios (nombre, apellido, email, password, telefono) VALUES (?, ?, ?, ?, ?)', 
    [nombre, apellido, email, password, telefono], (err, results) => {
        if (err) {
            console.error('Error al agregar el usuario:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message }); // Devuelve un error 500 si hay un problema
        }
        res.status(201).json({ id_usuario: results.insertId, nombre, apellido, email, telefono }); // Devuelve el usuario creado
    });
});

module.exports = router; // Exporta el router para usarlo en otras partes de la aplicación