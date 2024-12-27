// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ClinicalCases from './components/ClinicalCases';
import FollowUps from './components/FollowUps';
import UserRoles from './components/UserRoles';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import Reports from './components/Reports';
import Notifications from './components/Notifications';
import Statistics from './components/Statistics';
import ExportReports from './components/ExportReports';
import UserManagement from './components/UserManagement'; // Importamos el nuevo componente de gestión de usuarios
import RoleManagement from './components/RoleManagement'; // Importamos el nuevo componente de gestión de roles
import PermissionManagement from './components/PermissionManagement'; // Importamos el nuevo componente de gestión de permisos
import ProtectedRoute from './components/ProtectedRoute'; // Importa el componente de ruta protegida

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clinical-cases" element={<ClinicalCases />} />
                <Route path="/follow-ups" element={<FollowUps />} />
                <Route path="/user-roles" element={<UserRoles />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/export-reports" element={<ExportReports />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/role-management" element={<RoleManagement />} />
                <Route path="/permission-management" element={<PermissionManagement />} /> {/* Nueva ruta para gestión de permisos */}
                <Route path="/permission-management" element={<ProtectedRoute element={<PermissionManagement />} />} />
            </Routes>
        </Router>
    );
}

export default App; // Exportamos el componente App