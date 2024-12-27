// server/routes/permissions.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Importa la conexión a la base de datos

// Obtener todos los permisos
router.get('/', (req, res) => {
    db.query('SELECT * FROM Permisos', (err, results) => {
        if (err) {
            console.error('Error al obtener permisos:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message }); // Devuelve un error 500 si hay un problema
        }
        res.json(results); // Devuelve los resultados en formato JSON
    });
});

// Agregar un nuevo permiso
router.post('/', (req, res) => {
    const { nombre_permiso } = req.body;

    // Verificar que el nombre del permiso esté presente
    if (!nombre_permiso) {
        return res.status(400).json({ error: 'El nombre del permiso es requerido' }); // Mensaje si falta el campo
    }

    db.query('INSERT INTO Permisos (nombre_permiso) VALUES (?)', [nombre_permiso], (err, results) => {
        if (err) {
            console.error('Error al agregar el permiso:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message }); // Devuelve un error 500 si hay un problema
        }
        res.status(201).json({ id_permiso: results.insertId, nombre_permiso }); // Devuelve el permiso creado
    });
});

module.exports = router; // Exporta el router para usarlo en otras partes de la aplicación