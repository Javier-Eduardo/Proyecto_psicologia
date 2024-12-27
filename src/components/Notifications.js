// src/components/Notifications.js
import React, { useEffect, useState } from 'react'; // Importamos React, useEffect y useState
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP

const Notifications = () => {
    // Estado para almacenar la lista de notificaciones
    const [notificaciones, setNotificaciones] = useState([]);
    const [mensaje, setMensaje] = useState(''); // Estado para almacenar el mensaje de la notificación

    // Efecto para obtener la lista de notificaciones al cargar el componente
    useEffect(() => {
        const fetchNotificaciones = async () => {
            try {
                const response = await axios.get('http://localhost:5000/notificaciones'); // Solicitud GET para obtener notificaciones
                setNotificaciones(response.data); // Actualiza el estado con la lista de notificaciones
            } catch (error) {
                console.error('Error al obtener notificaciones:', error); // Manejo de errores
            }
        };

        fetchNotificaciones(); // Llama a la función para obtener notificaciones
    }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

    // Maneja el envío del formulario para agregar una nueva notificación
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            const nuevaNotificacion = { mensaje };
            const response = await axios.post('http://localhost:5000/notificaciones', nuevaNotificacion); // Solicitud POST para agregar una nueva notificación
            console.log('Notificación agregada:', response.data); // Muestra la notificación agregada en la consola
            setNotificaciones([...notificaciones, response.data]); // Actualiza la lista de notificaciones
            setMensaje(''); // Reinicia el campo de mensaje
        } catch (error) {
            console.error('Error al agregar notificación:', error); // Manejo de errores
        }
    };

    return (
        <div>
            <h2>Lista de Notificaciones</h2>
            <ul>
                {notificaciones.map((notificacion) => (
                    <li key={notificacion.id_notificacion}>
                        {notificacion.mensaje}
                    </li> // Muestra el mensaje de cada notificación
                ))}
            </ul>

            <h3>Agregar Notificación</h3>
            <form onSubmit={handleSubmit}>
                <textarea placeholder="Mensaje de la Notificación" value={mensaje} onChange={(e) => setMensaje(e.target.value)} required />
                <button type="submit">Agregar Notificación</button>
            </form>
        </div>
    );
};

export default Notifications; // Exportamos el componente para usarlo en otras partes de la aplicación