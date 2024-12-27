// src/components/ExportReports.js
import React from 'react'; // Importamos React
import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP

const ExportReports = () => {
    // Función para exportar informes en formato CSV
    const exportToCSV = async () => {
        try {
            const response = await axios.get('http://localhost:5000/exportar-informes', {
                responseType: 'blob', // Para manejar archivos binarios
            });

            // Crear un enlace para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'informes.csv'); // Nombre del archivo a descargar
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error al exportar informes:', error); // Manejo de errores
        }
    };

    return (
        <div>
            <h2>Exportar Informes</h2>
            <button onClick={exportToCSV}>Exportar a CSV</button>
        </div>
    );
};

export default ExportReports; // Exportamos el componente para usarlo en otras partes de la aplicación