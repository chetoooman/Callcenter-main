import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import CategoryIcon from '@mui/icons-material/Category';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';

const drawerWidth = 240;
const collapsedWidth = 56;

const iconosPorLabel = {
  Inicio: <DashboardIcon />,
  Historial: <HistoryIcon />,
  Perfil: <PersonIcon />,
  Agentes: <GroupIcon />,
  Reportes: <BarChartIcon />,
  Usuarios: <PeopleIcon />,
  Pausas: <PauseCircleIcon />,
  Tipificaciones: <CategoryIcon />,
  Configuración: <SettingsIcon />,
  Sistema: <BuildIcon />
};

const Sidebar = ({ open }) => {
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const rol = usuario?.rol || 'agente';

  const itemsPorRol = {
    agente: [
      { label: 'Inicio', path: '/dashboard' },
      { label: 'Historial', path: '/dashboard/historial' },
      { label: 'Perfil', path: '/dashboard/perfil' }
    ],
    supervisor: [
      { label: 'Inicio', path: '/supervisor' },
      { label: 'Agentes', path: '/supervisor/agentes' },
      { label: 'Reportes', path: '/supervisor/reportes' }
    ],
    admin: [
      { label: 'Inicio', path: '/admin' },
      { label: 'Usuarios', path: '/admin/usuarios' },
      { label: 'Pausas', path: '/admin/pausas' },
      { label: 'Tipificaciones', path: '/admin/tipificaciones' }
    ],

    super_admin: [
      { label: 'Sistema', path: '/admin' },
      { label: 'Configuración', path: '/admin#config' }
    ]
  };

  const items = itemsPorRol[rol] || [];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          transition: theme =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard
            }),
          overflowX: 'hidden',
          backgroundImage: 'linear-gradient(to bottom, #12608a, #1f90cd)',
          color: '#fff',
          boxSizing: 'border-box'
        }
      }}
    >
      <Toolbar />
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

      {open && (
        <Typography
          variant="subtitle1"
          sx={{
            px: 2,
            pt: 2,
            pb: 1,
            fontWeight: 'bold',
            opacity: 1
          }}
        >
          Panel {rol.charAt(0).toUpperCase() + rol.slice(1)}
        </Typography>
      )}

      <List>
        {items.map((item) => {
          const currentPath = location.pathname + location.hash;
          const isActive = item.path === currentPath;

          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={isActive}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: '8px',
                color: '#fff',
                justifyContent: open ? 'initial' : 'center',
                transition: 'background-color 0.2s ease, border 0.2s ease',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                border: isActive ? '1px solid white' : '1px solid transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid white'
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid white'
                },
                '&:hover .MuiListItemText-primary': {
                  color: 'inherit'
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: '#fff',
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center'
                }}
              >
                {iconosPorLabel[item.label] || <DashboardIcon />}
              </ListItemIcon>

              {open && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'inherit',
                    sx: {
                      '&:hover': {
                        color: 'inherit'
                      }
                    }
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;







