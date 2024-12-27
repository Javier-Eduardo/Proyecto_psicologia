// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Asegúrate de importar el AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider> {/* Envuelve tu aplicación con AuthProvider */}
            <App />
        </AuthProvider>
    </React.StrictMode>
);