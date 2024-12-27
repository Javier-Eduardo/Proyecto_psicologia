// server/index.js
const express = require('express');
const notificationsRouter = require('./routes/notifications'); // Importa el router de notificaciones
const rolesRouter = require('./routes/roles'); // Importa el router de roles
const permissionsRouter = require('./routes/permissions'); // Importa el router de permisos
const usersRoutes = require('./routes/users'); // Rutas de usuarios
const casosRouter = require('./routes/casos'); // Importa el router de casos clínicos
const seguimientosRouter = require('./routes/seguimientos'); // Importa el router de seguimientos
const authRouter = require('./routes/auth'); // Importa el router de autenticación

const app = express();
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON

// Usa los routers
app.use('/notificaciones', notificationsRouter); // Usa el router de notificaciones
app.use('/roles', rolesRouter); // Usa el router de roles
app.use('/permisos', permissionsRouter); // Usa el router de permisos
app.use('/usuarios', usersRoutes); // Configura las rutas de usuarios
app.use('/casos', casosRouter); // Usa el router de casos clínicos
app.use('/seguimientos', seguimientosRouter); // Usa el router de seguimientos
app.use('/auth', authRouter); // Usa el router de autenticación

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Imprime el error en la consola
    res.status(500).json({ error: 'Algo salió mal, por favor intenta nuevamente.' }); // Respuesta genérica
});

const PORT = process.env.PORT || 5000; // Puerto en el que se ejecutará el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`); // Mensaje de inicio del servidor
});