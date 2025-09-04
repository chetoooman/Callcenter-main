import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import GestionUsuarios from '../Components/shared/GestionUsuarios';
import GestionPausas from '../Components/admin/GestionPausas';
import GestionTipificaciones from '../Components/admin/GestionTipificaciones';
import { Box, Typography } from '@mui/material';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  return (
    <Box
      sx={{
        maxWidth: '1000px',
        margin: '0 auto',
        mt: 6,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Panel Administrativo
      </Typography>

      <GestionUsuarios />
      <GestionPausas />
      <GestionTipificaciones />
    </Box>
  );
};

export default AdminDashboard;

