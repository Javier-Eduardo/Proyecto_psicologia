// src/components/FollowUps.js
import React, { useEffect, useState } from 'react'; // Importamos React, useEffect y useState
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP

const FollowUps = () => {
    // Estado para almacenar la lista de seguimientos
    const [seguimientos, setSeguimientos] = useState([]);
    const [idCaso, setIdCaso] = useState(''); // Estado para almacenar el ID del caso seleccionado
    const [observaciones, setObservaciones] = useState(''); // Estado para almacenar observaciones
    const [accionesTomadas, setAccionesTomadas] = useState(''); // Estado para almacenar acciones tomadas

    // Efecto para obtener la lista de seguimientos al cargar el componente
    useEffect(() => {
        const fetchSeguimientos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/seguimientos'); // Cambiado a puerto 5000
                setSeguimientos(response.data); // Actualiza el estado con la lista de seguimientos
            } catch (error) {
                console.error('Error al obtener seguimientos:', error); // Manejo de errores
            }
        };

        fetchSeguimientos(); // Llama a la función para obtener seguimientos
    }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

    // Maneja el envío del formulario para agregar un nuevo seguimiento
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            const newFollowUp = { id_caso: idCaso, observaciones, acciones_tomadas: accionesTomadas };
            const response = await axios.post('http://localhost:5000/seguimientos', newFollowUp); // Cambiado a puerto 5000
            console.log('Seguimiento agregado:', response.data); // Muestra el seguimiento agregado en la consola
            setSeguimientos([...seguimientos, response.data]); // Actualiza la lista de seguimientos
            setIdCaso(''); // Reinicia el campo de ID de caso
            setObservaciones(''); // Reinicia el campo de observaciones
            setAccionesTomadas(''); // Reinicia el campo de acciones tomadas
        } catch (error) {
            console.error('Error al agregar seguimiento:', error); // Manejo de errores
        }
    };

    return (
        <div>
            <h2>Lista de Seguimientos</h2>
            <ul>
                {seguimientos.map((seguimiento) => (
                    <li key={seguimiento.id_seguimiento}>
                        Caso ID: {seguimiento.id_caso}, Observaciones: {seguimiento.observaciones}, Acciones: {seguimiento.acciones_tomadas}
                    </li> // Muestra información básica de cada seguimiento
                ))}
            </ul>

            <h3>Agregar Seguimiento</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="ID del Caso" value={idCaso} onChange={(e) => setIdCaso(e.target.value)} required />
                <textarea placeholder="Observaciones" value={observaciones} onChange={(e) => setObservaciones(e.target.value)} required />
                <textarea placeholder="Acciones Tomadas" value={accionesTomadas} onChange={(e) => setAccionesTomadas(e.target.value)} />
                <button type="submit">Agregar Seguimiento</button>
            </form>
        </div>
    );
};

export default FollowUps; // Exportamos el componente para usarlo en otras partes de la aplicación