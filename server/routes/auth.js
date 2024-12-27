// server/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Asegúrate de que la conexión a la base de datos esté configurada
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { nombre, apellido, email, password, telefono } = req.body;

    // Verificar si el usuario ya existe
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error al verificar el usuario:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe' }); // Mensaje si el usuario ya existe
        }

        // Hashear la contraseña
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Error al hashear la contraseña:', err);
                return res.status(500).json({ error: err.message });
            }

            // Insertar el nuevo usuario en la base de datos
            db.query('INSERT INTO Usuarios (nombre, apellido, email, password, telefono) VALUES (?, ?, ?, ?, ?)', 
            [nombre, apellido, email, hashedPassword, telefono], (err, results) => {
                if (err) {
                    console.error('Error al registrar el usuario:', err);
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ id_usuario: results.insertId, nombre, apellido, email });
            });
        });
    });
});

// Inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Buscar el usuario en la base de datos
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Error al iniciar sesión:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' }); // Mensaje si el usuario no existe
        }
        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(password, results[0].password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' }); // Mensaje si la contraseña es incorrecta
        }

        // Generar un token JWT
        const token = jwt.sign({ id_usuario: results[0].id_usuario }, 'tu_secreto', { expiresIn: '1h' });
        res.json({ token, email: results[0].email }); // Asegúrate de enviar el email o cualquier otro dato necesario
    });
});

module.exports = router;