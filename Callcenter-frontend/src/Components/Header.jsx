import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../context/authContext';

const Header = ({ toggleSidebar }) => {
  const { logout, user } = useContext(AuthContext);
  const [fechaHora, setFechaHora] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  // Actualiza fecha y hora en tiempo real
  useEffect(() => {
    const actualizarFechaHora = () => {
      const ahora = new Date();
      const fecha = ahora.toLocaleDateString();
      const hora = ahora.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setFechaHora(`${fecha} ${hora}`);
    };

    actualizarFechaHora();
    const intervalo = setInterval(actualizarFechaHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  // Para el menú de perfil
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const avatarSrc = user?.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nombre || 'Usuario')}&background=random`;

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        backgroundImage: 'linear-gradient(to right, #12608a,rgb(103, 166, 200), #12608a)',
        color: '#fff',
        height: '64px',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        {/* Izquierda: botón menú + nombre app */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleSidebar} sx={{ color: '#fff' }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', userSelect: 'none', color: '#fff' }}
          >
            FreyIA
          </Typography>
        </Box>

        {/* Centro: logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
          <img
            src="/imagenes/singularity.png"
            alt="Logo FreIA"
            style={{
              height: '80px',
              objectFit: 'contain'
            }}
          />
        </Box>

        {/* Derecha: hora + perfil + logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 400, userSelect: 'none' }}
          >
            {fechaHora}
          </Typography>

          {/* Avatar + Menú de usuario */}
          <IconButton onClick={handleOpenMenu}>
            <Avatar alt={user?.nombre} src={avatarSrc} sx={{ width: 36, height: 36 }} />
          </IconButton>
          <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleCloseMenu}
  PaperProps={{ sx: { p: 2, background: 'var(--principal-cont)' } }}
>
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Typography variant="subtitle1" sx={{ color: 'var(--color-text)' }}>
      {user?.nombre}
    </Typography>
    <Typography variant="body2" sx={{ color: 'var(--color-text)' }}>
      #{user?.numero_empleado || user?.id}
    </Typography>
    <Typography variant="body2" sx={{ color: 'var(--color-text)' }}>
      {user?.correo}
    </Typography>
    <Typography variant="body2" sx={{ color: 'var(--color-text)' }}>
      Rol: {user?.rol}
    </Typography>

    {/* Solo para admin/super_admin */}
    {(user?.rol === 'admin' || user?.rol === 'super_admin') && (
  <MenuItem
    onClick={() => {
      handleCloseMenu();
      navigate('/editar-usuario');
    }}
  >
    Editar usuario
  </MenuItem>
)}

  </Box>
</Menu>


          {/* Logout */}
          <IconButton onClick={logout} sx={{ color: '#fff' }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;





