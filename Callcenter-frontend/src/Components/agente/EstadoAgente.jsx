import { useEffect, useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import api from '../../services/api';
import { useAgente } from '../../context/AgenteContext';

const EstadoAgente = () => {
  const { estadoAgente, setEstadoAgente } = useAgente();
  const [pausas, setPausas] = useState([]);
  const [pausaId, setPausaId] = useState('');
  const [mostrandoMotivos, setMostrandoMotivos] = useState(false);

  useEffect(() => {
    obtenerEstado();
  }, []);

  const obtenerEstado = async () => {
    try {
      const res = await api.get('/agente/estado');
      setEstadoAgente(res.data.estado);
    } catch (err) {
      console.error('Error al obtener estado:', err);
    }
  };

  const activar = async () => {
    try {
      await api.post('/agente/estado', { estado: 'activo' });
      setEstadoAgente('activo');
    } catch (err) {
      console.error('Error al activar agente:', err);
    }
  };

  const pausar = async () => {
    try {
      const res = await api.get('/agente/pausas');
      setPausas(res.data);
      setMostrandoMotivos(true);
    } catch (err) {
      console.error('Error al obtener pausas:', err);
    }
  };

  const confirmarPausa = async () => {
    if (!pausaId) return alert('Selecciona un motivo de pausa');

    try {
      await api.post('/agente/estado', { estado: 'pausa', pausa_id: pausaId });
      setEstadoAgente('pausa');
      setMostrandoMotivos(false);
      setPausaId('');
    } catch (err) {
      console.error('Error al pausar agente:', err);
    }
  };

  const getEstadoVisual = (estado) => {
    const lower = estado?.toLowerCase();
    if (lower === 'activo') return { texto: '🟢 Activo', color: 'green' };
    if (lower === 'en_llamada') return { texto: '🔴 En llamada', color: 'red' };
    if (lower === 'pausa') return { texto: '⚪ En pausa', color: 'gray' };
    return { texto: '⚫ Desconocido', color: 'darkslategray' };
  };

  const estadoVisual = getEstadoVisual(estadoAgente);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        mx: 'auto',
        py: 4
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
        {/* ✅ Estado visual único */}
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 3, fontWeight: 600, color: estadoVisual.color }}
        >
          Estado del Agente: {estadoVisual.texto}
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          {estadoAgente?.toLowerCase() === 'activo' ? (
            <Button
              variant="outlined"
              onClick={pausar}
              sx={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
                textTransform: 'none',
                borderRadius: 'var(--border-radius)',
                '&:hover': {
                  backgroundColor: 'var(--color-secundary)',
                  color: '#fff',
                  borderColor: 'var(--color-secundary)'
                }
              }}
            >
              Ponerme en pausa
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={activar}
              sx={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
                textTransform: 'none',
                borderRadius: 'var(--border-radius)',
                '&:hover': {
                  backgroundColor: 'var(--color-secundary)',
                  color: '#fff',
                  borderColor: 'var(--color-secundary)'
                }
              }}
            >
              Activarme
            </Button>
          )}
        </Box>

        {mostrandoMotivos && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Selecciona motivo de pausa:
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="pausa-label">Motivo</InputLabel>
              <Select
                labelId="pausa-label"
                value={pausaId}
                label="Motivo"
                onChange={(e) => setPausaId(e.target.value)}
              >
                <MenuItem value="">-- Selecciona --</MenuItem>
                {pausas.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.motivo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ textAlign: 'right' }}>
              <Button
                variant="outlined"
                onClick={confirmarPausa}
                sx={{
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  textTransform: 'none',
                  borderRadius: 'var(--border-radius)',
                  '&:hover': {
                    backgroundColor: 'var(--color-secundary)',
                    color: '#fff',
                    borderColor: 'var(--color-secundary)'
                  }
                }}
              >
                Confirmar pausa
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default EstadoAgente;


