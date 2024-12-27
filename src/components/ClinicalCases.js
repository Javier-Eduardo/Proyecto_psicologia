// src/components/ClinicalCases.js
import React, { useEffect, useState } from 'react'; // Importamos React, useEffect y useState
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP

const ClinicalCases = () => {
    // Estado para almacenar la lista de casos clínicos
    const [casos, setCasos] = useState([]);

    // Efecto para obtener la lista de casos clínicos al cargar el componente
    useEffect(() => {
        const fetchCasos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/casos'); // Cambiado a puerto 5000
                setCasos(response.data); // Actualiza el estado con la lista de casos clínicos
            } catch (error) {
                console.error('Error al obtener casos clínicos:', error); // Manejo de errores
            }
        };

        fetchCasos(); // Llama a la función para obtener casos clínicos
    }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

    return (
        <div>
            <h2>Lista de Casos Clínicos</h2>
            <ul>
                {casos.map((caso) => (
                    <li key={caso.id_caso}>
                        Paciente ID: {caso.id_paciente}, Psicólogo ID: {caso.id_psicologo}, Estado: {caso.estado}
                    </li> // Muestra información básica de cada caso clínico
                ))}
            </ul>
        </div>
    );
};

export default ClinicalCases; // Exportamos el componente para usarlo en otras partes de la aplicación