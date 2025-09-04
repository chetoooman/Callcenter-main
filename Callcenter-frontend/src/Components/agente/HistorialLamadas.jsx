import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Box
} from '@mui/material';
import api from '../../services/api';

const HistorialLlamadas = () => {
  const [llamadas, setLlamadas] = useState([]);

  const cargarLlamadas = async () => {
    try {
      const res = await api.get('/llamadas/mis-llamadas');
      setLlamadas(res.data);
    } catch (err) {
      console.error('Error al cargar llamadas', err);
    }
  };

  useEffect(() => {
    cargarLlamadas();
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
          📞 Historial de Llamadas
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {['Cliente', 'Agente', 'Resultado', 'Duración', 'Fecha', 'Grabación'].map((header) => (
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
                    {l.Cliente?.nombre || '—'}
                  </TableCell>
                  <TableCell sx={{ color: 'var(--color-text)' }}>
                    {l.Usuario?.nombre || '—'}
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
                  <TableCell sx={{ color: 'var(--color-text)' }}>
                    {l.grabacion_url ? (
                      <Link
                        href={l.grabacion_url}
                        target="_blank"
                        rel="noopener"
                        underline="hover"
                      >
                        Ver
                      </Link>
                    ) : '—'}
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

export default HistorialLlamadas;


