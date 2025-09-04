import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Alert,
  InputAdornment,
  Fade
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje('');

    const rol = username.toLowerCase().trim();

    // Validamos rol
    if (!['agente', 'supervisor', 'admin'].includes(rol)) {
      setMensaje('Rol no válido. Usa admin, supervisor o agente.');
      return;
    }

    // Usuario de prueba
    const usuarioFalso = {
      id: 1,
      nombre: rol.toUpperCase(),
      rol: rol
    };
    const tokenFalso = 'fake-token-123456';

    // Guardar en AuthContext y en localStorage
    login(tokenFalso, usuarioFalso);
    localStorage.setItem('usuario', JSON.stringify(usuarioFalso));
    localStorage.setItem('token', tokenFalso);

    // Redirigir según rol
    if (rol === 'agente') navigate('/dashboard'); // tu dashboard de agente
    else if (rol === 'supervisor') navigate('/supervisor');
    else if (rol === 'admin') navigate('/admin');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundImage: 'url("/imagenes/fondo.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          background: 'linear-gradient(270deg, #12608a, #47b8f5, #1f90cd)',
          backgroundSize: '600% 600%',
          animation: 'gradientBackground 15s ease infinite',
          zIndex: -1
        }}
      />

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'transparent'
        }}
      >
        <Fade in={show} timeout={600}>
          <Paper
            elevation={20}
            sx={{
              p: 4,
              width: { xs: '90%', sm: 360 },
              borderRadius: 'var(--border-radius)',
              backgroundColor: 'var(--primary-bg-color)',
              animation: 'spinIn 0.6s ease-out',
              '@keyframes spinIn': {
                from: { transform: 'rotateY(-90deg)', opacity: 0 },
                to: { transform: 'rotateY(0)', opacity: 1 }
              }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 2,
                animation: 'zoomFade 0.8s ease-out',
                '@keyframes zoomFade': {
                  from: { transform: 'scale(0.8)', opacity: 0 },
                  to: { transform: 'scale(1)', opacity: 1 }
                }
              }}
            >
              <img
                src="/imagenes/singularity.png"
                alt="Logo Freyai"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  )
                }}
              />

              <TextField
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  textTransform: 'none',
                  borderRadius: 'var(--border-radius)',
                  backgroundColor: 'var(--color-primary)'
                }}
              >
                Entrar
              </Button>

              {mensaje && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: 'var(--border-radius)' }}>
                  {mensaje}
                </Alert>
              )}
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
};

export default Login;
