// server/routes/notifications.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Importa la conexión a la base de datos

// Obtener todas las notificaciones
router.get('/', (req, res) => {
    db.query('SELECT * FROM Notificaciones', (err, results) => {
        if (err) {
            console.error('Error al obtener notificaciones:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Devuelve los resultados en formato JSON
    });
});

// Agregar una nueva notificación
router.post('/', (req, res) => {
    const { mensaje } = req.body;

    // Verificar que el mensaje esté presente
    if (!mensaje) {
        return res.status(400).json({ error: 'El mensaje es requerido' }); // Mensaje si falta el campo
    }

    db.query('INSERT INTO Notificaciones (mensaje) VALUES (?)', [mensaje], (err, results) => {
        if (err) {
            console.error('Error al agregar la notificación:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id_notificacion: results.insertId, mensaje }); // Devuelve la notificación creada
    });
});

module.exports = router; // Exporta el router para usarlo en otras partes de la aplicación