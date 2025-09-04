import React from 'react';

const AlertaLlamada = ({ mensaje, color = '#f5a623' }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      backgroundColor: color,
      color: '#fff',
      padding: '10px 20px',
      borderRadius: 6,
      zIndex: 9999,
      fontWeight: 'bold',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)'
    }}>
      {mensaje}
    </div>
  );
};

export default AlertaLlamada;
