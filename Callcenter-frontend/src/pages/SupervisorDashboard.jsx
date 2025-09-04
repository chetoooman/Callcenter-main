// src/pages/SupervisorDashboard.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import TablaAgentes from '../Components/supervisor/TablaAgentes';
import HistorialCompleto from '../Components/supervisor/HistorialCompleto';

const SupervisorDashboard = () => {
  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Título */}
      <Typography variant="h5" sx={{ color: 'var(--color-text)' }}>
        Panel del Supervisor
      </Typography>

      {/* Tabla de agentes */}
      <Box>
        <TablaAgentes />
      </Box>

      {/* Historial completo */}
      <Box>
        <HistorialCompleto />
      </Box>
    </Box>
  );
};

export default SupervisorDashboard;


