// src/server/casos.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Importa la conexión a la base de datos

// Obtener todos los casos clínicos
router.get('/', (req, res) => {
    db.query('SELECT * FROM CasosClinicos', (err, results) => {
        if (err) {
            console.error('Error al obtener casos clínicos:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message });
        }
        res.json(results); // Devuelve los resultados en formato JSON
    });
});

// Agregar un nuevo caso clínico
router.post('/', (req, res) => {
    const { id_paciente, id_psicologo, fecha_apertura, descripcion, estado } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!id_paciente || !id_psicologo || !fecha_apertura || !descripcion || !estado) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    db.query('INSERT INTO CasosClinicos (id_paciente, id_psicologo, fecha_apertura, descripcion, estado) VALUES (?, ?, ?, ?, ?)', 
    [id_paciente, id_psicologo, fecha_apertura, descripcion, estado], (err, results) => {
        if (err) {
            console.error('Error al agregar el caso clínico:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id_caso: results.insertId, id_paciente, id_psicologo, fecha_apertura, descripcion, estado });
    });
});

module.exports = router; // Exporta el router para usarlo en otras partes de la aplicación