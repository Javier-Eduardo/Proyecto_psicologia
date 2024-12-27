// src/components/Reports.js
import React, { useEffect, useState } from 'react'; // Importamos React, useEffect y useState
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP

const Reports = () => {
    // Estado para almacenar la lista de informes
    const [informes, setInformes] = useState([]);
    const [idPaciente, setIdPaciente] = useState(''); // Estado para almacenar el ID del paciente
    const [contenido, setContenido] = useState(''); // Estado para almacenar el contenido del informe

    // Efecto para obtener la lista de informes al cargar el componente
    useEffect(() => {
        const fetchInformes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/informes'); // Solicitud GET para obtener informes
                setInformes(response.data); // Actualiza el estado con la lista de informes
            } catch (error) {
                console.error('Error al obtener informes:', error); // Manejo de errores
            }
        };

        fetchInformes(); // Llama a la función para obtener informes
    }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

    // Maneja el envío del formulario para agregar un nuevo informe
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            const nuevoInforme = { id_paciente: idPaciente, contenido };
            const response = await axios.post('http://localhost:5000/informes', nuevoInforme); // Solicitud POST para agregar un nuevo informe
            console.log('Informe agregado:', response.data); // Muestra el informe agregado en la consola
            setInformes([...informes, response.data]); // Actualiza la lista de informes
            setIdPaciente(''); // Reinicia el campo de ID de paciente
            setContenido(''); // Reinicia el campo de contenido
        } catch (error) {
            console.error('Error al agregar informe:', error); // Manejo de errores
        }
    };

    return (
        <div>
            <h2>Lista de Informes</h2>
            <ul>
                {informes.map((informe) => (
                    <li key={informe.id_informe}>
                        Paciente ID: {informe.id_paciente}, Contenido: {informe.contenido}
                    </li> // Muestra información básica de cada informe
                ))}
            </ul>

            <h3>Agregar Informe</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="ID del Paciente" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} required />
                <textarea placeholder="Contenido del Informe" value={contenido} onChange={(e) => setContenido(e.target.value)} required />
                <button type="submit">Agregar Informe</button>
            </form>
        </div>
    );
};

export default Reports; // Exportamos el componente para usarlo en otras partes de la aplicación