// src/components/Statistics.js
import React, { useEffect, useState } from 'react'; // Importamos React, useEffect y useState
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP

const Statistics = () => {
    // Estado para almacenar las estadísticas
    const [estadisticas, setEstadisticas] = useState({});

    // Efecto para obtener las estadísticas al cargar el componente
    useEffect(() => {
        const fetchEstadisticas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/estadisticas'); // Solicitud GET para obtener estadísticas
                setEstadisticas(response.data); // Actualiza el estado con las estadísticas
            } catch (error) {
                console.error('Error al obtener estadísticas:', error); // Manejo de errores
            }
        };

        fetchEstadisticas(); // Llama a la función para obtener estadísticas
    }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

    return (
        <div>
            <h2>Estadísticas</h2>
            <ul>
                <li>Total de Pacientes: {estadisticas.totalPacientes}</li>
                <li>Total de Casos Clínicos: {estadisticas.totalCasosClinicos}</li>
                <li>Total de Seguimientos: {estadisticas.totalSeguimientos}</li>
                <li>Total de Citas: {estadisticas.totalCitas}</li>
            </ul>
        </div>
    );
};

export default Statistics; // Exportamos el componente para usarlo en otras partes de la aplicación