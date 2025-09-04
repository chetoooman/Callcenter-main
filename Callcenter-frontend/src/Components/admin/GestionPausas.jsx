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

const GestionPausas = () => {
  const [pausas, setPausas] = useState([]);
  const [nuevoMotivo, setNuevoMotivo] = useState('');

  const cargarPausas = async () => {
    try {
      const res = await api.get('/agente/pausas');
      setPausas(res.data);
    } catch (err) {
      console.error('Error al cargar pausas:', err);
    }
  };

  const agregarPausa = async () => {
    if (!nuevoMotivo.trim()) return;
    try {
      await api.post('/admin/pausas', { motivo: nuevoMotivo });
      setNuevoMotivo('');
      await cargarPausas();
    } catch (err) {
      console.error('Error al agregar pausa:', err);
    }
  };

  useEffect(() => {
    cargarPausas();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarPausa();
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
          ⏸️ Gestión de Pausas
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', gap: 2, mb: 3 }}
        >
          <TextField
            label="Nuevo motivo"
            name="nuevoMotivo"
            value={nuevoMotivo}
            onChange={(e) => setNuevoMotivo(e.target.value)}
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
          {pausas.map(({ id, motivo }) => (
            <ListItem key={id} sx={{ px: 0 }}>
              <ListItemText
                primary={motivo}
                primaryTypographyProps={{ color: 'var(--color-text)' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default GestionPausas;


