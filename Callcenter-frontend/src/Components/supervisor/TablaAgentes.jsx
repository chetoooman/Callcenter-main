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
  TableBody,
  Chip,
  Stack
} from '@mui/material';
import api from '../../services/api';

const TablaAgentes = () => {
  const [agentes, setAgentes] = useState([]);

  useEffect(() => {
    const obtenerAgentes = async () => {
      try {
        const res = await api.get('/admin/usuarios');
        const soloAgentes = res.data.filter(u => u.rol === 'agente');
        setAgentes(soloAgentes);
      } catch (err) {
        console.error('Error al obtener agentes', err);
      }
    };

    obtenerAgentes();
  }, []);

  // ✅ Cálculos para resumen
  const total = agentes.length;
  const activos = agentes.filter(a => a.activo).length;
  const inactivos = total - activos;

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
          sx={{ mb: 2, fontWeight: 600, color: 'var(--color-text)' }}
        >
          👥 Estado de los Agentes
        </Typography>

        {/* ✅ Resumen visual superior */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Chip label={`Total: ${total}`} color="primary" />
          <Chip label={`Activos: ${activos}`} sx={{ backgroundColor: 'green', color: '#fff' }} />
          <Chip label={`Inactivos: ${inactivos}`} sx={{ backgroundColor: 'gray', color: '#fff' }} />
        </Stack>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {['Nombre', 'Usuario', 'Estado', 'Activo'].map((header) => (
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
              {agentes.map((a) => (
                <TableRow key={a.id}>
                  <TableCell sx={{ color: 'var(--color-text)' }}>{a.nombre}</TableCell>
                  <TableCell sx={{ color: 'var(--color-text)' }}>{a.username}</TableCell>
                  <TableCell sx={{ color: 'var(--color-text)' }}>{a.estado}</TableCell>
                  <TableCell sx={{ color: 'var(--color-text)' }}>
                    {a.activo ? '✅' : '❌'}
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

export default TablaAgentes;


