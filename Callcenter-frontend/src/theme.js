// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#12608a' // var(--color-primary)
    },
    secondary: {
      main: '#1f90cd' // var(--color-secundary)
    },
    info: {
      main: '#606d73' // var(--color-info)
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF'
    },
    text: {
      primary: 'darkslategray', // var(--color-text)
      secondary: 'rgba(0, 0, 0, 0.6)'
    },
    success: {
      main: '#27ae60' // var(--success-color)
    },
    error: {
      main: '#e74c3c' // var(--danger-color)
    },
    warning: {
      main: '#f39c12' // var(--warning-color)
    }
  },
  shape: {
    borderRadius: 8 // var(--border-radius)
  },
  typography: {
    fontFamily: '"San Francisco", "Helvetica Neue", Arial, sans-serif'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.3s ease' // var(--transition-normal)
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // var(--shadow-light)
          borderRadius: 8
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#2c3e50',
          color: '#fff'
        }
      }
    }
  }
});

export default theme;

