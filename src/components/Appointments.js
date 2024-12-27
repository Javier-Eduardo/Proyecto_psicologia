// src/components/Appointments.js
import React, { useEffect, useState } from 'react'; // Importamos React, useEffect y useState
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP

const Appointments = () => {
    // Estado para almacenar la lista de citas
    const [citas, setCitas] = useState([]);
    const [idPaciente, setIdPaciente] = useState(''); // Estado para almacenar el ID del paciente
    const [fecha, setFecha] = useState(''); // Estado para almacenar la fecha de la cita
    const [hora, setHora] = useState(''); // Estado para almacenar la hora de la cita

    // Efecto para obtener la lista de citas al cargar el componente
    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/citas'); // Cambiado a puerto 5000
                setCitas(response.data); // Actualiza el estado con la lista de citas
            } catch (error) {
                console.error('Error al obtener citas:', error); // Manejo de errores
            }
        };

        fetchCitas(); // Llama a la función para obtener citas
    }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

    // Maneja el envío del formulario para agregar una nueva cita
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            const nuevaCita = { id_paciente: idPaciente, fecha, hora };
            const response = await axios.post('http://localhost:5000/citas', nuevaCita); // Cambiado a puerto 5000
            console.log('Cita agregada:', response.data); // Muestra la cita agregada en la consola
            setCitas([...citas, response.data]); // Actualiza la lista de citas
            setIdPaciente(''); // Reinicia el campo de ID de paciente
            setFecha(''); // Reinicia el campo de fecha
            setHora(''); // Reinicia el campo de hora
        } catch (error) {
            console.error('Error al agregar cita:', error); // Manejo de errores
        }
    };

    // Maneja la eliminación de una cita
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/citas/${id}`); // Cambiado a puerto 5000
            setCitas(citas.filter(cita => cita.id_cita !== id)); // Actualiza la lista de citas
        } catch (error) {
            console.error('Error al eliminar cita:', error); // Manejo de errores
        }
    };

    return (
        <div>
            <h2>Lista de Citas</h2>
            <ul>
                {citas.map((cita) => (
                    <li key={cita.id_cita}>
                        Paciente ID: {cita.id_paciente}, Fecha: {cita.fecha}, Hora: {cita.hora}
                        <button onClick={() => handleDelete(cita.id_cita)}>Eliminar</button>
                    </li> // Muestra información básica de cada cita
                ))}
            </ul>

            <h3>Agregar Cita</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="ID del Paciente" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} required />
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
                <button type="submit">Agregar Cita</button>
            </form>
        </div>
    );
};

export default Appointments; // Exportamos el componente para usarlo en otras partes de la aplicación