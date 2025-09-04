import React, { useEffect, useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import api from '../../services/api';

const GestionTipificaciones = () => {
  const [tipificaciones, setTipificaciones] = useState([]);
  const [nueva, setNueva] = useState('');

  const cargarTipificaciones = async () => {
    try {
      const res = await api.get('/admin/tipificaciones');
      setTipificaciones(res.data);
    } catch (err) {
      console.error('Error al cargar tipificaciones:', err);
    }
  };

  const agregar = async () => {
    if (!nueva.trim()) return;
    try {
      await api.post('/admin/tipificaciones', { nombre: nueva });
      setNueva('');
      await cargarTipificaciones();
    } catch (err) {
      console.error('Error al agregar tipificación:', err);
    }
  };

  useEffect(() => {
    cargarTipificaciones();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    agregar();
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
          border: '2px solid var(--color-secundary)'
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 3, fontWeight: 600, color: 'var(--color-text)' }}
        >
          📋 Tipificaciones
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', gap: 2, mb: 3 }}
        >
          <TextField
            label="Nueva tipificación"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Button
            type="submit"
            variant="outlined"
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
            Agregar
          </Button>
        </Box>

        <List dense>
          {tipificaciones.map(({ id, nombre }) => (
            <ListItem key={id} sx={{ px: 0 }}>
              <ListItemText
                primary={nombre}
                primaryTypographyProps={{ color: 'var(--color-text)' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default GestionTipificaciones;


