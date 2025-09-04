import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import api from '../../services/api';

const TipificacionModal = ({ open, onClose, cliente, tipificaciones }) => {
  const [tipificacion, setTipificacion] = useState('');
  const [pausar, setPausar] = useState(false);

  const enviarTipificacion = async () => {
    if (!tipificacion) {
      alert('Selecciona una tipificación');
      return;
    }

    try {
      await api.post('/llamadas', {
        cliente_id: cliente.id,
        duracion: 180,
        resultado: tipificacion,
        grabacion_url: 'https://grabacion-fake.mp3',
        observaciones: 'Llamada simulada'
      });

      if (pausar) {
        const res = await api.get('/agente/pausas');
        const motivoId = res.data[0]?.id;
        if (motivoId) {
          await api.post('/agente/estado', {
            estado: 'pausa',
            pausa_id: motivoId
          });
        }
      } else {
        await api.post('/agente/estado', { estado: 'activo' });
      }

      onClose();
    } catch (err) {
      console.error('Error al enviar tipificación:', err);
    }
  };

  return (
    <Modal open={open} onClose={() => {}} disableEscapeKeyDown>
      <Box sx={{
        backgroundColor: 'white',
        width: 400,
        p: 4,
        borderRadius: 2,
        m: 'auto',
        mt: '15%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography variant="h6" align="center">Tipifica la llamada</Typography>

        <FormControl fullWidth>
          <InputLabel id="tipificacion-label">Tipificación</InputLabel>
          <Select
            labelId="tipificacion-label"
            value={tipificacion}
            label="Tipificación"
            onChange={(e) => setTipificacion(e.target.value)}
          >
            <MenuItem value="">-- Selecciona --</MenuItem>
            {tipificaciones.map(t => (
              <MenuItem key={t.id} value={t.nombre}>{t.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={pausar}
              onChange={(e) => setPausar(e.target.checked)}
            />
          }
          label="Pausarme al finalizar"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={enviarTipificacion}
        >
          Enviar y continuar
        </Button>
      </Box>
    </Modal>
  );
};

export default TipificacionModal;
