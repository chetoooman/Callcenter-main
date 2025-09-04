import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import LayoutAgente from "./Components/layouts/LayoutAgente";
import LayoutSupervisor from "./Components/layouts/LayoutSupervisor";
import LayoutAdmin from "./Components/layouts/LayoutAdmin";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) {
      setUsuario(JSON.parse(data));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />

        {/* Agente con Layout */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute usuario={usuario} rol="agente">
              <LayoutAgente />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="historial" element={<div>📜 Historial</div>} />
          <Route path="perfil" element={<div>👤 Perfil</div>} />
        </Route>

        {/* Supervisor con Layout */}
        <Route
          path="/supervisor/*"
          element={
            <PrivateRoute usuario={usuario} rol="supervisor">
              <LayoutSupervisor />
            </PrivateRoute>
          }
        >
          <Route index element={<SupervisorDashboard />} />
          <Route path="agentes" element={<div>👥 Agentes</div>} />
          <Route path="reportes" element={<div>📊 Reportes</div>} />
        </Route>

        {/* Admin con Layout */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute usuario={usuario} rol="admin">
              <LayoutAdmin />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="usuarios" element={<div>👥 Usuarios</div>} />
          <Route path="pausas" element={<div>⏸️ Pausas</div>} />
          <Route path="tipificaciones" element={<div>🏷️ Tipificaciones</div>} />
        </Route>

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
