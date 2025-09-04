import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../shared/Sidebar';
import Header from '../Header';

const drawerWidth = 240;
const collapsedWidth = 56;

const LayoutAdmin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);

  const toggleSidebar = () => setOpen(prev => !prev);

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Sidebar lateral */}
      <Sidebar
        open={open}
        toggleSidebar={toggleSidebar}
        variant="persistent"
      />

      {/* Área principal (Header + contenido) */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header superior */}
        <Header toggleSidebar={toggleSidebar} open={open} />

        {/* Contenedor principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
            pt: '80px', // espacio para el header
            transition: 'margin-left 0.3s ease',
            bgcolor: 'background.default',
            //minHeight: 'calc(100vh - 80px)', // asegura ocupar toda la altura visible
            //height: '100%'
          }}
        >
          {/* Contenido central del dashboard */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '1000px'
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutAdmin;








