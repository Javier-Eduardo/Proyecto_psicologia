// server/config/db.js
const mysql = require('mysql2'); // Asegúrate de usar mysql2 si lo has instalado

// Crear la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost', // Dirección del servidor de la base de datos
    user: 'root', // Cambia esto por tu usuario de MySQL
    password: '', // Cambia esto por tu contraseña de MySQL
    database: 'GestionPsicologica' // Asegúrate de que el nombre de la base de datos sea correcto
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err); // Muestra un error si la conexión falla
        return;
    }
    console.log('Conectado a la base de datos MySQL'); // Mensaje de éxito
});

// Exportar la conexión para usarla en otras partes de la aplicación
module.exports = db;