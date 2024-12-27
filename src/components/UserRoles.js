// src/components/UserRoles.js
import React, { useEffect, useState } from 'react'; // Importamos React, useEffect y useState
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP

const UserRoles = () => {
    // Estado para almacenar la lista de usuarios y roles
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]); // Estado para almacenar los roles disponibles
    const [selectedUserId, setSelectedUserId] = useState(''); // ID del usuario seleccionado
    const [selectedRoleId, setSelectedRoleId] = useState(''); // ID del rol seleccionado

    // Efecto para obtener la lista de usuarios y roles al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usuariosResponse = await axios.get('http://localhost:5000/usuarios'); // Obtener usuarios
                const rolesResponse = await axios.get('http://localhost:5000/roles'); // Obtener roles
                setUsuarios(usuariosResponse.data); // Actualiza el estado con la lista de usuarios
                setRoles(rolesResponse.data); // Actualiza el estado con la lista de roles
            } catch (error) {
                console.error('Error al obtener usuarios o roles:', error); // Manejo de errores
            }
        };

        fetchData(); // Llama a la función para obtener datos
    }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

    // Maneja el envío del formulario para asignar un rol a un usuario
    const handleRoleAssignment = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            const response = await axios.post('http://localhost:5000/roles/usuario-rol', { // Corrección aquí
                id_usuario: selectedUserId,
                id_rol: selectedRoleId
            }); // Solicitud POST para asignar un rol
            console.log('Rol asignado:', response.data); // Muestra el rol asignado en la consola
            // Aquí podrías actualizar la lista de usuarios o roles si es necesario
        } catch (error) {
            console.error('Error al asignar rol:', error); // Manejo de errores
        }
    };

    return (
        <div>
            <h2>Asignar Roles a Usuarios</h2>
            <form onSubmit={handleRoleAssignment}>
                <select onChange={(e) => setSelectedUserId(e.target.value)} required>
                    <option value="">Selecciona un usuario</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id_usuario} value={usuario.id_usuario}>
                            {usuario.nombre} {usuario.apellido}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => setSelectedRoleId(e.target.value)} required>
                    <option value="">Selecciona un rol</option>
                    {roles.map((rol) => (
                        <option key={rol.id_rol} value={rol.id_rol}>
                            {rol.nombre_rol}
                        </option>
                    ))}
                </select>
                <button type="submit">Asignar Rol</button>
            </form>
        </div>
    );
};

export default UserRoles; // Exportamos el componente para usarlo en otras partes de la aplicación