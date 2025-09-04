import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';
import { useAgente } from '../../context/AgenteContext';
import api from '../../services/api';

const LlamadaForm = ({ onLlamadaRegistrada }) => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    cliente_id: '',
    duracion: '',
    resultado: 'exitoso',
    grabacion_url: '',
    observaciones: ''
  });
  const { clienteActual } = useAgente();

  useEffect(() => {
    if (clienteActual) {
      setFormData(prev => ({
        ...prev,
        cliente_id: clienteActual.id,
        observaciones: `Llamada con: ${clienteActual.nombre}`
      }));
    } else {
      api.get('/clientes')
        .then(res => setClientes(res.data))
        .catch(err => console.error('Error al cargar clientes', err));
    }
  }, [clienteActual]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/llamadas', formData);
      setFormData({
        cliente_id: '',
        duracion: '',
        resultado: 'exitoso',
        grabacion_url: '',
        observaciones: ''
      });
      if (onLlamadaRegistrada) onLlamadaRegistrada();
    } catch (err) {
      console.error('Error al registrar llamada:', err);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1000px',
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
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 3, fontWeight: 600, color: 'var(--color-text)' }}
        >
          ☎️ Registrar Llamada
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {clienteActual ? (
            <Box sx={{ display: 'grid', gap: 1 }}>
              <Typography variant="body2"><strong>Cliente:</strong> {clienteActual.nombre}</Typography>
              <Typography variant="body2"><strong>Teléfono:</strong> {clienteActual.telefono}</Typography>
              <Typography variant="body2"><strong>Email:</strong> {clienteActual.correo}</Typography>
              <Typography variant="body2"><strong>Empresa:</strong> {clienteActual.empresa}</Typography>
            </Box>
          ) : (
            <FormControl fullWidth>
              <InputLabel id="cliente-label">Seleccionar cliente</InputLabel>
              <Select
                labelId="cliente-label"
                name="cliente_id"
                value={formData.cliente_id}
                onChange={handleChange}
                required
                label="Seleccionar cliente"
              >
                <MenuItem value="">-- Seleccionar --</MenuItem>
                {clientes.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            name="duracion"
            label="Duración (segundos)"
            type="number"
            value={formData.duracion}
            onChange={handleChange}
            fullWidth
            required
          />

          <FormControl fullWidth>
            <InputLabel id="resultado-label">Resultado</InputLabel>
            <Select
              labelId="resultado-label"
              name="resultado"
              value={formData.resultado}
              onChange={handleChange}
              label="Resultado"
            >
              <MenuItem value="exitoso">Exitoso</MenuItem>
              <MenuItem value="no_exitoso">No exitoso</MenuItem>
              <MenuItem value="sin_respuesta">Sin respuesta</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="grabacion_url"
            label="URL de grabación"
            value={formData.grabacion_url}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="observaciones"
            label="Observaciones"
            multiline
            minRows={3}
            value={formData.observaciones}
            onChange={handleChange}
            fullWidth
          />

          <Box sx={{ textAlign: 'right' }}>
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
              Guardar llamada
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LlamadaForm;

