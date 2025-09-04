import React, { useContext, useEffect, useState } from 'react';

// Contextos simulados
const AuthContext = React.createContext({
  logout: () => console.log('Logout simulado')
});

const AgenteContext = React.createContext({
  estadoAgente: 'pausa',
  setEstadoAgente: () => {}
});

// Hook simulado para agente
const useAgente = () => {
  const [estadoAgente, setEstadoAgente] = useState('pausa');
  return { estadoAgente, setEstadoAgente };
};

// Componente de alerta simulado
const AlertaLlamada = ({ mensaje }) => (
  <div style={{
    backgroundColor: '#e3f2fd',
    border: '1px solid #2196f3',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '16px',
    color: '#1976d2'
  }}>
    ℹ️ {mensaje}
  </div>
);

// Panel Estado Agente simulado
const PanelEstadoAgente = () => {
  const { estadoAgente, setEstadoAgente } = useAgente();
  
  const cambiarEstado = (nuevoEstado) => {
    setEstadoAgente(nuevoEstado);
  };

  const getColorEstado = (estado) => {
    switch (estado) {
      case 'disponible': return { bg: '#4caf50', color: 'white' };
      case 'en_llamada': return { bg: '#f44336', color: 'white' };
      case 'pausa': return { bg: '#ff9800', color: 'white' };
      default: return { bg: '#9e9e9e', color: 'white' };
    }
  };

  const colors = getColorEstado(estadoAgente);

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center' }}>
        👤 Estado del Agente
      </h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <span>Estado actual:</span>
        <span style={{
          backgroundColor: colors.bg,
          color: colors.color,
          padding: '4px 12px',
          borderRadius: '16px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {estadoAgente.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button 
          style={{
            backgroundColor: estadoAgente === 'disponible' ? '#4caf50' : 'white',
            color: estadoAgente === 'disponible' ? 'white' : '#4caf50',
            border: '2px solid #4caf50',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: estadoAgente === 'en_llamada' ? 'not-allowed' : 'pointer',
            opacity: estadoAgente === 'en_llamada' ? 0.5 : 1
          }}
          onClick={() => cambiarEstado('disponible')}
          disabled={estadoAgente === 'en_llamada'}
        >
          ▶️ Disponible
        </button>
        <button 
          style={{
            backgroundColor: estadoAgente === 'pausa' ? '#ff9800' : 'white',
            color: estadoAgente === 'pausa' ? 'white' : '#ff9800',
            border: '2px solid #ff9800',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: estadoAgente === 'en_llamada' ? 'not-allowed' : 'pointer',
            opacity: estadoAgente === 'en_llamada' ? 0.5 : 1
          }}
          onClick={() => cambiarEstado('pausa')}
          disabled={estadoAgente === 'en_llamada'}
        >
          ⏸️ Pausa
        </button>
      </div>
    </div>
  );
};

// Panel Llamada simulado
const PanelLlamada = ({ onFinalizar, setAlerta }) => {
  const { estadoAgente, setEstadoAgente } = useAgente();
  const [llamadaActiva, setLlamadaActiva] = useState(false);
  const [numeroDestino, setNumeroDestino] = useState('1000');
  const [duracionLlamada, setDuracionLlamada] = useState(0);

  useEffect(() => {
    let interval;
    if (llamadaActiva) {
      interval = setInterval(() => {
        setDuracionLlamada(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [llamadaActiva]);

  const iniciarLlamada = () => {
    setLlamadaActiva(true);
    setEstadoAgente('en_llamada');
    setDuracionLlamada(0);
    setAlerta('📞 Llamada iniciada');
  };

  const finalizarLlamada = () => {
    setLlamadaActiva(false);
    setEstadoAgente('disponible');
    onFinalizar();
    setDuracionLlamada(0);
  };

  const formatearTiempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 16px 0' }}>
        📞 Panel de Llamadas
      </h3>

      {llamadaActiva ? (
        <div>
          <h2 style={{ color: '#f44336', margin: '0 0 16px 0' }}>
            🔴 EN LLAMADA
          </h2>
          <h3 style={{ margin: '0 0 16px 0' }}>
            Duración: {formatearTiempo(duracionLlamada)}
          </h3>
          <p style={{ margin: '0 0 16px 0' }}>
            Número: {numeroDestino}
          </p>
          <button
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
            onClick={finalizarLlamada}
          >
            📞 Finalizar Llamada
          </button>
        </div>
      ) : (
        <div>
          <p style={{ margin: '0 0 16px 0' }}>
            Número de destino: {numeroDestino}
          </p>
          <button
            style={{
              backgroundColor: estadoAgente === 'pausa' ? '#ccc' : '#2196f3',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: estadoAgente === 'pausa' ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
            onClick={iniciarLlamada}
            disabled={estadoAgente === 'pausa'}
          >
            📞 Iniciar Llamada
          </button>
        </div>
      )}
    </div>
  );
};

// Panel Historial simulado
const PanelHistorialAgente = () => {
  const historialSimulado = [
    { id: 1, numero: '1001', duracion: '02:45', fecha: '2024-09-02 10:30', estado: 'completada' },
    { id: 2, numero: '1002', duracion: '01:20', fecha: '2024-09-02 09:15', estado: 'completada' },
    { id: 3, numero: '1003', duracion: '00:45', fecha: '2024-09-02 08:45', estado: 'perdida' },
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 16px 0' }}>
        📋 Historial de Llamadas
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {historialSimulado.map((llamada) => (
          <div key={llamada.id} style={{
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '16px',
            backgroundColor: '#fafafa'
          }}>
            <h4 style={{ margin: '0 0 8px 0' }}>{llamada.numero}</h4>
            <p style={{ margin: '0 0 4px 0', color: '#666' }}>
              Duración: {llamada.duracion}
            </p>
            <p style={{ margin: '0 0 8px 0', color: '#666' }}>
              {llamada.fecha}
            </p>
            <span style={{
              backgroundColor: llamada.estado === 'completada' ? '#4caf50' : '#f44336',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {llamada.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// WebPhone simulado
const WebPhone = ({ username, password, domain, wsPort, destinoDefault }) => {
  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 16px 0' }}>
        📞 WebPhone (Simulado)
      </h3>
      <div style={{ color: '#666', fontSize: '14px' }}>
        <p style={{ margin: '4px 0' }}>Usuario: {username}</p>
        <p style={{ margin: '4px 0' }}>Dominio: {domain}</p>
        <p style={{ margin: '4px 0' }}>Puerto: {wsPort}</p>
        <p style={{ margin: '4px 0' }}>Destino por defecto: {destinoDefault}</p>
      </div>
    </div>
  );
};

// Componente Dashboard principal
const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const { estadoAgente, setEstadoAgente } = useAgente();
  const [alerta, setAlerta] = useState('');

  const mostrarAlertaTemporal = (mensaje) => {
    setAlerta(mensaje);
    setTimeout(() => setAlerta(''), 5000);
  };

  const cerrarSesion = () => {
    if (estadoAgente === 'en_llamada') {
      alert('No puedes cerrar sesión mientras estás en una llamada');
      return;
    }
    logout();
    // navigate('/'); // Comentado ya que no tenemos router
  };

  const handleFinLlamada = () => {
    mostrarAlertaTemporal('Llamada finalizada');
  };

  useEffect(() => {
    const inicializarAgente = async () => {
      try {
        // Simulamos la inicialización
        console.log('Inicializando agente...');
        setEstadoAgente('pausa');
        mostrarAlertaTemporal('🎧 Bienvenido, ahora estás en pausa');
      } catch (err) {
        console.error('Error al inicializar:', err);
      }
    };

    inicializarAgente();
  }, [setEstadoAgente]);

  return (
    <AgenteContext.Provider value={{ estadoAgente, setEstadoAgente }}>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {alerta && <AlertaLlamada mensaje={alerta} />}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, color: '#333' }}>
            Dashboard Call Center
          </h1>
          <button 
            style={{
              backgroundColor: estadoAgente === 'en_llamada' ? '#ccc' : 'white',
              color: estadoAgente === 'en_llamada' ? '#999' : '#f44336',
              border: '2px solid #f44336',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: estadoAgente === 'en_llamada' ? 'not-allowed' : 'pointer'
            }}
            onClick={cerrarSesion}
            disabled={estadoAgente === 'en_llamada'}
          >
            Cerrar Sesión
          </button>
        </div>

        <PanelEstadoAgente />
        <PanelLlamada onFinalizar={handleFinLlamada} setAlerta={mostrarAlertaTemporal} />
        <PanelHistorialAgente />
        <WebPhone 
          username="12345" 
          password="Agent_12345" 
          domain="call.freyia.vip" 
          wsPort="8089/ws" 
          destinoDefault="1000" 
        />
      </div>
    </AgenteContext.Provider>
  );
};

export default Dashboard;