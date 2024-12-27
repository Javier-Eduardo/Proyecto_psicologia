// server/routes/seguimientos.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../config/db'); // Importa la conexión a la base de datos

// Obtener todos los seguimientos
router.get('/', (req, res) => {
    db.query('SELECT * FROM Seguimientos', (err, results) => {
        if (err) {
            console.error('Error al obtener seguimientos:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message }); // Devuelve un error 500 si hay un problema
        }
        res.json(results); // Devuelve los resultados en formato JSON
    });
});

// Agregar un nuevo seguimiento
router.post('/', [
    body('id_caso').isInt().withMessage('El id_caso debe ser un número entero.'),
    body('fecha').isDate().withMessage('La fecha debe ser una fecha válida.'),
    body('observaciones').isString().isLength({ min: 1 }).withMessage('Las observaciones no pueden estar vacías.'),
    body('acciones_tomadas').isString().optional().withMessage('Las acciones tomadas no pueden estar vacías.')
], (req, res) => {
    const errors = validationResult(req); // Verifica si hay errores de validación
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Devuelve un error 400 si hay errores de validación
    }

    const { id_caso, fecha, observaciones, acciones_tomadas } = req.body;

    // Verificar si el id_caso existe
    db.query('SELECT * FROM CasosClinicos WHERE id_caso = ?', [id_caso], (err, results) => {
        if (err) {
            console.error('Error al verificar el id_caso:', err); // Agrega un mensaje de error
            return res.status(500).json({ error: err.message }); // Devuelve un error 500 si hay un problema
        }
        if (results.length === 0) {
            return res.status(400).json({ error: 'El id_caso proporcionado no existe.' }); // Mensaje si el id_caso no existe
        }

        // Si el id_caso existe, proceder a insertar el seguimiento
        db.query('INSERT INTO Seguimientos (id_caso, fecha, observaciones, acciones_tomadas) VALUES (?, ?, ?, ?)', 
        [id_caso, fecha, observaciones, acciones_tomadas], (err, results) => {
            if (err) {
                console.error('Error al agregar el seguimiento:', err); // Agrega un mensaje de error
                return res.status(500).json({ error: err.message }); // Devuelve un error 500 si hay un problema
            }
            res.status(201).json({ id_seguimiento: results.insertId, id_caso, observaciones, acciones_tomadas, fecha }); // Devuelve el seguimiento creado
        });
    });
});

module.exports = router; // Exporta el router para usarlo en otras partes de la aplicación