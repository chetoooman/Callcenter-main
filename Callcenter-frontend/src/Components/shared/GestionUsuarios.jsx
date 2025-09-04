import React, { useEffect, useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import api from '../../services/api';

const rolesDisponibles = ['agente', 'supervisor', 'admin', 'super_admin'];

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    username: '',
    correo: '',
    password: '',
    rol: 'agente'
  });

  const cargarUsuarios = async () => {
    try {
      const res = await api.get('/admin/usuarios');
      setUsuarios(res.data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/usuarios', form);
      setForm({ nombre: '', username: '', correo: '', password: '', rol: 'agente' });
      await cargarUsuarios();
    } catch (err) {
      console.error('Error al crear usuario:', err);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1000px',
        mx: 'auto',
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 3,
          borderRadius: 'var(--border-radius)',
          backgroundColor: '#fff',
          border: '2px solid var(--color-secundary)' // ✅ borde azul
        }}
      >
        {/* ✅ Título centrado dentro del Paper */}
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 3, fontWeight: 600, color: 'var(--color-text)' }}
        >
          👤 Gestión de Usuarios
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3
          }}
        >
          <TextField
            name="nombre"
            label="Nombre"
            value={form.nombre}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            name="username"
            label="Username"
            value={form.username}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            name="correo"
            label="Correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            name="password"
            label="Contraseña"
            type="password"
            value={form.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="rol-label">Rol</InputLabel>
            <Select
              labelId="rol-label"
              name="rol"
              value={form.rol}
              label="Rol"
              onChange={handleChange}
            >
              {rolesDisponibles.map((rol) => (
                <MenuItem key={rol} value={rol}>
                  {rol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ width: '100%', textAlign: 'right' }}>
            <Button
              type="submit"
              variant="outlined" // ✅ para usar borde visible
              sx={{
                textTransform: 'none',
                borderRadius: 'var(--border-radius)',
                color: 'var(--color-primary)',
                border: '2px solid var(--color-primary)',
                '&:hover': {
                  backgroundColor: 'var(--color-secundary)',
                  color: '#fff',
                  borderColor: 'var(--color-secundary)'
                }
              }}
            >
              Crear usuario
            </Button>
          </Box>
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 1, color: 'var(--color-text)' }}>
          Usuarios existentes
        </Typography>

        <List dense>
          {usuarios.map(({ id, nombre, username, rol }) => (
            <ListItem key={id} sx={{ px: 0 }}>
              <ListItemText
                primary={`${nombre} (${username})`}
                secondary={rol}
                primaryTypographyProps={{ color: 'var(--color-text)' }}
                secondaryTypographyProps={{ color: 'var(--color-info)' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default GestionUsuarios;


