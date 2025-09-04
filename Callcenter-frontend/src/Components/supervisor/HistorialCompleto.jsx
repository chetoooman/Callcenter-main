import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import api from '../../services/api';

const HistorialCompleto = () => {
  const [llamadas, setLlamadas] = useState([]);

  useEffect(() => {
    const obtenerLlamadas = async () => {
      try {
        const res = await api.get('/llamadas');
        setLlamadas(res.data);
      } catch (err) {
        console.error('Error al obtener historial', err);
      }
    };

    obtenerLlamadas();
  }, []);

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
          📞 Historial de Llamadas Completo
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {['Agente', 'Cliente', 'Resultado', 'Duración', 'Fecha'].map((header) => (
                  <TableCell
                    key={header}
                    sx={{ fontWeight: 'bold', color: 'var(--color-text)' }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {llamadas.map((l) => (
                <TableRow key={l.id}>
                  <TableCell sx={{ color: 'var(--color-text)' }}>
                    {l.Usuario?.nombre || '—'}
                  </TableCell>
                  <TableCell sx={{ color: 'var(--color-text)' }}>
                    {l.Cliente?.nombre || '—'}
                  </TableCell>
                  <TableCell sx={{ color: 'var(--color-text)' }}>
                    {l.resultado}
                  </TableCell>
                  <TableCell sx={{ color: 'var(--color-text)' }}>
                    {l.duracion} s
                  </TableCell>
                  <TableCell sx={{ color: 'var(--color-text)' }}>
                    {new Date(l.fecha).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default HistorialCompleto;


