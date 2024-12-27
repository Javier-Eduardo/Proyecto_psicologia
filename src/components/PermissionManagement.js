// src/components/PermissionManagement.js
import React, { useEffect, useState } from 'react'; // Importamos React, useEffect y useState
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP

const PermissionManagement = () => {
    // Estado para almacenar la lista de roles y permisos
    const [roles, setRoles] = useState([]);
    const [permisos, setPermisos] = useState([]); // Estado para almacenar los permisos disponibles
    const [selectedRoleId, setSelectedRoleId] = useState(''); // ID del rol seleccionado
    const [selectedPermissions, setSelectedPermissions] = useState([]); // Permisos seleccionados

    // Efecto para obtener la lista de roles y permisos al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const rolesResponse = await axios.get('http://localhost:5000/roles'); // Obtener roles
                const permisosResponse = await axios.get('http://localhost:5000/permisos'); // Obtener permisos
                setRoles(rolesResponse.data); // Actualiza el estado con la lista de roles
                setPermisos(permisosResponse.data); // Actualiza el estado con la lista de permisos
            } catch (error) {
                console.error('Error al obtener roles o permisos:', error); // Manejo de errores
            }
        };

        fetchData(); // Llama a la función para obtener datos
    }, []); // El arreglo vacío asegura que se ejecute solo una vez al montar el componente

    // Maneja el envío del formulario para asignar permisos a un rol
    const handlePermissionAssignment = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        try {
            await axios.post('http://localhost:5000/roles/permisos', {
                id_rol: selectedRoleId,
                permisos: selectedPermissions
            }); // Solicitud POST para asignar permisos
            console.log('Permisos asignados al rol:', selectedRoleId); // Muestra el rol y permisos asignados en la consola
            // Aquí podrías actualizar la lista de roles o permisos si es necesario
        } catch (error) {
            console.error('Error al asignar permisos:', error); // Manejo de errores
        }
    };

    // Maneja el cambio de selección de permisos
    const handlePermissionChange = (permissionId) => {
        setSelectedPermissions((prev) => {
            if (prev.includes(permissionId)) {
                return prev.filter((id) => id !== permissionId); // Eliminar permiso si ya está seleccionado
            } else {
                return [...prev, permissionId]; // Agregar permiso si no está seleccionado
            }
        });
    };

    return (
        <div>
            <h2>Asignar Permisos a Roles</h2>
            <form onSubmit={handlePermissionAssignment}>
                <select onChange={(e) => setSelectedRoleId(e.target.value)} required>
                    <option value="">Selecciona un rol</option>
                    {roles.map((rol) => (
                        <option key={rol.id_rol} value={rol.id_rol}>
                            {rol.nombre_rol}
                        </option>
                    ))}
                </select>
                <div>
                    <h3>Selecciona Permisos</h3>
                    {permisos.map((permiso) => (
                        <div key={permiso.id_permiso}>
                            <input
                                type="checkbox"
                                value={permiso.id_permiso}
                                onChange={() => handlePermissionChange(permiso.id_permiso)}
                            />
                            {permiso.nombre_permiso}
                        </div>
                    ))}
                </div>
                <button type="submit">Asignar Permisos</button>
            </form>
        </div>
    );
};

export default PermissionManagement; // Exportamos el componente para usarlo en otras partes de la aplicación