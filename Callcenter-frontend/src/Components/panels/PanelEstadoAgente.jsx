import React from 'react';
import EstadoAgente from '../agente/EstadoAgente';

const PanelEstadoAgente = () => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3>LLamadas.</h3>
      <EstadoAgente />
    </div>
  );
};

export default PanelEstadoAgente;
