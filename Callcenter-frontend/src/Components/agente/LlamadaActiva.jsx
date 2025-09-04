import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import api from '../../services/api';
import TipificacionModal from '../shared/TipificacionModal';
import { useAgente } from '../../context/AgenteContext';

const LlamadaActiva = ({ onFinalizar, setAlerta }) => {
  const [muted, setMuted] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipificaciones, setTipificaciones] = useState([]);
  const { clienteActual } = useAgente();

  const handleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleColgar = () => {
    new Audio('/sonidos/colgado.mp3').play();
    if (setAlerta) setAlerta('📴 Llamada finalizada');
    setMostrarModal(true);
  };

  const handleTipificacionFinalizada = () => {
    setMostrarModal(false);
    onFinalizar();
  };

  useEffect(() => {
    new Audio('/sonidos/llamada.mp3').play();
    if (setAlerta) setAlerta('📲 ¡Llamada conectada!');

    const cargarTipificaciones = async () => {
      try {
        const res = await api.get('/admin/tipificaciones');
        setTipificaciones(res.data);
      } catch (err) {
        console.error('Error al cargar tipificaciones', err);
      }
    };

    cargarTipificaciones();
  }, []);

  return (
    <>
      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            📞 En llamada con: {clienteActual?.nombre || 'Desconocido'}
          </Typography>
          <IconButton onClick={handleMute} aria-label="Mute">
            {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        </Box>

        {clienteActual && (
          <Box sx={{ mb: 2 }}>
            <Typography><strong>Tel:</strong> {clienteActual.telefono}</Typography>
            <Typography><strong>Email:</strong> {clienteActual.correo}</Typography>
            <Typography><strong>Empresa:</strong> {clienteActual.empresa}</Typography>
          </Box>
        )}

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ textAlign: 'right' }}>
          <button onClick={handleColgar} style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px', borderRadius: '6px' }}>
            📴 Colgar
          </button>
        </Box>
      </Paper>

      <TipificacionModal
        open={mostrarModal}
        onClose={handleTipificacionFinalizada}
        cliente={clienteActual}
        tipificaciones={tipificaciones}
      />
    </>
  );
};

export default LlamadaActiva;
