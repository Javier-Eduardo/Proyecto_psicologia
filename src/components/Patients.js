// src/components/Patients.js
import React, { useEffect, useState } from 'react'; // Importamos React, useEffect y useState
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP

const Patients = () => {
    // Estado para almacenar la lista de pacientes
    const [pacientes, setPacientes] = useState([]);
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del paciente
    const [apellido, setApellido] = useState(''); // Estado para almacenar el apellido del paciente
    const [email, setEmail] = useState(''); // Estado para almacenar el email del paciente
    const [telefono, setTelefono] = useState(''); // Estado para almacenar el teléfono del paciente

    // Efecto para obtener la lista de pacientes al cargar el componente
    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/pacientes'); // Solicitud GET para obtener pacientes
                setPacientes(response.data); // Actualiza el estado con la lista de pacientes
            } catch (error) {
                console.error('Error al obtener pacientes:', error); // Manejo de errores
            }
        };

        fetchPacientes(); // Llama a la función para obtener pacientes
    }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

    // Maneja el envío del formulario para agregar un nuevo paciente
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            const newPatient = { nombre, apellido, email, telefono };
            const response = await axios.post('http://localhost:5000/pacientes', newPatient); // Solicitud POST para agregar un nuevo paciente
            console.log('Paciente agregado:', response.data); // Muestra el paciente agregado en la consola
            setPacientes([...pacientes, response.data]); // Actualiza la lista de pacientes
            setNombre(''); // Reinicia el campo de nombre
            setApellido(''); // Reinicia el campo de apellido
            setEmail(''); // Reinicia el campo de email
            setTelefono(''); // Reinicia el campo de teléfono
        } catch (error) {
            console.error('Error al agregar paciente:', error); // Manejo de errores
        }
    };

    return (
        <div>
            <h2>Lista de Pacientes</h2>
            <ul>
                {pacientes.map((paciente) => (
                    <li key={paciente.id_paciente}>
                        {paciente.nombre} {paciente.apellido} - Email: {paciente.email} - Teléfono: {paciente.telefono}
                    </li> // Muestra información básica de cada paciente
                ))}
            </ul>

            <h3>Agregar Paciente</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <button type="submit">Agregar Paciente</button>
            </form>
        </div>
    );
};

export default Patients; // Exportamos el componente para usarlo en otras partes de la aplicación