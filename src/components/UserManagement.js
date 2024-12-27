// src/components/UserManagement.js
import React, { useEffect, useState } from 'react'; // Importamos React, useEffect y useState
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP

const UserManagement = () => {
    // Estado para almacenar la lista de usuarios
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre del usuario
    const [apellido, setApellido] = useState(''); // Estado para almacenar el apellido del usuario
    const [email, setEmail] = useState(''); // Estado para almacenar el email del usuario
    const [telefono, setTelefono] = useState(''); // Estado para almacenar el teléfono del usuario
    const [idUsuario, setIdUsuario] = useState(null); // Estado para almacenar el ID del usuario a editar

    // Efecto para obtener la lista de usuarios al cargar el componente
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/usuarios'); // Solicitud GET para obtener usuarios
                setUsuarios(response.data); // Actualiza el estado con la lista de usuarios
            } catch (error) {
                console.error('Error al obtener usuarios:', error); // Manejo de errores
            }
        };

        fetchUsuarios(); // Llama a la función para obtener usuarios
    }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

    // Maneja el envío del formulario para agregar o editar un usuario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            const usuarioData = { nombre, apellido, email, telefono };
            if (idUsuario) {
                // Si hay un ID de usuario, se está editando
                await axios.put(`http://localhost:5000/usuarios/${idUsuario}`, usuarioData); // Solicitud PUT para editar usuario
            } else {
                // Si no hay ID, se está agregando un nuevo usuario
                await axios.post('http://localhost:5000/usuarios', usuarioData); // Solicitud POST para agregar usuario
            }
            // Reiniciar el formulario
            setNombre('');
            setApellido('');
            setEmail('');
            setTelefono('');
            setIdUsuario(null);
            // Volver a obtener la lista de usuarios
            const response = await axios.get('http://localhost:5000/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al agregar/editar usuario:', error); // Manejo de errores
        }
    };

    // Maneja la edición de un usuario
    const handleEdit = (usuario) => {
        setNombre(usuario.nombre);
        setApellido(usuario.apellido);
        setEmail(usuario.email);
        setTelefono(usuario.telefono);
        setIdUsuario(usuario.id_usuario); // Establece el ID del usuario a editar
    };

    // Maneja la eliminación de un usuario
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/usuarios/${id}`); // Solicitud DELETE para eliminar usuario
            // Volver a obtener la lista de usuarios
            const response = await axios.get('http://localhost:5000/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al eliminar usuario:', error); // Manejo de errores
        }
    };

    return (
        <div>
            <h2>Gestión de Usuarios</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <button type="submit">{idUsuario ? 'Actualizar Usuario' : 'Agregar Usuario'}</button>
            </form>
            <h3>Lista de Usuarios</h3>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id_usuario}>
                        {usuario.nombre} {usuario.apellido} - {usuario.email} - {usuario.telefono}
                        <button onClick={() => handleEdit(usuario)}>Editar</button>
                        <button onClick={() => handleDelete(usuario.id_usuario)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement; // Exportamos el componente para usarlo en otras partes de la aplicación