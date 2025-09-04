import React from 'react';
import HistorialLlamadas from '../agente/HistorialLamadas';

const PanelHistorialAgente = () => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>📚 Historial de Llamadas</h3>
      <HistorialLlamadas />
    </div>
  );
};

export default PanelHistorialAgente;
