import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert
} from '@mui/material';
import { useAuth } from '../context/authContext';
import api from '../services/api';

const EditarUsuario = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    correo: user?.correo || '',
    actual: '',
    nueva: '',
    confirmar: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (formData.nueva && formData.nueva !== formData.confirmar) {
      setError('La nueva contraseña y la confirmación no coinciden.');
      return;
    }

    try {
      const res = await api.put('/auth/editar-usuario', {
        nombre: formData.nombre,
        correo: formData.correo,
        actual: formData.actual,
        nueva: formData.nueva
      });

      // Actualizar datos en el contexto
      login(localStorage.getItem('token'), res.data.usuario);
      setMensaje('Usuario actualizado correctamente.');
      setFormData(prev => ({ ...prev, actual: '', nueva: '', confirmar: '' }));
    } catch (err) {
      setError('Error al actualizar los datos. Verifica tu contraseña.');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Paper sx={{ p: 3, background: 'var(--principal-cont)' }} elevation={4}>
        <Typography variant="h6" sx={{ mb: 2, color: 'var(--color-text)' }}>
          Editar usuario
        </Typography>

        {mensaje && <Alert severity="success">{mensaje}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Correo"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña actual"
            type="password"
            name="actual"
            value={formData.actual}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nueva contraseña (opcional)"
            type="password"
            name="nueva"
            value={formData.nueva}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirmar nueva contraseña"
            type="password"
            name="confirmar"
            value={formData.confirmar}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Guardar cambios
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditarUsuario;
